import { useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonInput, IonItem, IonList, IonButton, IonButtons, IonBackButton,
} from "@ionic/react";
import useCollection from "../hooks/useCollection";
import { useHistory } from "react-router-dom";

const AddContact: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const { add } = useCollection("contactos");
  const history = useHistory();

  const handleSubmit = async () => {
    if (!nombre.trim() || !telefono.trim()) return;
    await add({ nombre, telefono });
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/contacts" />
          </IonButtons>
          <IonTitle>Nuevo Contacto</IonTitle>
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

export default AddContact;
