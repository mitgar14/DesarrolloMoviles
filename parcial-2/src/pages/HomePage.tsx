import { useEffect, useState } from "react";
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
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
import { useMissionCamera } from "../hooks/useMissionCamera";
import { useMissionMovement } from "../hooks/useMissionMovement";
import { useMotionStillness } from "../hooks/useMotionStillness";
import "./HomePage.css";

const HomePage: React.FC = () => {
  const history = useHistory();
  const { user, logout } = useAuthContext();
  const { puntos, misiones, completarMision, completadas, total, progreso } =
    useMisiones();

  const { photoPath, takeEvidence } = useMissionCamera();
  const { distance, checkMovement } = useMissionMovement();
  const { running, waitStillAndVibrate } = useMotionStillness();

  const [estadoM2, setEstadoM2] = useState("Sin iniciar");
  const [estadoM3, setEstadoM3] = useState("Pendiente");

  useEffect(() => {
    prepararNotificaciones().catch(() => {});
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

  const finalizarMision = async (id: number) => {
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

  const handleEjecutarMision = async (id: number) => {
    if (id === 1) {
      const path = await takeEvidence();
      if (!path) return;
      await finalizarMision(1);
      return;
    }

    if (id === 2) {
      const movement = await checkMovement();

      if (movement.initialized) {
        setEstadoM2("Posición inicial guardada. Muévete y vuelve a ejecutar.");
        return;
      }

      if (movement.detected30 && !movement.completed50) {
        setEstadoM2(
          `Movimiento detectado (${movement.distance.toFixed(1)}m). Falta llegar a 50m.`,
        );
        return;
      }

      if (movement.completed50) {
        setEstadoM2(`Recorrido completado (${movement.distance.toFixed(1)}m).`);
        await finalizarMision(2);
        return;
      }

      setEstadoM2(`Aún no supera 30m (${movement.distance.toFixed(1)}m).`);
      return;
    }

    if (id === 3) {
      setEstadoM3("Midiendo quietud por 10 segundos...");
      const ok = await waitStillAndVibrate();

      if (!ok) {
        setEstadoM3("Hubo movimiento. Intenta de nuevo.");
        return;
      }

      setEstadoM3("Quietud validada y vibración ejecutada.");
      await finalizarMision(3);
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
            <IonItem key={mision.id} className="mission-item">
              <IonLabel className="mission-label">
                <div className="mission-title">
                  {mision.titulo || `Misión ${mision.id}`}
                </div>
                <div className="mission-points">{mision.puntos} puntos</div>
              </IonLabel>

              <IonBadge
                slot="end"
                color={mision.completada ? "success" : "medium"}
              >
                {mision.completada ? "completada" : "pendiente"}
              </IonBadge>

              <IonButton
                slot="end"
                disabled={mision.completada || !mision.habilitada || running}
                onClick={() => handleEjecutarMision(mision.id)}
              >
                Ejecutar
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        {photoPath && <IonImg src={photoPath} />}

        <p>Estado misión 2: {estadoM2}</p>
        <p>Distancia desde origen: {distance.toFixed(1)}m</p>
        <p>Estado misión 3: {estadoM3}</p>

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
