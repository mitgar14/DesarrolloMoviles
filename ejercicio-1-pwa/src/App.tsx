import { useState } from "react";

import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";

import "./App.css";

function App() {
  const [usuario, setUsuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem("medicare_sesion");
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  });

  const login = (usuario: any) => {
    localStorage.setItem("medicare_sesion", JSON.stringify(usuario));
    setUsuario(usuario);
  };

  const logout = () => {
    localStorage.removeItem("medicare_sesion");
    setUsuario(null);
  };

  return (
    <>
      {!usuario ? (
        <LoginForm onLogin={login} />
      ) : (
        <div className="app-container">
          <p>
            <Dashboard usuario={usuario} onLogout={logout} />
          </p>
        </div>
      )}
    </>
  );
}

export default App;
