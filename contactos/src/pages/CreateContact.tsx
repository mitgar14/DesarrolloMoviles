import { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonToast,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import ContactForm from '../components/ContactForm';

interface CreateContactProps {
  onAdd: (name: string, phone: string) => void;
}

const CreateContact: React.FC<CreateContactProps> = ({ onAdd }) => {
  const history = useHistory();
  const [showToast, setShowToast] = useState(false);

  const handleCreate = (name: string, phone: string) => {
    onAdd(name, phone);
    setShowToast(true);
    setTimeout(() => {
      history.push('/home');
    }, 800);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Crear Contacto</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ContactForm onSubmit={handleCreate} submitLabel="Crear Contacto" />
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Contacto creado exitosamente"
          duration={1500}
          position="bottom"
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default CreateContact;
