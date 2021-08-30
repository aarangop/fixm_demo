import { IonCol, IonContent, IonFab, IonFabButton, IonFooter, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { useAppSelector } from "../app/hooks";
import { selectFlightPhase, selectPlanningPhase } from "../features/flightplanProcess";
import { arrowBack, arrowForward } from "ionicons/icons";
import "./BasePage.scss";
import FixmFlightData from "../components/FixmCode";

const BasePage2: React.FC<{ onNextPhase: Function, onPreviousPhase: Function }> = ({ children, onNextPhase, onPreviousPhase }) => {


  const flightPhase = useAppSelector(state => selectFlightPhase(state));
  const planningPhase = useAppSelector(state => selectPlanningPhase(state));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>FIXM Demo</IonTitle>
          <IonTitle color="secondary">
            {planningPhase} - {flightPhase}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="7">
              <IonText>Flight Plan Data</IonText>
            </IonCol>
            <IonCol>
              <IonText>FIXM JSON</IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              {children ? children : null}
            </IonCol>
            <IonCol>
              <FixmFlightData></FixmFlightData>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
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
    </IonPage>
  );
};

export default BasePage2;