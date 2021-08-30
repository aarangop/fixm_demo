import { IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonItemDivider, IonText, IonToolbar, IonFooter, IonButton, IonContent, IonHeader, IonButtons, IonCard, IonCardHeader } from "@ionic/react";
import React from "react";
import { useAppSelector } from "../app/hooks";
import "./FlightDataInput.scss"
import TrajectoryCard from "./TrajectoryCard";

interface IFlightDataInputProps {
  originatorEnabled?: boolean,
  operatorEnabled?: boolean
}

const FlightDataInput: React.FC<{ formProps?: IFlightDataInputProps }> = ({ formProps }) => {

  const flightData = useAppSelector(state => state.flightData);

  return (
    // <IonContent fullscreen={false} className="flightDataContent">
    <div className="flightDataInputContent">
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="stacked">
                GUFI
              </IonLabel>
              <IonInput disabled={true}>
                {"Not assigned"}
              </IonInput>
            </IonItem>
          </IonCol>
          <IonItemDivider />
        </IonRow>
        <IonRow >
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">
                    Originator
                  </IonLabel>
                  <IonInput disabled={formProps?.originatorEnabled}>
                    {flightData.originator}
                  </IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Operator</IonLabel>
                  <IonInput disabled={formProps?.operatorEnabled}>{flightData.operator}</IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Departure</IonLabel>
                  <IonInput placeholder="EDVE">{flightData.departure}</IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Destination</IonLabel>
                  <IonInput placeholder="EDVE">{flightData.destination}</IonInput>
                </IonItem>
              </IonCol>
              <IonItemDivider />
            </IonRow>
            <IonRow>
              <IonText><h4>Date & Time</h4></IonText>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Est. Departure Date</IonLabel>
                  <IonInput placeholder="dd.mm.yyyy"></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Est. Arrival Date</IonLabel>
                  <IonInput placeholder="dd.mm.yyyy"></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Est. Departure Block Time (UTC)</IonLabel>
                  <IonInput placeholder="HH:mm"></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Est. Arrival Block Time (UTC)</IonLabel>
                  <IonInput placeholder="HH:mm"></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonItemDivider />
            <IonRow>
              <IonText><h4>4D Trajectories</h4></IonText>
            </IonRow>
            <IonRow>
              <IonCol>
                <TrajectoryCard trajectoryProps={{trajectory: "desired"}}/>
              </IonCol>
              <IonCol>
                <TrajectoryCard trajectoryProps={{trajectory: "agreed"}}/>
              </IonCol>
              <IonCol>
                <TrajectoryCard trajectoryProps={{trajectory: "negotiating"}}/>
              </IonCol>
              <IonCol>
                <TrajectoryCard trajectoryProps={{trajectory: "ranked"}}/>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonRow>
        <IonRow>
          <IonToolbar className="flightDataActionButtons">
            <IonButtons slot="start">
              <IonButton color="primary" expand="block">Accept/Submit</IonButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton color="danger" expand="block">Reject</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonRow>
      </IonGrid>
      </div>
    // </IonContent>
  );
}

export default FlightDataInput;