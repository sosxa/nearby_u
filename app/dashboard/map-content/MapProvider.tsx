"use client";
import React, { useState, useContext, createContext, useRef } from "react";
import { useTheme } from "next-themes";
import Map, { ViewState } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { MapRef } from 'react-map-gl';

type MapComponentProps = {
  initialViewState: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
  children?: React.ReactNode;
  bearing?: number;
  pitch?: number;
};

type MapContextType = {
  mapRef: React.RefObject<MapRef | null>;
};

export default function MapComponent({
  initialViewState,
  children,
}: MapComponentProps) {
  const { resolvedTheme } = useTheme();
  const mapRef = useRef<MapRef | null>(null);

  const [viewState, setViewState] = useState<ViewState>({
    ...initialViewState,
    bearing: 0,
    pitch: 0,
    padding: { top: 50, bottom: 50, left: 50, right: 50 },
  });

  const [loaded, setLoaded] = useState(false);

  return (
    <div className="z-10 relative">
      <MapContext.Provider value={{ mapRef }}>
        <Map
          {...viewState}
          ref={mapRef}
          onMove={(evt) => setViewState(evt.viewState)}
          onLoad={() => setLoaded(true)}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          mapStyle={getMapStyle(resolvedTheme)}
          dragRotate={false}
          touchZoomRotate={false}
          style={{ width: "100%", height: "100vh" }}
        >
          {/* Child components will handle markers */}
          {children}
        </Map>
      </MapContext.Provider>

      {!loaded && <LoadingOverlay />}
    </div>
  );
}

export const MapContext = createContext<MapContextType | null>(null);
export function useMap() {
  const context = useContext(MapContext);
  if (!context) throw new Error("useMap must be used within MapProvider");
  return { map: context.mapRef.current?.getMap() ?? null };
}

function getMapStyle(theme?: string) {
  return theme === "dark"
    ? "mapbox://styles/mapbox/dark-v11"
    : "mapbox://styles/mapbox/light-v11";
}

function LoadingOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-[1000]">
      <div className="text-lg font-medium">Loading map...</div>
    </div>
  );
}
