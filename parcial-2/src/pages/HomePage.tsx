import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonProgressBar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useMisiones } from "../hooks/useMisiones";

const HomePage: React.FC = () => {
  const history = useHistory();
  const { logout } = useAuthContext();
  const { puntos, misiones, completarMision, completadas, total, progreso } =
    useMisiones();

  const handleCerrarSesion = async () => {
    await logout();
    history.replace("/login");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Misiones</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleCerrarSesion}>Salir</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Puntos: {puntos}</h2>
        <p>
          Progreso: {completadas}/{total}
        </p>
        <IonProgressBar value={progreso} />

        <IonList className="ion-margin-top">
          {misiones.map((mision) => (
            <IonItem key={mision.id}>
              <IonLabel>
                <h3>{mision.titulo}</h3>
                <p>{mision.puntos} puntos</p>
              </IonLabel>

              <IonBadge color={mision.completada ? "success" : "medium"}>
                {mision.completada ? "completada" : "pendiente"}
              </IonBadge>

              <IonButton
                slot="end"
                disabled={mision.completada || !mision.habilitada}
                onClick={() => completarMision(mision.id)}
              >
                Ejecutar
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        <IonButton
          expand="block"
          className="ion-margin-top"
          onClick={() => history.push("/resultados")}
        >
          Ver resultados
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
