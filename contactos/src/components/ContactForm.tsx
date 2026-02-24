import { useState } from 'react';
import { IonButton, IonInput, IonItem, IonList } from '@ionic/react';

interface ContactFormProps {
  onAdd: (name: string, phone: string) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = () => {
    if (!name.trim() || !phone.trim()) return;
    onAdd(name.trim(), phone.trim());
    setName('');
    setPhone('');
  };

  return (
    <IonList inset>
      <IonItem>
        <IonInput
          label="Nombre"
          labelPlacement="stacked"
          placeholder="Ingresa el nombre"
          value={name}
          onIonInput={(e) => setName(e.detail.value ?? '')}
        />
      </IonItem>
      <IonItem>
        <IonInput
          label="Teléfono"
          labelPlacement="stacked"
          type="tel"
          placeholder="Ingresa el teléfono"
          value={phone}
          onIonInput={(e) => setPhone(e.detail.value ?? '')}
        />
      </IonItem>
      <IonButton expand="block" onClick={handleSubmit} className="ion-margin">
        Agregar
      </IonButton>
    </IonList>
  );
};

export default ContactForm;
