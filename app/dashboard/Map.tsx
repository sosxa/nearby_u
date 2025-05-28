'use client'
import { useRef, useEffect } from "react";
import MapProvider from "./map-content/MapProvider";
// import MapStyles from "./map-content/MapStyles";
import MapCotrols from "./map-content/MapControls";
import MapSearch from "./map-content/MapSearch";

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const lastScrollPosition = useRef(0)

  useEffect(() => {
    // Store current scroll position
    lastScrollPosition.current = window.scrollY

    // Prevent scroll without affecting map interactivity
    const handleScroll = (e: Event) => {
      window.scrollTo(0, 0)
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div className="h-[100dvh] w-full">
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
        <MapCotrols />
        <MapSearch />
      </MapProvider>
    </div>
  );
}