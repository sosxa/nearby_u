import React from 'react';
import { Marker } from 'react-map-gl';

interface LocationFeatureProps {
  longitude: number;
  latitude: number;
  color?: string;
  size?: number;
  emoji?: string;
}

const LocationFeature: React.FC<LocationFeatureProps> = ({
  longitude,
  latitude,
  color = 'red',
  size = 24,
  emoji = '📍'
}) => (
  <Marker longitude={longitude} latitude={latitude}>
    <div style={{ color, fontSize: size }}>{emoji}</div>
  </Marker>
);

export default LocationFeature;