import { useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

export function useMissionCamera() {
  const [photoPath, setPhotoPath] = useState<string | null>(null);

  const takeEvidence = async () => {
    const permiso = await Camera.checkPermissions();
    if (permiso.camera !== "granted") {
      await Camera.requestPermissions();
    }

    const photo = await Camera.getPhoto({
      quality: 70,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

    if (!photo.webPath) return null;

    setPhotoPath(photo.webPath);
    return photo.webPath;
  };

  return { photoPath, takeEvidence };
}
