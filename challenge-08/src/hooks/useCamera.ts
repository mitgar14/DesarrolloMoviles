import { useState } from "react";
import { Camera, CameraResultType } from "@capacitor/camera";

export const useCamera = () => {
  const [photo, setPhoto] = useState<string | null>(null);

  const takePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri,
      });
      setPhoto(image.webPath || null);
    } catch (err) {
      console.error("Error al tomar foto:", err);
    }
  };

  return { photo, takePhoto };
};
