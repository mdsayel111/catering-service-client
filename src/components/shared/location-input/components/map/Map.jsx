"use client";
import "./map.css";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Polygon,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import React, { useEffect, useState } from "react";
import { zonePolygon } from "@/data/address";
import { isPointInZone } from "@/utils/address";
import markerImg from "../../../../../assets/images/location.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import toast from "react-hot-toast";

const customIcon = new L.Icon({
  iconUrl: markerImg.src, // <--- use .src
  shadowUrl: markerShadow,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  shadowSize: [32, 32],
});

function MapEventHandler({ onMove }) {
  const map = useMap();

  useMapEvents({
    moveend: () => {
      const center = map.getCenter();
      const zoom = map.getZoom();
      onMove(center, zoom);
    },
    zoomend: () => {
      const center = map.getCenter();
      const zoom = map.getZoom();
      onMove(center, zoom);
    },
  });

  return null;
}

function ClickHandler({ setSelectedPosition, onSelect }) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;

      if (isPointInZone(lat, lng)) {
        setSelectedPosition([lat, lng]); // internal state for marker
        if (onSelect) onSelect(lat, lng); // notify parent
      } else {
        toast.error("Selected location is outside the service zone.");
      }
    },
  });

  return null;
}

export default function LocationMap({
  center,
  zoom,
  onMove,
  // aspectRatio = "2/1",
  selectedPosition,
  setSelectedPosition,
}) {
  const [aspectRatio, setAspectRatio] = useState(null);

  useEffect(() => {
    if (window.innerWidth > 768) {
      setAspectRatio("2/1");
    } else {
      setAspectRatio("1/1");
    }
  }, []);
  if (!aspectRatio) return null;
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ aspectRatio, width: "100%", borderRadius: "10px" }}
      scrollWheelZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Polygon
        positions={zonePolygon}
        pathOptions={{
          color: "black",
          weight: 2,
          fill: false,
        }}
      />

      <MapEventHandler onMove={onMove} />
      <ClickHandler setSelectedPosition={setSelectedPosition} />

      {selectedPosition && (
        <Marker position={selectedPosition} icon={customIcon} />
      )}
    </MapContainer>
  );
}
