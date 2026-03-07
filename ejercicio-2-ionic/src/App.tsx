import { useState } from "react";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import TabsContainer from "./components/TabsContainer";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/palettes/dark.system.css";
import "./theme/variables.css";

setupIonicReact();

const visitas_iniciales = [
  {
    id: "1",
    pacienteNombre: "Carlos Gómez",
    direccion: "Calle 5 #23-10",
    hora: "08:00",
    estado: "pendiente" as const,
  },
  {
    id: "2",
    pacienteNombre: "María López",
    direccion: "Av. 3N #45-12",
    hora: "09:30",
    estado: "pendiente" as const,
  },
  {
    id: "3",
    pacienteNombre: "Pedro Ramírez",
    direccion: "Cra 100 #15-50",
    hora: "11:00",
    estado: "en_curso" as const,
  },
  {
    id: "4",
    pacienteNombre: "Ana Torres",
    direccion: "Calle 13 #8-22",
    hora: "14:00",
    estado: "pendiente" as const,
  },
  {
    id: "5",
    pacienteNombre: "Luis Herrera",
    direccion: "Av. 6N #32-18",
    hora: "16:00",
    estado: "finalizada" as const,
  },
];

const App: React.FC = () => {
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem("medicare_sesion_medico");
    return guardado ? JSON.parse(guardado) : null;
  });

  const [visitas, setVisitas] = useState(() => {
    const guardadas = localStorage.getItem("medicare_visitas");
    return guardadas ? JSON.parse(guardadas) : visitas_iniciales;
  });

  const login = (usr: any) => {
    localStorage.setItem("medicare_sesion_medico", JSON.stringify(usr));
    setUsuario(usr);
  };

  const logout = () => {
    localStorage.removeItem("medicare_sesion_medico");
    setUsuario(null);
  };

  const actualizarVisitas = (nuevas: any[]) => {
    setVisitas(nuevas);
    localStorage.setItem("medicare_visitas", JSON.stringify(nuevas));
  };

  const pendientes = visitas.filter(
    (v: any) => v.estado === "pendiente",
  ).length;

  const tabsProps = {
    usuario,
    visitas,
    actualizarVisitas,
    pendientes,
    onLogout: logout,
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/login">
            {!usuario ? (
              <LoginPage onLogin={login} />
            ) : (
              <Redirect to="/visitas" />
            )}
          </Route>
          <Route path="/visitas">
            {usuario ? (
              <TabsContainer {...tabsProps} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/pacientes">
            {usuario ? (
              <TabsContainer {...tabsProps} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/perfil">
            {usuario ? (
              <TabsContainer {...tabsProps} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route exact path="/">
            <Redirect to={usuario ? "/visitas" : "/login"} />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
