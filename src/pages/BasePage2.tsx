import { IonButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonFooter, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { useAppSelector } from "../app/hooks";
import { planningPhases, selectFlightPhase, selectPlanningPhase } from "../features/flightplanProcess";
import { arrowBack, arrowForward } from "ionicons/icons";
import "./BasePage.scss";
import FixmFlightData from "../components/FixmCode";
import { RootState } from "../app/store";
import { useState } from "react";

const BasePage2: React.FC<{ onNextPhase: Function, onPreviousPhase: Function }> = ({ children, onNextPhase, onPreviousPhase }) => {


  const flightPhase = useAppSelector(state => selectFlightPhase(state));
  const planningPhase = useAppSelector(state => selectPlanningPhase(state));
  const trajectories = useAppSelector((state: RootState) => state.flightData.routeTrajectoryGroup);

  const [isFixmDataVisible, setIsFixmVisible] = useState<boolean>(true);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>FIXM Demo</IonTitle>
          <IonTitle color="secondary">
            {planningPhase} - {flightPhase}
          </IonTitle>
          <IonButtons slot="primary">
            <IonButton onClick={() => onPreviousPhase()}>
              <IonIcon icon={arrowBack}/>
              Previous Phase
            </IonButton>
            <IonButton onClick={() => onNextPhase()}>
              Next Phase
              <IonIcon icon={arrowForward}/>
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsFixmVisible(!isFixmDataVisible)} color="primary">
              Toggle FIXM visibility
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonText><h1>Flight Plan Data</h1></IonText>
            </IonCol>
            {
              isFixmDataVisible ?
                <IonCol size="4">
                  <IonText><h1>FIXM JSON</h1></IonText>
                </IonCol> : null
            }
          </IonRow>
          <IonRow>
            <IonCol>
              {children ? children : null}
            </IonCol>
            {isFixmDataVisible ?
              <IonCol size="4">
                <FixmFlightData></FixmFlightData>
              </IonCol> : null
            }
          </IonRow>
          <IonRow>
            
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default BasePage2;