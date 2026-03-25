import { useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonInput, IonItem, IonList, IonButton, IonButtons, IonBackButton,
} from "@ionic/react";
import useCollection from "../hooks/useCollection";
import { useHistory, useParams, useLocation } from "react-router-dom";

const EditContact: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation<{ contact: any }>();
  const contact = location.state?.contact;
  const { update } = useCollection("contactos");
  const history = useHistory();

  const [nombre, setNombre] = useState(contact?.nombre ?? "");
  const [telefono, setTelefono] = useState(contact?.telefono ?? "");

  const handleSubmit = async () => {
    if (!nombre.trim() || !telefono.trim()) return;
    await update(id, { nombre, telefono });
    history.goBack();
  };

  if (!contact) {
    return (
      <IonPage>
        <IonContent className="ion-padding ion-text-center">
          <p>Contacto no encontrado</p>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/contacts" />
          </IonButtons>
          <IonTitle>Editar Contacto</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset>
          <IonItem>
            <IonInput
              label="Nombre"
              labelPlacement="stacked"
              value={nombre}
              onIonInput={(e) => setNombre(e.detail.value ?? "")}
            />
          </IonItem>
          <IonItem>
            <IonInput
              label="Telefono"
              labelPlacement="stacked"
              type="tel"
              value={telefono}
              onIonInput={(e) => setTelefono(e.detail.value ?? "")}
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

export default EditContact;
