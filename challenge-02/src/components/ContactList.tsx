import ContactItem from './ContactItem';

interface Contact {
  id: number;
  name: string;
  phone: string;
}

function ContactList({ contacts, onDelete }: { contacts: Contact[]; onDelete: (id: number) => void }) {
  return (
    <ul>
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          name={contact.name}
          phone={contact.phone}
          onDelete={() => onDelete(contact.id)}
        />
      ))}
    </ul>
  );
}

export default ContactList;
