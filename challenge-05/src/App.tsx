import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { useAuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TasksList from "./pages/TasksList";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import TaskDetail from "./pages/TaskDetail";

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
            {user ? <Redirect to="/tasks" /> : <Login />}
          </Route>
          <Route exact path="/register">
            {user ? <Redirect to="/tasks" /> : <Register />}
          </Route>
          <Route exact path="/tasks">
            {user ? <TasksList /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/tasks/add">
            {user ? <AddTask /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/tasks/edit/:id">
            {user ? <EditTask /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/tasks/detail/:id">
            {user ? <TaskDetail /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/">
            <Redirect to={user ? "/tasks" : "/login"} />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
