import { useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonButtons, IonBackButton, IonCard, IonCardContent,
  IonCardHeader, IonCardTitle, IonText, IonList, IonItem, IonLabel,
} from "@ionic/react";
import { useFilesystem } from "../hooks/useFilesystem";

const TEST_FILE = "test-data.json";

const FilesystemPage: React.FC = () => {
  const { files, fileContent, error, writeFile, readFile, deleteFile, listFiles } = useFilesystem();
  const [written, setWritten] = useState(false);

  const handleWrite = async () => {
    await writeFile(TEST_FILE, {
      nombre: "Miguel",
      curso: "Plataformas Móviles",
      timestamp: new Date().toISOString(),
    });
    setWritten(true);
  };

  const handleRead = async () => {
    await readFile(TEST_FILE);
  };

  const handleDelete = async () => {
    await deleteFile(TEST_FILE);
    setWritten(false);
  };

  const handleList = async () => {
    await listFiles();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Filesystem</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={handleWrite}>
          Escribir archivo JSON
        </IonButton>
        <IonButton expand="block" onClick={handleRead} disabled={!written}>
          Leer archivo
        </IonButton>
        <IonButton expand="block" onClick={handleList}>
          Listar archivos
        </IonButton>
        <IonButton expand="block" color="danger" onClick={handleDelete} disabled={!written}>
          Eliminar archivo
        </IonButton>

        {error && (
          <IonText color="danger">
            <p>Error: {error.message || "Ocurrió un error"}</p>
          </IonText>
        )}

        {fileContent && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Contenido del archivo</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <pre style={{ whiteSpace: "pre-wrap", fontSize: "14px" }}>
                {fileContent}
              </pre>
            </IonCardContent>
          </IonCard>
        )}

        {files.length > 0 && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Archivos en Documents</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                {files.map((f) => (
                  <IonItem key={f}>
                    <IonLabel>{f}</IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default FilesystemPage;
