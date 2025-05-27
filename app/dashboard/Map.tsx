// app/page.tsx

import { useRef } from "react";

import MapProvider from "./map-content/MapProvider";
// import MapStyles from "./map-content/MapStyles";
import MapCotrols from "./map-content/MapControls";
import MapSearch from "./map-content/MapSearch";

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="w-screen h-screen">
      <div
        id="map-container"
        ref={mapContainerRef}
        className="absolute inset-0 h-full w-full"
      />

      <MapProvider
        mapContainerRef={mapContainerRef}
        initialViewState={{
          longitude: -122.4194,
          latitude: 37.7749,
          zoom: 10,
        }}
      >
        <MapSearch />
        <MapCotrols />
        {/* <MapStyles /> */}
      </MapProvider>
    </div>
  );
}