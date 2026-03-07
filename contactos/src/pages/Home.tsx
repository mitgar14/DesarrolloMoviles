import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLoading,
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import ContactList from '../components/ContactList';

interface Contact {
  id: number;
  name: string;
  phone: string;
}

interface HomeProps {
  contacts: Contact[];
  loading: boolean;
  onDelete: (id: number) => void;
}

const Home: React.FC<HomeProps> = ({ contacts, loading, onDelete }) => {
  const history = useHistory();

  const handleEdit = (id: number) => {
    const contact = contacts.find((c) => c.id === id);
    if (contact) {
      history.push(`/edit/${id}`, { contact });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Contactos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Contactos</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonLoading isOpen={loading} message="Cargando contactos..." />

        <ContactList contacts={contacts} onEdit={handleEdit} onDelete={onDelete} />

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/create" routerDirection="forward">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
