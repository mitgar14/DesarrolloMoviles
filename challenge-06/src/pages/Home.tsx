import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonButtons, IonIcon, IonItem, IonLabel, IonText,
} from "@ionic/react";
import { wifiOutline, cellularOutline, cloudOfflineOutline } from "ionicons/icons";
import { useAuthContext } from "../context/AuthContext";
import useNetwork from "../hooks/useNetwork";
import { useHistory } from "react-router-dom";

const Home: React.FC = () => {
  const { logout } = useAuthContext();
  const { isOnline, connectionType } = useNetwork();
  const history = useHistory();

  const handleLogout = async () => {
    await logout();
    history.push("/login");
  };

  const getIcon = () => {
    if (!isOnline) return cloudOfflineOutline;
    if (connectionType === "wifi") return wifiOutline;
    return cellularOutline;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Challenge 06</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout} color="danger">
              Salir
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonIcon icon={getIcon()} slot="start" />
          <IonLabel>
            <IonText color={isOnline ? "success" : "danger"}>
              <h2>{isOnline ? "Conectado" : "Sin conexion"}</h2>
            </IonText>
            <p>Tipo: {connectionType ?? "desconocido"}</p>
          </IonLabel>
        </IonItem>

        {!isOnline && (
          <div className="ion-padding ion-text-center">
            <IonText color="danger">
              <p>Contactos y Tareas requieren conexion a internet</p>
            </IonText>
          </div>
        )}

        <div className="ion-padding">
          <IonButton
            expand="block"
            className="ion-margin-bottom"
            routerLink="/contacts"
            disabled={!isOnline}
          >
            Contactos (Firestore)
          </IonButton>

          <IonButton
            expand="block"
            className="ion-margin-bottom"
            routerLink="/tasks"
            disabled={!isOnline}
          >
            Tareas (Realtime DB)
          </IonButton>

          <IonButton
            expand="block"
            className="ion-margin-bottom"
            routerLink="/fruits"
          >
            Frutas (Dexie - Local)
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
