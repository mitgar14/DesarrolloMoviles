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

const LoginPage: React.FC = () => {
  const history = useHistory();
  const { login } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await login(email.trim(), password);
      history.replace("/home");
    } catch {
      setError("Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Iniciar sesión</IonTitle>
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

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonButton
          expand="block"
          className="ion-margin-top"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </IonButton>

        <IonButton
          expand="block"
          fill="clear"
          onClick={() => history.push("/registro")}
        >
          Crear cuenta
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
