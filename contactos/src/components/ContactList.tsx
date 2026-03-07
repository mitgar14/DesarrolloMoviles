import { IonList, IonListHeader, IonLabel } from '@ionic/react';
import ContactItem from './ContactItem';

interface Contact {
  id: number;
  name: string;
  phone: string;
}

interface ContactListProps {
  contacts: Contact[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, onEdit, onDelete }) => {
  return (
    <IonList inset>
      <IonListHeader>
        <IonLabel>Lista de contactos</IonLabel>
      </IonListHeader>
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          id={contact.id}
          name={contact.name}
          phone={contact.phone}
          onEdit={onEdit}
          onDelete={() => onDelete(contact.id)}
        />
      ))}
    </IonList>
  );
};

export default ContactList;
