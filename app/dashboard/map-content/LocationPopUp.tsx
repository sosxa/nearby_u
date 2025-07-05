"use client";
import { LocationFeature } from "./MapUtils";
import { MapPin, Navigation, X } from "lucide-react";
import { Button } from "./mapUI/Button";
import Popup from "./MapPopUp";
import { Separator } from "./mapUI/Separator";

type LocationPopupProps = {
  location: LocationFeature;
  onClose?: () => void;
};

export function LocationPopup({ location, onClose }: LocationPopupProps) {
  if (!location) return null;

  const { properties, geometry } = location;

  const name = properties?.name || "Selected Location";
  const address = properties?.place_formatted ||
    properties?.full_address ||
    properties?.address ||
    "Address not available";

  const lat = geometry?.coordinates?.[1] || properties?.coordinates?.latitude;
  const lng = geometry?.coordinates?.[0] || properties?.coordinates?.longitude;

  return (
    <Popup
      latitude={lat}
      longitude={lng}
      onClose={onClose}
      offset={15}
      closeButton={true}
      closeOnClick={false}
      className="location-popup"
      focusAfterOpen={false}
    >
      <div className="w-[300px] sm:w-[350px] p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg truncate">{name}</h3>
            <div className="flex items-start mt-2">
              <MapPin className="h-4 w-4 mt-0.5 mr-2 text-muted-foreground flex-shrink-0" />
              <p className="text-sm text-muted-foreground">{address}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="ml-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Separator className="my-4" />

        <div className="flex justify-between">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center"
            onClick={() => {
              window.open(
                `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
                "_blank"
              );
            }}
          >
            <Navigation className="h-4 w-4 mr-1.5" />
            Directions
          </Button>

          <Button
            variant="default"
            size="sm"
            className="flex items-center"
            onClick={onClose}
          >
            Use This Location
          </Button>
        </div>

        <div className="mt-4 pt-3 border-t text-xs text-muted-foreground">
          <p className="text-center">
            Coordinates: {lat?.toFixed(6)}, {lng?.toFixed(6)}
          </p>
        </div>
      </div>
    </Popup>
  );
}