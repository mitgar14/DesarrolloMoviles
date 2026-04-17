import { useState, useRef } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton, IonIcon, IonToast,
} from "@ionic/react";
import { cameraOutline, downloadOutline } from "ionicons/icons";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { useGeolocation } from "../hooks/useGeolocation";
import { Filesystem, Directory } from "@capacitor/filesystem";

const WatermarkPage: React.FC = () => {
  const { position, getCurrentLocation } = useGeolocation();
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const takePhotoWithWatermark = async () => {
    try {
      setProcessing(true);

      // Obtener ubicación actual si no la tenemos
      if (!position) await getCurrentLocation();

      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });

      if (!image.base64String) {
        setToast("No se pudo obtener la foto");
        return;
      }

      // Cargar imagen en canvas y dibujar watermark
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Dibujar foto original
        ctx.drawImage(img, 0, 0);

        // Configurar watermark
        const fontSize = Math.max(16, img.width * 0.025);
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        ctx.strokeStyle = "rgba(0, 0, 0, 0.6)";
        ctx.lineWidth = 2;

        // Texto del watermark
        const lat = position?.latitude?.toFixed(6) || "N/A";
        const lng = position?.longitude?.toFixed(6) || "N/A";
        const date = new Date().toLocaleString("es-CO");
        const lines = [
          `📍 ${lat}, ${lng}`,
          `📅 ${date}`,
        ];

        // Fondo semitransparente
        const padding = fontSize * 0.5;
        const lineHeight = fontSize * 1.4;
        const boxHeight = lines.length * lineHeight + padding * 2;
        const boxY = img.height - boxHeight - padding;

        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, boxY, img.width, boxHeight + padding);

        // Texto
        ctx.fillStyle = "white";
        lines.forEach((line, i) => {
          const y = boxY + padding + (i + 1) * lineHeight;
          ctx.fillText(line, padding, y);
        });

        const result = canvas.toDataURL("image/jpeg", 0.9);
        setResultImage(result);
        setProcessing(false);
      };

      img.src = `data:image/jpeg;base64,${image.base64String}`;
    } catch (err) {
      console.error(err);
      setToast("Error al tomar la foto");
      setProcessing(false);
    }
  };

  const saveImage = async () => {
    if (!resultImage) return;
    try {
      const base64Data = resultImage.split(",")[1];
      const filename = `watermark_${Date.now()}.jpg`;
      await Filesystem.writeFile({
        path: filename,
        data: base64Data,
        directory: Directory.Documents,
      });
      setToast(`Imagen guardada: ${filename}`);
    } catch {
      setToast("Error al guardar");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Foto + Ubicación</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p style={{ color: "#888", fontSize: 14, textAlign: "center" }}>
          Toma una foto y se le agregará tu ubicación actual como marca de agua.
        </p>

        {position && (
          <p style={{ textAlign: "center", fontSize: 13, color: "#666" }}>
            Ubicación: {position.latitude.toFixed(6)}, {position.longitude.toFixed(6)}
          </p>
        )}

        <IonButton expand="block" onClick={takePhotoWithWatermark} disabled={processing}>
          <IonIcon icon={cameraOutline} slot="start" />
          {processing ? "Procesando..." : "Tomar Foto con Watermark"}
        </IonButton>

        {resultImage && (
          <>
            <img
              src={resultImage}
              alt="Foto con watermark"
              style={{ width: "100%", borderRadius: 8, marginTop: 12 }}
            />
            <IonButton expand="block" color="success" onClick={saveImage}>
              <IonIcon icon={downloadOutline} slot="start" />
              Guardar Imagen
            </IonButton>
          </>
        )}

        <canvas ref={canvasRef} style={{ display: "none" }} />
        <IonToast isOpen={!!toast} message={toast || ""} duration={2000} onDidDismiss={() => setToast(null)} />
      </IonContent>
    </IonPage>
  );
};

export default WatermarkPage;
