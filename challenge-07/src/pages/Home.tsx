import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonButton, IonList, IonItem, IonLabel, IonIcon,
} from "@ionic/react";
import {
  locationOutline, cameraOutline, speedometerOutline,
  phonePortraitOutline, handLeftOutline, folderOutline,
} from "ionicons/icons";

const sensors = [
  { name: "Geolocalización", path: "/geo", icon: locationOutline, color: "primary" },
  { name: "Cámara", path: "/camera", icon: cameraOutline, color: "secondary" },
  { name: "Acelerómetro", path: "/accel", icon: speedometerOutline, color: "tertiary" },
  { name: "Device Info", path: "/device", icon: phonePortraitOutline, color: "success" },
  { name: "Haptics", path: "/haptics", icon: handLeftOutline, color: "warning" },
  { name: "Filesystem", path: "/filesystem", icon: folderOutline, color: "danger" },
];

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sensores Nativos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {sensors.map((sensor) => (
            <IonItem key={sensor.path} routerLink={sensor.path}>
              <IonIcon icon={sensor.icon} slot="start" color={sensor.color} />
              <IonLabel>{sensor.name}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
