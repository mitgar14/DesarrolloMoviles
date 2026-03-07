import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { listOutline, peopleOutline, personOutline } from 'ionicons/icons';

import VisitasPage from '../pages/VisitasPage';
import DetalleVisitaPage from '../pages/DetalleVisitaPage';
import MisPacientesPage from '../pages/MisPacientesPage';
import PerfilMedicoPage from '../pages/PerfilMedicoPage';

function TabsContainer({ usuario, visitas, actualizarVisitas, pendientes, onLogout }: {
  usuario: any;
  visitas: any[];
  actualizarVisitas: (v: any[]) => void;
  pendientes: number;
  onLogout: () => void;
}) {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/visitas">
          <VisitasPage visitas={visitas} actualizarVisitas={actualizarVisitas} />
        </Route>
        <Route exact path="/visitas/:id">
          <DetalleVisitaPage visitas={visitas} actualizarVisitas={actualizarVisitas} />
        </Route>
        <Route exact path="/pacientes">
          <MisPacientesPage />
        </Route>
        <Route exact path="/perfil">
          <PerfilMedicoPage usuario={usuario} onLogout={onLogout} />
        </Route>
        <Route exact path="/">
          <Redirect to="/visitas" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="visitas" href="/visitas">
          <IonIcon icon={listOutline} />
          <IonLabel>Visitas</IonLabel>
          {pendientes > 0 && <IonBadge color="danger">{pendientes}</IonBadge>}
        </IonTabButton>
        <IonTabButton tab="pacientes" href="/pacientes">
          <IonIcon icon={peopleOutline} />
          <IonLabel>Pacientes</IonLabel>
        </IonTabButton>
        <IonTabButton tab="perfil" href="/perfil">
          <IonIcon icon={personOutline} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}

export default TabsContainer;
