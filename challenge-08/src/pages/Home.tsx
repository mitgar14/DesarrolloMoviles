import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonList, IonItem, IonLabel, IonIcon,
} from "@ionic/react";
import { mapOutline, trailSignOutline, cameraOutline } from "ionicons/icons";

const pages = [
  { name: "Mapa + Sensores", path: "/map", icon: mapOutline, color: "primary",
    desc: "Geolocalización, tracking, WiFi, batería, notificaciones" },
  { name: "Historial de Rutas", path: "/history", icon: trailSignOutline, color: "secondary",
    desc: "Ver y gestionar recorridos guardados" },
  { name: "Foto + Ubicación", path: "/watermark", icon: cameraOutline, color: "tertiary",
    desc: "Tomar foto con marca de agua de ubicación" },
];

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Challenge 08 - Maps</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {pages.map((page) => (
            <IonItem key={page.path} routerLink={page.path} detail>
              <IonIcon icon={page.icon} slot="start" color={page.color} />
              <IonLabel>
                <h2>{page.name}</h2>
                <p>{page.desc}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
