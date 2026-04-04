import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonButtons, IonBackButton, IonCard, IonCardContent,
  IonCardHeader, IonCardTitle, IonText,
} from "@ionic/react";
import { useGeolocation } from "../hooks/useGeolocation";

const GeoPage: React.FC = () => {
  const { position, error, watchId, getCurrentLocation, startTracking, stopTracking } = useGeolocation();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Geolocalización</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={getCurrentLocation}>
          Obtener ubicación actual
        </IonButton>
        <IonButton
          expand="block"
          color={watchId ? "danger" : "success"}
          onClick={watchId ? stopTracking : startTracking}
        >
          {watchId ? "Detener tracking" : "Iniciar tracking"}
        </IonButton>

        {error && (
          <IonText color="danger">
            <p>Error: {error.message || "No se pudo obtener la ubicación"}</p>
          </IonText>
        )}

        {position && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Coordenadas</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p><strong>Latitud:</strong> {position.latitude}</p>
              <p><strong>Longitud:</strong> {position.longitude}</p>
              <p><strong>Precisión:</strong> {position.accuracy} m</p>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default GeoPage;
