import { IonCol, IonContent, IonFab, IonFabButton, IonFooter, IonGrid, IonHeader, IonIcon, IonMenu, IonPage, IonRow, IonSplitPane, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { useAppSelector } from "../app/hooks";
import { previousPlanningPhase, selectFlightPhase, selectPlanningPhase } from "../features/flightplanProcess";
import { arrowBack, arrowForward } from "ionicons/icons";
import "./BasePage.scss";
import FixmFlightData from "../components/FixmCode";

const BasePage2: React.FC<{ onNextPhase: Function, onPreviousPhase: Function }> = ({ children, onNextPhase, onPreviousPhase }) => {


  const flightPhase = useAppSelector(state => selectFlightPhase(state));
  const planningPhase = useAppSelector(state => selectPlanningPhase(state));

  return (
    <IonContent scrollY={true}>
      <IonFab horizontal="start" vertical="bottom">
        <IonFabButton onClick={() => onPreviousPhase()}>
          <IonIcon icon={arrowBack}></IonIcon>
        </IonFabButton>
      </IonFab>
      <IonFab horizontal="end" vertical="bottom">
        <IonFabButton onClick={() => onNextPhase()}>
          <IonIcon icon={arrowForward}></IonIcon>
        </IonFabButton>
      </IonFab>
      <IonSplitPane>
        {/*--  the side menu  --*/}
        <IonMenu side="end">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <FixmFlightData></FixmFlightData>
          </IonContent>
        </IonMenu>
        {/*-- the main content --*/}
        <IonPage >
          <IonHeader>
            <IonToolbar>
              <IonTitle color="secondary">
                {planningPhase} - {flightPhase}
              </IonTitle>
            </IonToolbar>
          </IonHeader>
          {children ? children : null}
        </IonPage>
      </IonSplitPane>
    </IonContent>
  );
};

export default BasePage2;