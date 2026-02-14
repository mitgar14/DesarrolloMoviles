import { useState, useEffect } from 'react';
import Loader from './components/Loader';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

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

function App() {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [nextId, setNextId] = useState(4);

  useEffect(() => {
    setTimeout(() => {
      setContacts(initialContacts);
      setLoading(false);
    }, 2000);
  }, []);

  const addContact = (name: string, phone: string) => {
    setContacts((prev) => [...prev, { id: nextId, name, phone }]);
    setNextId((prev) => prev + 1);
  };

  const deleteContact = (id: number) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  if (loading) return <Loader />;

  return (
    <>
      <h1>Contactos</h1>
      <ContactForm onAdd={addContact} />
      <ContactList contacts={contacts} onDelete={deleteContact} />
      <img src="./icon-192x192.png" alt="Ícono de la aplicación" />
    </>
  );
}

export default App;
