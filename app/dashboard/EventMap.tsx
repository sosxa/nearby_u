'use client'
import { useRef, useEffect, useState } from "react";
import MapProvider from "./map-content/MapProvider";
import MapControls from "./map-content/MapControls";
import MapSearch from "./map-content/mapUI/filters/MapSearch";
import { getLocation } from "./map-content/getlocation";
import MapFilterManager from "./map-content/mapUI/filters/MapFilterManager";
import { LocationPopup } from "./map-content/LocationPopUp";
import { Marker } from "react-map-gl";
import { LocationFeature } from "./map-content/MapUtils";

export default function MapComponent() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const lastScrollPosition = useRef(0);

  const [userLocation, setUserLocation] = useState<{
    longitude: number | null;
    latitude: number | null;
  }>({
    longitude: null,
    latitude: null,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeMarker, setActiveMarker] = useState<{
    longitude: number;
    latitude: number;
    feature?: LocationFeature;
  } | null>(null);

  // Default fallback location (San Francisco)
  const defaultLocation = {
    longitude: -122.4194,
    latitude: 37.7749
  };

  // Send location to backend
  const sendLocationToBackend = async (longitude: number, latitude: number) => {
    try {
      console.log('Sending location to backend:', { longitude, latitude });
      const response = await fetch('/api/ticketmaster', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coordinates: { longitude, latitude },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Backend response error:', {
          status: response.status,
          statusText: response.statusText,
          errorData
        });
        throw new Error(`Failed to update location: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Location update successful:', data);
      return data;
    } catch (error) {
      console.error('Full error sending location:', error);
      throw error;
    }
  };

  // Fetch user location
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const locationData = await getLocation();
        const newLocation = {
          longitude: locationData[0].longitude,
          latitude: locationData[0].latitude,
        };

        setUserLocation(newLocation);
        setActiveMarker(newLocation);
        setIsLoading(false);
        setError(null);

        // Send location to backend
        await sendLocationToBackend(newLocation.longitude, newLocation.latitude);
      } catch (err) {
        // Use default location if geolocation is denied
        setUserLocation(defaultLocation);
        setActiveMarker(defaultLocation);
        setIsLoading(false);
        setError("Location access denied. Using default location.");

        // Send default location to backend
        await sendLocationToBackend(defaultLocation.longitude, defaultLocation.latitude);
      }
    };

    fetchLocation();
  }, []);

  // Prevent scroll
  useEffect(() => {
    lastScrollPosition.current = window.scrollY;
    const handleScroll = () => window.scrollTo(0, 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="h-[100dvh] w-full flex items-center justify-center">
        <p>Loading your location...</p>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] w-full" ref={mapContainerRef}>
      <MapProvider
        initialViewState={{
          longitude: activeMarker?.longitude ?? defaultLocation.longitude,
          latitude: activeMarker?.latitude ?? defaultLocation.latitude,
          zoom: 15,
        }}
      >
        <MapFilterManager />
        <MapControls />

        <MapSearch
          onSelectLocations={(locations: LocationFeature[]) => {
            if (locations.length > 0) {
              const firstLocation = locations[0];
              const newLocation = {
                longitude: firstLocation.geometry.coordinates[0],
                latitude: firstLocation.geometry.coordinates[1],
                feature: firstLocation
              };
              setActiveMarker(newLocation);

              // Send search location to backend
              sendLocationToBackend(newLocation.longitude, newLocation.latitude);
            }
          }}
          onClear={() => {
            const clearedLocation = userLocation.longitude && userLocation.latitude
              ? {
                longitude: userLocation.longitude,
                latitude: userLocation.latitude
              }
              : defaultLocation;
            setActiveMarker(clearedLocation);

            // Send cleared location to backend
            sendLocationToBackend(clearedLocation.longitude, clearedLocation.latitude);
          }}
        />

        {/* Always show a marker if we have coordinates */}
        {activeMarker && (
          <>
            <Marker
              longitude={activeMarker.longitude}
              latitude={activeMarker.latitude}
              color="#3b82f6"
            />

            {/* Show popup only for search results */}
            {activeMarker.feature && (
              <LocationPopup
                location={activeMarker.feature}
                onClose={() => {
                  setActiveMarker({
                    longitude: activeMarker.longitude,
                    latitude: activeMarker.latitude,
                  });
                }}
              />
            )}
          </>
        )}

        {/* Show error message if geolocation was denied */}
        {error && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md shadow-md">
            {error}
          </div>
        )}
      </MapProvider>
    </div>
  );
}