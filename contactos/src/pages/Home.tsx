import { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLoading,
} from '@ionic/react';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';

interface Contact {
  id: number;
  name: string;
  phone: string;
}

const initialContacts: Contact[] = [
  { id: 1, name: 'Juan Pérez', phone: '3001234567' },
  { id: 2, name: 'María García', phone: '3109876543' },
  { id: 3, name: 'Carlos López', phone: '3205551234' },
];

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [nextId, setNextId] = useState(4);

  useEffect(() => {
    const timer = setTimeout(() => {
      setContacts(initialContacts);
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const addContact = (name: string, phone: string) => {
    setContacts((prev) => [...prev, { id: nextId, name, phone }]);
    setNextId((prev) => prev + 1);
  };

  const deleteContact = (id: number) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
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

        <ContactForm onAdd={addContact} />
        <ContactList contacts={contacts} onDelete={deleteContact} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
