import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonButton, IonButtons,
  IonCheckbox, IonFab, IonFabButton, IonIcon,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useTasksContext } from "../context/TasksContext";
import { useAuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

const TasksList: React.FC = () => {
  const { tasks, updateTask, deleteTask } = useTasksContext();
  const { logout } = useAuthContext();
  const history = useHistory();

  const handleLogout = async () => {
    await logout();
    history.push("/login");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis Tareas</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout} color="danger">
              Salir
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {tasks.map((task) => (
            <IonItem key={task.id} button onClick={() => history.push(`/tasks/detail/${task.id}`)}>
              <IonCheckbox
                slot="start"
                checked={task.done}
                onClick={(e) => e.stopPropagation()}
                onIonChange={(e) => updateTask(task.id, { done: e.detail.checked })}
              />
              <IonLabel style={{ textDecoration: task.done ? "line-through" : "none" }}>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
              </IonLabel>
              <IonButton
                fill="clear"
                slot="end"
                onClick={(e) => { e.stopPropagation(); history.push(`/tasks/edit/${task.id}`); }}
              >
                Editar
              </IonButton>
              <IonButton
                fill="clear"
                color="danger"
                slot="end"
                onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
              >
                Borrar
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        {tasks.length === 0 && (
          <div className="ion-text-center ion-padding">
            <p>No hay tareas todavia</p>
          </div>
        )}

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/tasks/add">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default TasksList;
