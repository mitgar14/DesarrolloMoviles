import { useEffect, useState } from "react";
import {
  IonBadge,
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useMisiones } from "../hooks/useMisiones";
import {
  RankingUser,
  obtenerPosicionUsuario,
  obtenerTop5,
} from "../services/ranking";

const ResultadosPage: React.FC = () => {
  const history = useHistory();
  const { user } = useAuthContext();
  const { puntos, completadas, total } = useMisiones();

  const [top5, setTop5] = useState<RankingUser[]>([]);
  const [posicion, setPosicion] = useState<number | null>(null);

  const estadoGeneral = completadas === total ? "Completado" : "En progreso";

  useEffect(() => {
    const cargarRanking = async () => {
      const ranking = await obtenerTop5();
      setTop5(ranking);

      if (user) {
        const pos = await obtenerPosicionUsuario(user.uid);
        setPosicion(pos);
      }
    };

    cargarRanking();
  }, [user]);

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

        <h3>Ranking Top 5</h3>
        <IonList>
          {top5.map((u, index) => (
            <IonItem key={u.uid}>
              <IonLabel>
                <h3>
                  #{index + 1} - {u.email}
                </h3>
                <p>{u.points} puntos</p>
              </IonLabel>
              <IonBadge color="primary">
                {u.missionsCompleted} misiones
              </IonBadge>
            </IonItem>
          ))}
        </IonList>

        <p>Tu posición: {posicion ? `#${posicion}` : "Sin posición aún"}</p>

        <IonButton expand="block" onClick={() => history.push("/home")}>
          Volver
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ResultadosPage;
