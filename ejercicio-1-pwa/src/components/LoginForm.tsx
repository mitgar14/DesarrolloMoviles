import { useState } from "react";

const usuarios = [
  {
    email: "admin@medicare.com",
    password: "admin123",
    nombre: "Ana García",
    rol: "admin",
  },
  {
    email: "recepcion@medicare.com",
    password: "recep123",
    nombre: "Pepita Pérez",
    rol: "recepcionista",
  },
  {
    email: "doctor@medicare.com",
    password: "doc123",
    nombre: "Dr. Martín Ruiz",
    rol: "medico",
  },
];

function LoginForm({ onLogin }: { onLogin: (usuario: any) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const usuarioEncontrado = usuarios.find(
      (usuario) => usuario.email === email && usuario.password === password,
    );

    if (usuarioEncontrado) {
      onLogin(usuarioEncontrado);
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(email) => setEmail(email.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}

export default LoginForm;
