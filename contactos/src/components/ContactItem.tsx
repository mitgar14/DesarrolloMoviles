import { IonItem, IonLabel, IonButton, IonIcon } from '@ionic/react';
import { trashOutline } from 'ionicons/icons';

interface ContactItemProps {
  name: string;
  phone: string;
  onDelete: () => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ name, phone, onDelete }) => {
  return (
    <IonItem>
      <IonLabel>
        <h2>{name}</h2>
        <p>{phone}</p>
      </IonLabel>
      <IonButton fill="clear" color="danger" slot="end" onClick={onDelete}>
        <IonIcon slot="icon-only" icon={trashOutline} />
      </IonButton>
    </IonItem>
  );
};

export default ContactItem;
