"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTheme } from "next-themes";
import { MapContext } from "./MapContext";
import Map, { Marker } from 'react-map-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

type MapComponentProps = {
  mapContainerRef: React.RefObject<HTMLDivElement | null>;
  initialViewState: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
  markerCoords?: [number, number];
  children?: React.ReactNode;
};

export default function MapProvider({
  mapContainerRef,
  initialViewState,
  children,
}: MapComponentProps) {
  const { resolvedTheme } = useTheme();
  const map = useRef<mapboxgl.Map | null>(null);
  const [loaded, setLoaded] = useState(false);

  const locationMarkerRef = useRef<mapboxgl.Marker | null>(null);

  // }, [loaded]);
  useEffect(() => {
    if (!map.current || map.current) return;

    if (!locationMarkerRef.current) {
      locationMarkerRef.current = new mapboxgl.Marker()
        .setLngLat([40.841128, -74.664485])
        .addTo(map.current);
    } else {
      // If marker already exists, just update its location
      locationMarkerRef.current.setLngLat([40.841128, -74.664485]);
    }
  }, [loaded]);

  useEffect(() => {
    if (!mapContainerRef.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: getMapStyle(resolvedTheme),
      center: [initialViewState.longitude, initialViewState.latitude],
      zoom: initialViewState.zoom,
      attributionControl: false,
      logoPosition: undefined,
    });

    map.current.on("load", () => setLoaded(true));

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [initialViewState, mapContainerRef]);

  // Update map style when theme changes
  useEffect(() => {
    if (map.current && loaded) {
      map.current.setStyle(getMapStyle(resolvedTheme));
    }
  }, [resolvedTheme, loaded]);

  return (
    <div className="z-[1000]">
      <MapContext.Provider 
      value={{ map: map.current! }}>
        {loaded && (
          <Marker longitude={-74.0060} latitude={40.7128} anchor="bottom">
            <div style={{ fontSize: '24px' }}>📍</div>
          </Marker>
        )}
        {children}
      </MapContext.Provider>

      {!loaded && <LoadingOverlay />}
    </div>
  );
}

// Helper function to get appropriate map style
function getMapStyle(theme?: string) {
  return theme === "dark"
    ? "mapbox://styles/mapbox/dark-v11"
    : "mapbox://styles/mapbox/light-v11";
}

// Loading component
function LoadingOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-[1000]">
      <div className="text-lg font-medium">Loading map...</div>
    </div>
  );
}