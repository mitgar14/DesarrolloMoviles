import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { useAuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import AddContact from "./pages/AddContact";
import EditContact from "./pages/EditContact";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import Fruits from "./pages/Fruits";
import AddFruit from "./pages/AddFruit";
import EditFruit from "./pages/EditFruit";

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

const App: React.FC = () => {
  const { user } = useAuthContext();

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/login">
            {user ? <Redirect to="/home" /> : <Login />}
          </Route>
          <Route exact path="/register">
            {user ? <Redirect to="/home" /> : <Register />}
          </Route>

          <Route exact path="/home">
            {user ? <Home /> : <Redirect to="/login" />}
          </Route>

          <Route exact path="/contacts">
            {user ? <Contacts /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/contacts/add">
            {user ? <AddContact /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/contacts/edit/:id">
            {user ? <EditContact /> : <Redirect to="/login" />}
          </Route>

          <Route exact path="/tasks">
            {user ? <Tasks /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/tasks/add">
            {user ? <AddTask /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/tasks/edit/:id">
            {user ? <EditTask /> : <Redirect to="/login" />}
          </Route>

          <Route exact path="/fruits">
            {user ? <Fruits /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/fruits/add">
            {user ? <AddFruit /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/fruits/edit/:id">
            {user ? <EditFruit /> : <Redirect to="/login" />}
          </Route>

          <Route exact path="/">
            <Redirect to={user ? "/home" : "/login"} />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
