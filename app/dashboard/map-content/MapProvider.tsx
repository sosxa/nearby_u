// lib/mapbox/provider.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTheme } from "next-themes";
import { MapContext } from "./MapContext";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

type MapComponentProps = {
  mapContainerRef: React.RefObject<HTMLDivElement | null>;
  initialViewState: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
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

  useEffect(() => {
    if (!mapContainerRef.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: getMapStyle(resolvedTheme),
      center: [initialViewState.longitude, initialViewState.latitude],
      zoom: initialViewState.zoom,
      attributionControl: false,
      logoPosition: "bottom-right",
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
      <MapContext.Provider value={{ map: map.current! }}>
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