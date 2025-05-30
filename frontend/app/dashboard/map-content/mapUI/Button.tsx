import { Button } from "@/components/ui/button"; // Your custom button component
import { ZoomIn, ZoomOut, LocateFixed } from "lucide-react";

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onLocate: () => void;
  className?: string;
}

export const MapControls = ({
  onZoomIn,
  onZoomOut,
  onLocate,
  className = "",
}: MapControlsProps) => {
  return (
    <div className={`absolute right-4 top-4 space-y-2 ${className}`}>
      <Button
        variant="ghost"
        size="icon"
        onClick={onZoomIn}
        className="bg-white/80 backdrop-blur-sm hover:bg-white"
        aria-label="Zoom in"
      >
        <ZoomIn className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={onZoomOut}
        className="bg-white/80 backdrop-blur-sm hover:bg-white"
        aria-label="Zoom out"
      >
        <ZoomOut className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onLocate}
        className="flex items-center gap-1 bg-white/80 backdrop-blur-sm hover:bg-white"
        aria-label="Find my location"
      >
        <LocateFixed className="h-3.5 w-3.5" />
        <span>Locate</span>
      </Button>
    </div>
  );
};

export { Button };
