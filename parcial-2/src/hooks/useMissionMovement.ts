import { useState } from "react";
import { Geolocation } from "@capacitor/geolocation";

type Point = { lat: number; lng: number };

function toRad(value: number) {
  return (value * Math.PI) / 180;
}

function distanceMeters(a: Point, b: Point) {
  const R = 6371000;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const aa =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(a.lat)) *
      Math.cos(toRad(b.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa));
  return R * c;
}

export function useMissionMovement() {
  const [origin, setOrigin] = useState<Point | null>(null);
  const [distance, setDistance] = useState(0);

  const checkMovement = async () => {
    const permisos = await Geolocation.checkPermissions();
    if (permisos.location !== "granted") {
      await Geolocation.requestPermissions();
    }

    const pos = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10000,
    });

    const current = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    };

    if (!origin) {
      setOrigin(current);
      setDistance(0);
      return {
        distance: 0,
        detected30: false,
        completed50: false,
        initialized: true,
      };
    }

    const meters = distanceMeters(origin, current);
    setDistance(meters);

    return {
      distance: meters,
      detected30: meters > 30,
      completed50: meters >= 50,
      initialized: false,
    };
  };

  return { origin, distance, checkMovement };
}
