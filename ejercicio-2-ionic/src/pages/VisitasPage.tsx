import { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonBadge, IonSegment, IonSegmentButton,
  IonItemSliding, IonItemOptions, IonItemOption,
  IonReorderGroup, IonReorder, IonAlert
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

function VisitasPage({ visitas, actualizarVisitas }: { visitas: any[]; actualizarVisitas: (v: any[]) => void }) {
  const [filtro, setFiltro] = useState('todas');
  const [visitaACancelar, setVisitaACancelar] = useState<string | null>(null);
  const history = useHistory();

  const cambiarEstado = (id: string, nuevoEstado: string, motivo?: string) => {
    const nuevas = visitas.map((v: any) => {
      if (v.id === id) {
        const actualizada = { ...v, estado: nuevoEstado };
        if (motivo) actualizada.motivoCancelacion = motivo;
        return actualizada;
      }
      return v;
    });
    actualizarVisitas(nuevas);
  };

  const handleReorder = (event: CustomEvent) => {
    const pendientes = visitas.filter((v: any) => v.estado === "pendiente");
    const resto = visitas.filter((v: any) => v.estado !== "pendiente");
    const reordenadas = event.detail.complete(pendientes);
    actualizarVisitas([...reordenadas, ...resto]);
  };

  const colorPorEstado = (estado: string) => {
    if (estado === "pendiente") return "warning";
    if (estado === "en_camino") return "primary";
    if (estado === "en_curso") return "secondary";
    if (estado === "finalizada") return "success";
    return "danger";
  };

  const visitasFiltradas = filtro === 'todas'
    ? visitas
    : visitas.filter((v: any) => v.estado === filtro);

  const pendientes = visitasFiltradas.filter((v: any) => v.estado === "pendiente");
  const noPendientes = visitasFiltradas.filter((v: any) => v.estado !== "pendiente");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Visitas del día</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSegment value={filtro} onIonChange={e => setFiltro(e.detail.value as string)}>
            <IonSegmentButton value="todas">Todas</IonSegmentButton>
            <IonSegmentButton value="pendiente">Pendientes</IonSegmentButton>
            <IonSegmentButton value="en_curso">En curso</IonSegmentButton>
            <IonSegmentButton value="finalizada">Finalizadas</IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
            {pendientes.map((visita: any) => (
              <IonItemSliding key={visita.id}>
                <IonItemOptions side="start">
                  <IonItemOption color="secondary" onClick={() => history.push(`/visitas/${visita.id}`)}>
                    Ver detalle
                  </IonItemOption>
                </IonItemOptions>

                <IonItem>
                  <IonLabel>
                    <h2>{visita.pacienteNombre}</h2>
                    <p>{visita.hora} - {visita.direccion}</p>
                  </IonLabel>
                  <IonBadge slot="end" color={colorPorEstado(visita.estado)}>{visita.estado}</IonBadge>
                  <IonReorder slot="end" />
                </IonItem>

                <IonItemOptions side="end">
                  <IonItemOption color="primary" onClick={() => cambiarEstado(visita.id, "en_camino")}>
                    En camino
                  </IonItemOption>
                  <IonItemOption color="danger" onClick={() => setVisitaACancelar(visita.id)}>
                    Cancelar
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
          </IonReorderGroup>

          {noPendientes.map((visita: any) => (
            <IonItemSliding key={visita.id}>
              <IonItemOptions side="start">
                <IonItemOption color="secondary" onClick={() => history.push(`/visitas/${visita.id}`)}>
                  Ver detalle
                </IonItemOption>
              </IonItemOptions>

              <IonItem>
                <IonLabel>
                  <h2>{visita.pacienteNombre}</h2>
                  <p>{visita.hora} - {visita.direccion}</p>
                </IonLabel>
                <IonBadge slot="end" color={colorPorEstado(visita.estado)}>{visita.estado}</IonBadge>
              </IonItem>

              <IonItemOptions side="end">
                <IonItemOption color="primary" onClick={() => cambiarEstado(visita.id, "en_camino")}>
                  En camino
                </IonItemOption>
                <IonItemOption color="danger" onClick={() => setVisitaACancelar(visita.id)}>
                  Cancelar
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>

        <IonAlert
          isOpen={!!visitaACancelar}
          onDidDismiss={() => setVisitaACancelar(null)}
          header="Cancelar visita"
          message="Ingrese el motivo de cancelación"
          inputs={[{ name: "motivo", type: "text", placeholder: "Motivo..." }]}
          buttons={[
            { text: "No", role: "cancel" },
            { text: "Confirmar", handler: (data: any) => {
              if (visitaACancelar) cambiarEstado(visitaACancelar, "cancelada", data.motivo);
            }}
          ]}
        />
      </IonContent>
    </IonPage>
  );
}

export default VisitasPage;
