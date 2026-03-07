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
import { useHistory, useParams, useLocation } from 'react-router-dom';
import ContactForm from '../components/ContactForm';

interface Contact {
  id: number;
  name: string;
  phone: string;
}

interface EditContactProps {
  onEdit: (id: number, name: string, phone: string) => void;
}

const EditContact: React.FC<EditContactProps> = ({ onEdit }) => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const location = useLocation<{ contact: Contact }>();
  const contact = location.state?.contact;
  const [showToast, setShowToast] = useState(false);

  const handleEdit = (name: string, phone: string) => {
    onEdit(Number(id), name, phone);
    setShowToast(true);
    setTimeout(() => {
      history.push('/home');
    }, 800);
  };

  if (!contact) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle>Editar Contacto</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <div className="ion-padding ion-text-center">
            <p>No se encontro el contacto.</p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Editar Contacto</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ContactForm
          onSubmit={handleEdit}
          initialName={contact.name}
          initialPhone={contact.phone}
          submitLabel="Guardar Cambios"
        />
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Contacto actualizado exitosamente"
          duration={1500}
          position="bottom"
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default EditContact;
