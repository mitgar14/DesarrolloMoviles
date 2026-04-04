import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonButtons, IonBackButton, IonCard, IonCardContent,
  IonCardHeader, IonCardTitle, IonSpinner, IonText,
} from "@ionic/react";
import { useDevice } from "../hooks/useDevice";

const DevicePage: React.FC = () => {
  const { battery, info, deviceId, loading, error, refresh } = useDevice();

  if (loading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle>Device Info</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding ion-text-center">
          <IonSpinner />
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Device Info</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={refresh}>
          Actualizar datos
        </IonButton>

        {error && (
          <IonText color="danger">
            <p>Error: {error.message}</p>
          </IonText>
        )}

        {battery && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Batería</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p><strong>Nivel:</strong> {battery.batteryLevel !== undefined ? `${(battery.batteryLevel * 100).toFixed(0)}%` : "No disponible"}</p>
              <p><strong>Cargando:</strong> {battery.isCharging ? "Sí" : "No"}</p>
            </IonCardContent>
          </IonCard>
        )}

        {info && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Información del dispositivo</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p><strong>Modelo:</strong> {info.model}</p>
              <p><strong>Plataforma:</strong> {info.platform}</p>
              <p><strong>Sistema operativo:</strong> {info.operatingSystem}</p>
              <p><strong>Versión SO:</strong> {info.osVersion}</p>
              <p><strong>Fabricante:</strong> {info.manufacturer}</p>
            </IonCardContent>
          </IonCard>
        )}

        {deviceId && (
          <IonCard>
            <IonCardContent>
              <p><strong>Device ID:</strong> {deviceId}</p>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default DevicePage;
