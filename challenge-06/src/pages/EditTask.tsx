import { useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonInput, IonItem, IonList, IonButton, IonButtons, IonBackButton,
} from "@ionic/react";
import useRealTimeCollection from "../hooks/useRealTimeCollection";
import { useHistory, useParams, useLocation } from "react-router-dom";

const EditTask: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation<{ task: any }>();
  const task = location.state?.task;
  const { update } = useRealTimeCollection("tareas");
  const history = useHistory();

  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");

  const handleSubmit = async () => {
    if (!title.trim()) return;
    await update(id, { ...task, title, description });
    history.goBack();
  };

  if (!task) {
    return (
      <IonPage>
        <IonContent className="ion-padding ion-text-center">
          <p>Tarea no encontrada</p>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tasks" />
          </IonButtons>
          <IonTitle>Editar Tarea</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset>
          <IonItem>
            <IonInput
              label="Titulo"
              labelPlacement="stacked"
              value={title}
              onIonInput={(e) => setTitle(e.detail.value ?? "")}
            />
          </IonItem>
          <IonItem>
            <IonInput
              label="Descripcion"
              labelPlacement="stacked"
              value={description}
              onIonInput={(e) => setDescription(e.detail.value ?? "")}
            />
          </IonItem>
          <IonButton expand="block" className="ion-margin" onClick={handleSubmit}>
            Guardar
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default EditTask;
