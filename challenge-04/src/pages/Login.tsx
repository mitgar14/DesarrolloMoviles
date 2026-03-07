import { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonList,
  IonButton,
  IonToast,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleLogin = () => {
    if (email === 'user@movilapp.com' && password === '123') {
      localStorage.setItem('token', 'abc123');
      history.push('/home');
    } else {
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList inset>
          <IonItem>
            <IonInput
              label="Email"
              labelPlacement="stacked"
              type="email"
              placeholder="Ingresa tu email"
              value={email}
              onIonInput={(e) => setEmail(e.detail.value ?? '')}
            />
          </IonItem>
          <IonItem>
            <IonInput
              label="Password"
              labelPlacement="stacked"
              type="password"
              placeholder="Ingresa tu password"
              value={password}
              onIonInput={(e) => setPassword(e.detail.value ?? '')}
            />
          </IonItem>
          <IonButton expand="block" onClick={handleLogin} className="ion-margin">
            Login
          </IonButton>
        </IonList>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Email o password incorrectos"
          duration={2000}
          position="bottom"
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
