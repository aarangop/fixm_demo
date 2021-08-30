import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import radarIcon from "./icons/radar.svg"

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

/* Theme variables */
import './theme/variables.css';
import { airplaneOutline } from 'ionicons/icons';
import ASPContent from './components/ASP/ASPContent';
import AUContent from './components/AU/AUContent';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/AU">
              <AUContent/>
            </Route>
            <Route exact path="/ASP">
              <ASPContent onPreviousPhase={() => null} onNextPhase={() => null}/>
            </Route>
            <Redirect exact from="/" to="/AU"/>
          </IonRouterOutlet>
          <IonTabBar slot="bottom" >
            <IonTabButton tab="AU" href="/AU">
              <IonLabel>AU</IonLabel>
              <IonIcon icon={airplaneOutline}></IonIcon>
            </IonTabButton>
            <IonTabButton tab="ASP" href="/ASP">
              <IonLabel>ASP</IonLabel>
              <IonIcon icon={radarIcon}></IonIcon>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
  </IonApp>
);

export default App;
