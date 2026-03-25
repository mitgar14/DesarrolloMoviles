import { useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonInput, IonItem, IonList, IonButton, IonButtons, IonBackButton,
} from "@ionic/react";
import useDexie from "../hooks/useDexie";
import { useHistory, useParams, useLocation } from "react-router-dom";

const EditFruit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation<{ fruit: any }>();
  const fruit = location.state?.fruit;
  const { update } = useDexie("frutas");
  const history = useHistory();

  const [nombre, setNombre] = useState(fruit?.nombre ?? "");
  const [cantidad, setCantidad] = useState(String(fruit?.cantidad ?? ""));

  const handleSubmit = async () => {
    if (!nombre.trim()) return;
    await update(Number(id), { nombre, cantidad: Number(cantidad) || 0 });
    history.goBack();
  };

  if (!fruit) {
    return (
      <IonPage>
        <IonContent className="ion-padding ion-text-center">
          <p>Fruta no encontrada</p>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/fruits" />
          </IonButtons>
          <IonTitle>Editar Fruta</IonTitle>
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

export default EditFruit;
