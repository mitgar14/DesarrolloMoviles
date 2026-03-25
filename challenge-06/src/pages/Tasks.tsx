import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonButton, IonButtons,
  IonBackButton, IonCheckbox, IonFab, IonFabButton, IonIcon, IonSpinner,
} from "@ionic/react";
import { add } from "ionicons/icons";
import useRealTimeCollection from "../hooks/useRealTimeCollection";
import { useHistory } from "react-router-dom";

const Tasks: React.FC = () => {
  const { results, isPending, update, deleteDoc } = useRealTimeCollection("tareas");
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Tareas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {isPending && <IonSpinner className="ion-margin" />}

        <IonList>
          {results.map((task: any) => (
            <IonItem key={task.id}>
              <IonCheckbox
                slot="start"
                checked={task.done}
                onIonChange={(e) =>
                  update(task.id, { ...task, done: e.detail.checked })
                }
              />
              <IonLabel style={{ textDecoration: task.done ? "line-through" : "none" }}>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
              </IonLabel>
              <IonButton
                fill="clear"
                slot="end"
                onClick={() => history.push(`/tasks/edit/${task.id}`, { task })}
              >
                Editar
              </IonButton>
              <IonButton
                fill="clear"
                color="danger"
                slot="end"
                onClick={() => deleteDoc(task.id)}
              >
                Borrar
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        {!isPending && results.length === 0 && (
          <div className="ion-text-center ion-padding">
            <p>No hay tareas</p>
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

export default Tasks;
