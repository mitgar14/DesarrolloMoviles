import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonButtons, IonBackButton, IonCard, IonCardContent,
  IonCardHeader, IonCardTitle, IonText,
} from "@ionic/react";
import { useHaptics } from "../hooks/useHaptics";

const HapticsPage: React.FC = () => {
  const { isAvailable, impact, notify, vibrate } = useHaptics();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Haptics</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {!isAvailable && (
          <IonText color="warning">
            <p>Haptics no disponible en este dispositivo</p>
          </IonText>
        )}

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Impacto</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonButton onClick={() => impact("light")} color="tertiary">
              Light
            </IonButton>
            <IonButton onClick={() => impact("medium")} color="secondary">
              Medium
            </IonButton>
            <IonButton onClick={() => impact("heavy")} color="primary">
              Heavy
            </IonButton>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Notificación</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonButton onClick={() => notify("success")} color="success">
              Success
            </IonButton>
            <IonButton onClick={() => notify("warning")} color="warning">
              Warning
            </IonButton>
            <IonButton onClick={() => notify("error")} color="danger">
              Error
            </IonButton>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Vibración libre</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonButton onClick={() => vibrate(100)}>100ms</IonButton>
            <IonButton onClick={() => vibrate(300)}>300ms</IonButton>
            <IonButton onClick={() => vibrate(500)}>500ms</IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default HapticsPage;
