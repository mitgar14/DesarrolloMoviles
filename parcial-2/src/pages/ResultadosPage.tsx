import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useMisiones } from "../hooks/useMisiones";

const ResultadosPage: React.FC = () => {
  const history = useHistory();
  const { puntos, completadas, total } = useMisiones();

  const estadoGeneral = completadas === total ? "Completado" : "En progreso";

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Resultados</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Puntos totales: {puntos}</h2>
        <p>
          Misiones completadas: {completadas}/{total}
        </p>
        <p>Estado general: {estadoGeneral}</p>

        <IonButton expand="block" onClick={() => history.push("/home")}>
          Volver
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ResultadosPage;
