import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel
} from '@ionic/react';

const pacientes = [
  { id: "1", nombre: "Carlos Gómez", dni: "12345678", telefono: "3001234567" },
  { id: "2", nombre: "María López", dni: "87654321", telefono: "3009876543" },
  { id: "3", nombre: "Pedro Ramírez", dni: "11223344", telefono: "3005551234" },
  { id: "4", nombre: "Ana Torres", dni: "44332211", telefono: "3007654321" },
];

function MisPacientesPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis Pacientes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {pacientes.map(p => (
            <IonItem key={p.id}>
              <IonLabel>
                <h2>{p.nombre}</h2>
                <p>DNI: {p.dni} - Tel: {p.telefono}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default MisPacientesPage;
