import { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import CreateContact from './pages/CreateContact';
import EditContact from './pages/EditContact';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

interface Contact {
  id: number;
  name: string;
  phone: string;
}

const initialContacts: Contact[] = [
  { id: 1, name: 'Juan Perez', phone: '3001234567' },
  { id: 2, name: 'Maria Garcia', phone: '3109876543' },
  { id: 3, name: 'Carlos Lopez', phone: '3205551234' },
];

const App: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [nextId, setNextId] = useState(4);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setContacts(initialContacts);
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const addContact = (name: string, phone: string) => {
    setContacts((prev) => [...prev, { id: nextId, name, phone }]);
    setNextId((prev) => prev + 1);
  };

  const editContact = (id: number, name: string, phone: string) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name, phone } : c))
    );
  };

  const deleteContact = (id: number) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home
              contacts={contacts}
              loading={loading}
              onDelete={deleteContact}
            />
          </Route>
          <Route
            exact
            path="/create"
            render={() => <CreateContact onAdd={addContact} />}
          />
          <Route
            exact
            path="/edit/:id"
            render={() => <EditContact onEdit={editContact} />}
          />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
