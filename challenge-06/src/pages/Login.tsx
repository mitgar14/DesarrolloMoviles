import { useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonInput, IonItem, IonList, IonButton, IonToast,
} from "@ionic/react";
import { useAuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuthContext();
  const history = useHistory();

  const handleLogin = async () => {
    try {
      await login(email, password);
      history.push("/home");
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <IonList inset>
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
                label="Password"
                labelPlacement="stacked"
                type="password"
                value={password}
                onIonInput={(e) => setPassword(e.detail.value ?? "")}
              />
            </IonItem>
            <IonButton expand="block" type="submit" className="ion-margin">
              Iniciar sesion
            </IonButton>
          </IonList>
        </form>

        <div className="ion-text-center ion-padding">
          <IonButton fill="clear" routerLink="/register">
            Crear cuenta
          </IonButton>
        </div>

        <IonToast
          isOpen={!!error}
          onDidDismiss={() => setError("")}
          message={error}
          duration={3000}
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
