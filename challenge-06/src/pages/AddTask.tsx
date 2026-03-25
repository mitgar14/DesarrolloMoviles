import { useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonInput, IonItem, IonList, IonButton, IonButtons, IonBackButton,
} from "@ionic/react";
import useRealTimeCollection from "../hooks/useRealTimeCollection";
import { useHistory } from "react-router-dom";

const AddTask: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { add } = useRealTimeCollection("tareas");
  const history = useHistory();

  const handleSubmit = async () => {
    if (!title.trim()) return;
    await add({ title, description, done: false });
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tasks" />
          </IonButtons>
          <IonTitle>Nueva Tarea</IonTitle>
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

export default AddTask;
