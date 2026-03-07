import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonButtons, IonBackButton, IonItem, IonLabel, IonBadge
} from '@ionic/react';
import { useParams } from 'react-router-dom';

function DetalleVisitaPage({ visitas, actualizarVisitas }: { visitas: any[]; actualizarVisitas: (v: any[]) => void }) {
  const { id } = useParams<{ id: string }>();
  const visita = visitas.find((v: any) => v.id === id);

  if (!visita) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/visitas" />
            </IonButtons>
            <IonTitle>Visita no encontrada</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <p>No se encontró la visita.</p>
        </IonContent>
      </IonPage>
    );
  }

  const cambiarEstado = (nuevoEstado: string) => {
    const nuevas = visitas.map((v: any) =>
      v.id === id ? { ...v, estado: nuevoEstado } : v
    );
    actualizarVisitas(nuevas);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/visitas" />
          </IonButtons>
          <IonTitle>Detalle de visita</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel>
            <h2>{visita.pacienteNombre}</h2>
            <p>Dirección: {visita.direccion}</p>
            <p>Hora: {visita.hora}</p>
          </IonLabel>
          <IonBadge slot="end" color={
            visita.estado === "pendiente" ? "warning" :
            visita.estado === "en_camino" ? "primary" :
            visita.estado === "en_curso" ? "secondary" :
            visita.estado === "finalizada" ? "success" : "danger"
          }>
            {visita.estado}
          </IonBadge>
        </IonItem>

        {visita.estado === "pendiente" && (
          <IonButton expand="block" color="primary" onClick={() => cambiarEstado("en_camino")} className="ion-margin-top">
            En camino
          </IonButton>
        )}
        {visita.estado === "en_camino" && (
          <IonButton expand="block" color="secondary" onClick={() => cambiarEstado("en_curso")} className="ion-margin-top">
            Iniciar atención
          </IonButton>
        )}
        {visita.estado === "en_curso" && (
          <IonButton expand="block" color="success" onClick={() => cambiarEstado("finalizada")} className="ion-margin-top">
            Finalizar visita
          </IonButton>
        )}
      </IonContent>
    </IonPage>
  );
}

export default DetalleVisitaPage;
