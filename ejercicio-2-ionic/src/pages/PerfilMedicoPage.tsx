import { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonAvatar,
  IonImg,
  IonButton,
  IonItem,
  IonLabel,
} from "@ionic/react";
import "./PerfilMedicoPage.css";

function PerfilMedicoPage({
  usuario,
  onLogout,
}: {
  usuario: any;
  onLogout: () => void;
}) {
  const [avatar, setAvatar] = useState(() => {
    return localStorage.getItem("medicare_avatar_medico") || "";
  });

  const handleImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];
    if (!archivo) return;
    const reader = new FileReader();
    reader.onload = () => {
      const resultado = reader.result as string;
      setAvatar(resultado);
      localStorage.setItem("medicare_avatar_medico", resultado);
    };
    reader.readAsDataURL(archivo);
  };

  const iniciales = usuario.nombre
    .split(" ")
    .map((p: string) => p[0])
    .join("")
    .toUpperCase();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mi Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-text-center">
        <IonAvatar className="perfil-avatar">
          {avatar ? (
            <IonImg src={avatar} alt="Avatar" />
          ) : (
            <div className="perfil-iniciales">{iniciales}</div>
          )}
        </IonAvatar>

        <input type="file" accept="image/*" onChange={handleImagen} />

        <IonItem>
          <IonLabel>
            <h2>{usuario.nombre}</h2>
            <p>{usuario.email}</p>
            <p>Rol: {usuario.rol}</p>
          </IonLabel>
        </IonItem>

        <IonButton
          expand="block"
          color="danger"
          onClick={onLogout}
          className="ion-margin-top"
        >
          Cerrar sesión
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default PerfilMedicoPage;
