import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonButtons, IonBackButton, IonImg,
} from "@ionic/react";
import { useCamera } from "../hooks/useCamera";

const CameraPage: React.FC = () => {
  const { photo, takePhoto } = useCamera();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Cámara</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={takePhoto}>
          Tomar Foto
        </IonButton>

        {photo && (
          <IonImg
            src={photo}
            alt="Foto capturada"
            style={{ marginTop: "16px" }}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default CameraPage;
