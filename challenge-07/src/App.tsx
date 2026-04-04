import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import Home from "./pages/Home";
import GeoPage from "./pages/GeoPage";
import CameraPage from "./pages/CameraPage";
import AccelPage from "./pages/AccelPage";
import DevicePage from "./pages/DevicePage";
import HapticsPage from "./pages/HapticsPage";
import FilesystemPage from "./pages/FilesystemPage";

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

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home" component={Home} />
        <Route exact path="/geo" component={GeoPage} />
        <Route exact path="/camera" component={CameraPage} />
        <Route exact path="/accel" component={AccelPage} />
        <Route exact path="/device" component={DevicePage} />
        <Route exact path="/haptics" component={HapticsPage} />
        <Route exact path="/filesystem" component={FilesystemPage} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
