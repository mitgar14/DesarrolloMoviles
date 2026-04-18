import { useEffect } from "react";
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
import {
  notificarFaltaUnaMision,
  notificarMisionCompletada,
  prepararNotificaciones,
} from "../services/notificaciones";
import { guardarPuntajeUsuario } from "../services/ranking";

const HomePage: React.FC = () => {
  const history = useHistory();
  const { user, logout } = useAuthContext();
  const { puntos, misiones, completarMision, completadas, total, progreso } =
    useMisiones();

  useEffect(() => {
    prepararNotificaciones();
  }, []);

  useEffect(() => {
    if (!user) return;

    guardarPuntajeUsuario({
      uid: user.uid,
      email: user.email ?? "sin-correo",
      points: puntos,
      missions: misiones.map((m) => ({ id: m.id, completed: m.completada })),
      missionsCompleted: completadas,
    }).catch(() => {});
  }, [user, puntos, completadas, misiones]);

  const handleCerrarSesion = async () => {
    await logout();
    history.replace("/login");
  };

  const handleEjecutarMision = async (id: number) => {
    const resultado = completarMision(id);
    if (!resultado) return;

    await notificarMisionCompletada();

    const faltantes = resultado.total - resultado.completed;
    if (faltantes === 1) {
      await notificarFaltaUnaMision();
    }

    if (user) {
      await guardarPuntajeUsuario({
        uid: user.uid,
        email: user.email ?? "sin-correo",
        points: resultado.points,
        missions: resultado.missions,
        missionsCompleted: resultado.completed,
      });
    }
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
                onClick={() => handleEjecutarMision(mision.id)}
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
