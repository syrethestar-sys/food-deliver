"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const DEFAULT_POSITION = [51.505, -0.09];

export function AddressMap({ position, onPositionChange }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const map = L.map(mapContainerRef.current).setView(
      position ?? DEFAULT_POSITION,
      15,
    );
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    const marker = L.marker(position ?? DEFAULT_POSITION, {
      draggable: true,
    }).addTo(map);
    markerRef.current = marker;

    marker.on("dragend", () => {
      const { lat, lng } = marker.getLatLng();
      onPositionChange(lat, lng);
    });

    map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      marker.setLatLng([lat, lng]);
      onPositionChange(lat, lng);
    });

    if (!position) {
      navigator.geolocation?.getCurrentPosition((geo) => {
        if (cancelled) return;
        const here = [geo.coords.latitude, geo.coords.longitude];
        map.setView(here, 15);
        marker.setLatLng(here);
        onPositionChange(here[0], here[1]);
      });
    }

    return () => {
      cancelled = true;
      map.remove();
    };
  }, []);
  useEffect(() => {
    if (!position || !mapRef.current || !markerRef.current) return;
    markerRef.current.setLatLng(position);
    mapRef.current.setView(position);
  }, [position]);

  return <div ref={mapContainerRef} className="h-56 w-full rounded-lg" />;
}
