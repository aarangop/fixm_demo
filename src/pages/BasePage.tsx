import { IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonText, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import { arrowBack, arrowForward } from "ionicons/icons";
import { useAppSelector } from "../app/hooks";
import { selectFlightPhase, selectPlanningPhase } from "../features/flightplanProcess";
import FixmFlightData from "../components/FixmCode";
import "./BasePage.scss"

const BasePage: React.FC<{ onNextPhase: Function, onPreviousPhase: Function }> = ({ children, onNextPhase, onPreviousPhase }) => {

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
            <IonCol size="1">
              <IonFab horizontal="start" vertical="center">
                <IonFabButton onClick={() => onPreviousPhase()}>
                  <IonIcon icon={arrowBack}></IonIcon>
                </IonFabButton>
              </IonFab>
            </IonCol>
            <IonCol size="10">
              <IonGrid>
                <IonRow>
                  <IonCol size="7">
                    <IonText>Flight Plan Data</IonText>
                  </IonCol>
                  <IonCol size="2">
                    <IonText>FIXM JSON</IonText>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="7">
                    {children ? children : null}
                  </IonCol>
                  <IonCol>
                    <FixmFlightData />
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCol>
            <IonCol size="1">
              <IonFab horizontal="end" vertical="center">
                <IonFabButton onClick={() => onNextPhase()}>
                  <IonIcon icon={arrowForward}></IonIcon>
                </IonFabButton>
              </IonFab>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default BasePage;