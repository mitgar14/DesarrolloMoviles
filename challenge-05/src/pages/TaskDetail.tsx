import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton, IonChip,
} from "@ionic/react";
import { useTasksContext } from "../context/TasksContext";
import { useHistory, useParams } from "react-router-dom";

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getTask, deleteTask } = useTasksContext();
  const history = useHistory();
  const task = getTask(id);

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
          <IonTitle>Detalle</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>{task.title}</h1>
        <p>{task.description || "Sin descripcion"}</p>
        <IonChip color={task.done ? "success" : "warning"}>
          {task.done ? "Completada" : "Pendiente"}
        </IonChip>

        <div className="ion-margin-top">
          <IonButton expand="block" routerLink={`/tasks/edit/${task.id}`}>
            Editar
          </IonButton>
          <IonButton
            expand="block"
            color="danger"
            onClick={() => { deleteTask(task.id); history.push("/tasks"); }}
          >
            Eliminar
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TaskDetail;
