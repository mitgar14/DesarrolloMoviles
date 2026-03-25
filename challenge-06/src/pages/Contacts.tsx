import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonButton, IonButtons,
  IonBackButton, IonFab, IonFabButton, IonIcon, IonSpinner,
} from "@ionic/react";
import { add } from "ionicons/icons";
import useCollection from "../hooks/useCollection";
import { useHistory } from "react-router-dom";

const Contacts: React.FC = () => {
  const { results, isPending, remove } = useCollection("contactos");
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Contactos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {isPending && <IonSpinner className="ion-margin" />}

        <IonList>
          {results.map((contact: any) => (
            <IonItem key={contact.id}>
              <IonLabel>
                <h2>{contact.nombre}</h2>
                <p>{contact.telefono}</p>
              </IonLabel>
              <IonButton
                fill="clear"
                slot="end"
                onClick={() => history.push(`/contacts/edit/${contact.id}`, { contact })}
              >
                Editar
              </IonButton>
              <IonButton
                fill="clear"
                color="danger"
                slot="end"
                onClick={() => remove(contact.id)}
              >
                Borrar
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        {!isPending && results.length === 0 && (
          <div className="ion-text-center ion-padding">
            <p>No hay contactos</p>
          </div>
        )}

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/contacts/add">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Contacts;
