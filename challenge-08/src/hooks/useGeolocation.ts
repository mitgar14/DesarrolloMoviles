import { useState } from "react";
import { Geolocation } from "@capacitor/geolocation";

export const useGeolocation = () => {
  const [position, setPosition] = useState<any>(null);
  const [watchId, setWatchId] = useState<string | null>(null);
  const [error, setError] = useState<any>(null);

  const getCurrentLocation = async () => {
    try {
      await Geolocation.requestPermissions();
      const pos = await Geolocation.getCurrentPosition();
      setPosition(pos.coords);
      setError(null);
    } catch (err) {
      setError(err);
    }
  };

  const startTracking = async () => {
    try {
      await Geolocation.requestPermissions();
      const id = await Geolocation.watchPosition(
        { enableHighAccuracy: true },
        (pos, err) => {
          if (err) {
            setError(err);
            return;
          }
          if (pos) {
            setPosition(pos.coords);
            setError(null);
          }
        }
      );
      setWatchId(id);
    } catch (err) {
      setError(err);
    }
  };

  const stopTracking = async () => {
    if (watchId) {
      await Geolocation.clearWatch({ id: watchId });
      setWatchId(null);
    }
  };

  return { position, error, watchId, getCurrentLocation, startTracking, stopTracking };
};
