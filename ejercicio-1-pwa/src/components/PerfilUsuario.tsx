import { useState } from "react";

function PerfilUsuario({ usuario }: { usuario: any }) {
  const [avatar, setAvatar] = useState(() => {
    return localStorage.getItem("medicare_avatar") || "";
  });

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = event.target.files?.[0];

    if (!archivo) return;

    const reader = new FileReader();

    reader.onload = () => {
      const resultado = reader.result as string;
      setAvatar(resultado);
      localStorage.setItem("medicare_avatar", resultado);
    };

    reader.readAsDataURL(archivo);
  };

  const iniciales = usuario.nombre
    .split(" ")
    .map((palabra: string) => palabra[0])
    .join("")
    .toUpperCase();

  return (
    <div>
      {avatar ? (
        <img src={avatar} alt="Avatar" className="avatar-img" />
      ) : (
        <div className="avatar-iniciales">{iniciales}</div>
      )}
    </div>
  );
}

export default PerfilUsuario;
