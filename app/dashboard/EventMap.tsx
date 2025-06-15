'use client'
import { useRef, useEffect, useState } from "react";
import MapProvider from "./map-content/MapProvider";
import MapControls from "./map-content/MapControls"; // Fixed typo in component name
import MapSearch from "./map-content/mapUI/filters/MapSearch";
import { getLocation } from "./map-content/geolocation";
import MapEventFilter from "./map-content/mapUI/filters/MapDistanceFilter";

export default function MapComponent() { // Renamed component
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const lastScrollPosition = useRef(0);

  const [location, setLocation] = useState<{
    coords: { longitude: number | null; latitude: number | null };
    isLoading: boolean;
    error: string | null;
  }>({
    coords: { longitude: null, latitude: null },
    isLoading: true,
    error: null,
  });

  // Fetch user location
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const locationData = await getLocation();
        setLocation({
          coords: {
            longitude: locationData[0].longitude,
            latitude: locationData[0].latitude,
          },
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setLocation({
          coords: {
            longitude: -122.4194,
            latitude: 37.7749,
          },
          isLoading: false,
          error: error instanceof Error ? error.message : "Location access failed",
        });
      }
    };

    fetchLocation();
  }, []);

  // Prevent scroll
  useEffect(() => {
    lastScrollPosition.current = window.scrollY;
    const handleScroll = (e: Event) => window.scrollTo(0, 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (location.isLoading) {
    return (
      <div className="h-[100dvh] w-full flex items-center justify-center">
        <p>Loading your location...</p>
      </div>
    );
  }

  return (
    <>
      <div className="h-[100dvh] w-full">
        <div
          id="map-container"
          ref={mapContainerRef}
        >

          <MapProvider
            initialViewState={{
              longitude: location.coords.longitude ?? -122.4194,
              latitude: location.coords.latitude ?? 37.7749,
              zoom: 15,
            }}
            longitude={location.coords.longitude ?? -122.4194}
            latitude={location.coords.latitude ?? 37.7749}
          >

            <MapEventFilter />
            <MapControls />
            <MapSearch />
          </MapProvider>

        </div >
      </div>
    </>
  );
}