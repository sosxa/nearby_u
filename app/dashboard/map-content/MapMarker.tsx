"use client";

import React, { useState } from "react";
import { Marker as ReactMapMarker } from "react-map-gl";
import { LocationFeature } from "./MapUtils";

type Props = {
  longitude: number;
  latitude: number;
  data: LocationFeature;
  onHover?: ({
    isHovered,
    position,
    data,
  }: {
    isHovered: boolean;
    position: { longitude: number; latitude: number };
    data: LocationFeature;
  }) => void;
  onClick?: ({
    position,
    data,
  }: {
    position: { longitude: number; latitude: number };
    data: LocationFeature;
  }) => void;
  children?: React.ReactNode;
};

export default function Marker({
  latitude,
  longitude,
  data,
  onHover,
  onClick,
  children,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover?.({ isHovered: true, position: { longitude, latitude }, data });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover?.({ isHovered: false, position: { longitude, latitude }, data });
  };

  const handleClick = () => {
    onClick?.({ position: { longitude, latitude }, data });
  };

  return (
    <ReactMapMarker longitude={longitude} latitude={latitude} anchor="bottom">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        {children}
      </div>
    </ReactMapMarker>
  );
}
