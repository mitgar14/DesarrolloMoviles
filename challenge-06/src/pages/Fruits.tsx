import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonButton, IonButtons,
  IonBackButton, IonFab, IonFabButton, IonIcon,
} from "@ionic/react";
import { add } from "ionicons/icons";
import useDexie from "../hooks/useDexie";
import { useHistory } from "react-router-dom";

const Fruits: React.FC = () => {
  const { liveResults, deleteItem } = useDexie("frutas");
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Frutas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {liveResults.map((fruit: any) => (
            <IonItem key={fruit.id}>
              <IonLabel>
                <h2>{fruit.nombre}</h2>
                <p>Cantidad: {fruit.cantidad}</p>
              </IonLabel>
              <IonButton
                fill="clear"
                slot="end"
                onClick={() => history.push(`/fruits/edit/${fruit.id}`, { fruit })}
              >
                Editar
              </IonButton>
              <IonButton
                fill="clear"
                color="danger"
                slot="end"
                onClick={() => deleteItem(fruit.id)}
              >
                Borrar
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        {liveResults.length === 0 && (
          <div className="ion-text-center ion-padding">
            <p>No hay frutas</p>
          </div>
        )}

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/fruits/add">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Fruits;
