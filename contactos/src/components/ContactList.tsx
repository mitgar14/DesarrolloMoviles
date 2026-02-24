import { IonList, IonListHeader, IonLabel } from '@ionic/react';
import ContactItem from './ContactItem';

interface Contact {
  id: number;
  name: string;
  phone: string;
}

interface ContactListProps {
  contacts: Contact[];
  onDelete: (id: number) => void;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, onDelete }) => {
  return (
    <IonList inset>
      <IonListHeader>
        <IonLabel>Lista de contactos</IonLabel>
      </IonListHeader>
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          name={contact.name}
          phone={contact.phone}
          onDelete={() => onDelete(contact.id)}
        />
      ))}
    </IonList>
  );
};

export default ContactList;
