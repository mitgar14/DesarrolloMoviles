import { IonItem, IonLabel, IonButton, IonIcon } from '@ionic/react';
import { trashOutline, createOutline } from 'ionicons/icons';

interface ContactItemProps {
  id: number;
  name: string;
  phone: string;
  onEdit: (id: number) => void;
  onDelete: () => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ id, name, phone, onEdit, onDelete }) => {
  return (
    <IonItem>
      <IonLabel>
        <h2>{name}</h2>
        <p>{phone}</p>
      </IonLabel>
      <IonButton fill="clear" color="primary" slot="end" onClick={() => onEdit(id)}>
        <IonIcon slot="icon-only" icon={createOutline} />
      </IonButton>
      <IonButton fill="clear" color="danger" slot="end" onClick={onDelete}>
        <IonIcon slot="icon-only" icon={trashOutline} />
      </IonButton>
    </IonItem>
  );
};

export default ContactItem;
