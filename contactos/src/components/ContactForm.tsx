import { useState } from 'react';
import { IonButton, IonInput, IonItem, IonList } from '@ionic/react';

interface ContactFormProps {
  onSubmit: (name: string, phone: string) => void;
  initialName?: string;
  initialPhone?: string;
  submitLabel?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  initialName = '',
  initialPhone = '',
  submitLabel = 'Agregar',
}) => {
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);

  const handleSubmit = () => {
    if (!name.trim() || !phone.trim()) return;
    onSubmit(name.trim(), phone.trim());
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
          label="Telefono"
          labelPlacement="stacked"
          type="tel"
          placeholder="Ingresa el telefono"
          value={phone}
          onIonInput={(e) => setPhone(e.detail.value ?? '')}
        />
      </IonItem>
      <IonButton expand="block" onClick={handleSubmit} className="ion-margin">
        {submitLabel}
      </IonButton>
    </IonList>
  );
};

export default ContactForm;
