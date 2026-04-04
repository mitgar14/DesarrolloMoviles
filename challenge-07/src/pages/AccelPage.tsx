import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonCard, IonCardContent,
  IonCardHeader, IonCardTitle, IonBadge,
} from "@ionic/react";
import { useAccelerometer } from "../hooks/useAccelerometer";

const AccelPage: React.FC = () => {
  const { acceleration, magnitude, isShaking, isMoving } = useAccelerometer();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Acelerómetro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Aceleración</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p><strong>X:</strong> {acceleration.x.toFixed(2)}</p>
            <p><strong>Y:</strong> {acceleration.y.toFixed(2)}</p>
            <p><strong>Z:</strong> {acceleration.z.toFixed(2)}</p>
            <p><strong>Magnitud:</strong> {magnitude.toFixed(2)}</p>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <p>
              <strong>En movimiento:</strong>{" "}
              <IonBadge color={isMoving ? "success" : "medium"}>
                {isMoving ? "Sí" : "No"}
              </IonBadge>
            </p>
            <p style={{ marginTop: "8px" }}>
              <strong>Shake:</strong>{" "}
              <IonBadge color={isShaking ? "danger" : "medium"}>
                {isShaking ? "SHAKE DETECTADO" : "No"}
              </IonBadge>
            </p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default AccelPage;
