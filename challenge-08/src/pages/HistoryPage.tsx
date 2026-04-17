import { useState, useEffect } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonList, IonItem, IonLabel,
  IonIcon, IonButton, IonCard, IonCardHeader, IonCardTitle,
  IonCardContent, IonToast,
} from "@ionic/react";
import { trailSignOutline, trashOutline, refreshOutline } from "ionicons/icons";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

interface TrackingRecord {
  filename: string;
  date: string;
  totalPoints: number;
  points: [number, number][];
}

const HistoryPage: React.FC = () => {
  const [records, setRecords] = useState<TrackingRecord[]>([]);
  const [selected, setSelected] = useState<TrackingRecord | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const loadRecords = async () => {
    try {
      const result = await Filesystem.readdir({
        path: "",
        directory: Directory.Documents,
      });

      const trackingFiles = result.files.filter((f) => f.name.startsWith("tracking_"));

      const loaded: TrackingRecord[] = [];
      for (const file of trackingFiles) {
        try {
          const content = await Filesystem.readFile({
            path: file.name,
            directory: Directory.Documents,
            encoding: Encoding.UTF8,
          });
          const data = JSON.parse(content.data as string);
          loaded.push({ ...data, filename: file.name });
        } catch {
          // archivo corrupto, ignorar
        }
      }

      loaded.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setRecords(loaded);
    } catch {
      setRecords([]);
    }
  };

  const deleteRecord = async (filename: string) => {
    try {
      await Filesystem.deleteFile({ path: filename, directory: Directory.Documents });
      setToast("Registro eliminado");
      if (selected?.filename === filename) setSelected(null);
      loadRecords();
    } catch {
      setToast("Error al eliminar");
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("es-CO", {
      day: "numeric", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Historial de Rutas</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={loadRecords}>
              <IonIcon icon={refreshOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {records.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: 40, color: "#888" }}>
            <IonIcon icon={trailSignOutline} style={{ fontSize: 48 }} />
            <p>No hay rutas guardadas</p>
            <p style={{ fontSize: 13 }}>Usa el mapa para grabar un recorrido y guárdalo</p>
          </div>
        ) : (
          <IonList>
            {records.map((record) => (
              <IonItem key={record.filename} button onClick={() => setSelected(record)}>
                <IonIcon icon={trailSignOutline} slot="start" color="primary" />
                <IonLabel>
                  <h3>{formatDate(record.date)}</h3>
                  <p>{record.totalPoints} puntos registrados</p>
                </IonLabel>
                <IonButton
                  slot="end"
                  fill="clear"
                  color="danger"
                  onClick={(e) => { e.stopPropagation(); deleteRecord(record.filename); }}
                >
                  <IonIcon icon={trashOutline} />
                </IonButton>
              </IonItem>
            ))}
          </IonList>
        )}

        {selected && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle style={{ fontSize: 16 }}>
                Ruta del {formatDate(selected.date)}
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p><strong>Puntos:</strong> {selected.totalPoints}</p>
              {selected.points.length > 0 && (
                <>
                  <p><strong>Inicio:</strong> {selected.points[0][0].toFixed(5)}, {selected.points[0][1].toFixed(5)}</p>
                  <p><strong>Fin:</strong> {selected.points[selected.points.length - 1][0].toFixed(5)}, {selected.points[selected.points.length - 1][1].toFixed(5)}</p>
                </>
              )}
              <IonButton size="small" fill="outline" onClick={() => setSelected(null)}>
                Cerrar
              </IonButton>
            </IonCardContent>
          </IonCard>
        )}

        <IonToast isOpen={!!toast} message={toast || ""} duration={2000} onDidDismiss={() => setToast(null)} />
      </IonContent>
    </IonPage>
  );
};

export default HistoryPage;
