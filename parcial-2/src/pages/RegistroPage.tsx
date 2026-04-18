import { useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const RegistroPage: React.FC = () => {
  const history = useHistory();
  const { register } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmacion, setConfirmacion] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegistro = async () => {
    setError("");

    if (!email || !password || !confirmacion) {
      setError("Completa todos los campos");
      return;
    }

    if (password !== confirmacion) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener mínimo 6 caracteres");
      return;
    }

    setLoading(true);
    try {
      await register(email.trim(), password);
      history.replace("/home");
    } catch {
      setError("No se pudo registrar el usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Correo</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonInput={(e) => setEmail((e.detail.value ?? "").toString())}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Contraseña</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonInput={(e) => setPassword((e.detail.value ?? "").toString())}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Confirmar contraseña</IonLabel>
          <IonInput
            type="password"
            value={confirmacion}
            onIonInput={(e) =>
              setConfirmacion((e.detail.value ?? "").toString())
            }
          />
        </IonItem>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonButton
          expand="block"
          className="ion-margin-top"
          onClick={handleRegistro}
          disabled={loading}
        >
          {loading ? "Registrando..." : "Registrarme"}
        </IonButton>

        <IonButton
          expand="block"
          fill="clear"
          onClick={() => history.replace("/login")}
        >
          Ya tengo cuenta
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default RegistroPage;
