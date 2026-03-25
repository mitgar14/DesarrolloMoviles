import { useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonInput, IonItem, IonList, IonButton, IonButtons, IonBackButton,
} from "@ionic/react";
import useDexie from "../hooks/useDexie";
import { useHistory } from "react-router-dom";

const AddFruit: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const { add } = useDexie("frutas");
  const history = useHistory();

  const handleSubmit = async () => {
    if (!nombre.trim()) return;
    await add({ nombre, cantidad: Number(cantidad) || 0 });
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/fruits" />
          </IonButtons>
          <IonTitle>Nueva Fruta</IonTitle>
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
              label="Cantidad"
              labelPlacement="stacked"
              type="number"
              value={cantidad}
              onIonInput={(e) => setCantidad(e.detail.value ?? "")}
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

export default AddFruit;
