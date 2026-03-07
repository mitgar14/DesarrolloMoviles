import { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonToast,
  IonLoading,
  IonIcon,
  IonList,
} from "@ionic/react";
import { eyeOutline, eyeOffOutline } from "ionicons/icons";

const usuarios = [
  {
    email: "admin@medicare.com",
    password: "admin123",
    nombre: "Ana García",
    rol: "admin",
  },
  {
    email: "recepcion@medicare.com",
    password: "recep123",
    nombre: "Pepita Pérez",
    rol: "recepcionista",
  },
  {
    email: "doctor@medicare.com",
    password: "doc123",
    nombre: "Dr. Martín Ruiz",
    rol: "medico",
  },
];

function LoginPage({ onLogin }: { onLogin: (usuario: any) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const handleLogin = () => {
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
      const encontrado = usuarios.find(
        (u) => u.email === email && u.password === password,
      );
      if (encontrado) {
        onLogin(encontrado);
      } else {
        setShowToast(true);
      }
    }, 1500);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>MediCare+ Visitas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonInput
              label="Email"
              labelPlacement="stacked"
              type="email"
              value={email}
              onIonInput={(e) => setEmail(e.detail.value ?? "")}
            />
          </IonItem>
          <IonItem>
            <IonInput
              label="Contraseña"
              labelPlacement="stacked"
              type={mostrarPassword ? "text" : "password"}
              value={password}
              onIonInput={(e) => setPassword(e.detail.value ?? "")}
            />
            <IonButton
              fill="clear"
              slot="end"
              onClick={() => setMostrarPassword(!mostrarPassword)}
            >
              <IonIcon icon={mostrarPassword ? eyeOffOutline : eyeOutline} />
            </IonButton>
          </IonItem>
        </IonList>

        <IonButton
          expand="block"
          onClick={handleLogin}
          className="ion-margin-top"
        >
          Iniciar sesión
        </IonButton>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Usuario o contraseña incorrectos"
          duration={2000}
          color="danger"
          position="top"
        />

        <IonLoading
          isOpen={showLoading}
          message="Verificando credenciales..."
        />
      </IonContent>
    </IonPage>
  );
}

export default LoginPage;
