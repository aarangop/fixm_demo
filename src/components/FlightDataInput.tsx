import { IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonItemDivider, IonText, IonToolbar, IonFooter, IonButton, IonContent, IonHeader, IonButtons, IonCard, IonCardHeader } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { IFlightData } from "../features/flightData";
import "./FlightDataInput.scss"
import TrajectoryCard from "./TrajectoryCard";
import TrajectoryView from "./TrajectoryView";

export interface IFlightDataInputProps {
  gufiEnabled?: boolean,
  originatorEnabled?: boolean,
  operatorEnabled?: boolean,
  departureEnabled?: boolean,
  destinationEnabled?: boolean,
  arrivalEnabled?: boolean,
  trajectoryVisible?: boolean,
  acceptButtonEnabled?: boolean,
  acceptButtonText?: string,
  rejectButtonEnabled?: boolean,
  rejectButtonText?: string,
  onAccept?: (tempFltData: IFlightData) => void;
  onReject?: () => void;
}

const defaultProps: IFlightDataInputProps = {
  gufiEnabled: false,
  originatorEnabled: true,
  operatorEnabled: true,
  departureEnabled: true,
  destinationEnabled: true,
  arrivalEnabled: true,
  trajectoryVisible: false,
  acceptButtonEnabled: true,
  acceptButtonText: "Accept",
  rejectButtonEnabled: true,
  rejectButtonText: "Reject"
}

const FlightDataInput: React.FC<IFlightDataInputProps> = (props) => {

  const flightData = useAppSelector(state => state.flightData);

  const [tempFltData, setTempFltData] = useState<IFlightData>({ ...flightData });

  return (
    <div className="flightDataInputContent">
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="stacked">
                GUFI
              </IonLabel>
              <IonInput placeholder="Not assigned" disabled={!props.gufiEnabled}>
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
                  <IonInput
                    onIonChange={(e) => setTempFltData({ ...tempFltData, originator: e.detail.value! })}
                    disabled={!props.originatorEnabled}>
                  </IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Operator</IonLabel>
                  <IonInput 
                    onIonChange={(e) => setTempFltData({ ...tempFltData, operator: e.detail.value! })}
                    disabled={!props.operatorEnabled}>{flightData.operator}</IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Departure</IonLabel>
                  <IonInput 
                  onIonChange={(e) => setTempFltData({ ...tempFltData, departure: e.detail.value! })}
                  disabled={!props.departureEnabled}
                    placeholder="EDVE">{flightData.departure}</IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Destination</IonLabel>
                  <IonInput 
                  onIonChange={(e) => setTempFltData({ ...tempFltData, destination: e.detail.value! })}
                  disabled={!props.destinationEnabled}
                    placeholder="EDVE">{flightData.destination}</IonInput>
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
            {
              !props.trajectoryVisible ? null : (
                <IonGrid>
                  <IonRow>
                    <IonText><h4>4D Trajectories</h4></IonText>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      {/* <TrajectoryView trajectory={}></TrajectoryView> */}
                    </IonCol>
                    <IonCol>
                      {/* <TrajectoryCard trajectoryProps={{ trajectory: "agreed" }} /> */}
                    </IonCol>
                    <IonCol>
                      {/* <TrajectoryCard trajectoryProps={{ trajectory: "negotiating" }} /> */}
                    </IonCol>
                    <IonCol>
                      {/* <TrajectoryCard trajectoryProps={{ trajectory: "ranked" }} /> */}
                    </IonCol>
                  </IonRow>
                </IonGrid>
              )
            }
            {!props.trajectoryVisible ? null : <IonItemDivider />}
          </IonGrid>
        </IonRow>
        <IonRow>
          <IonToolbar className="flightDataActionButtons">
            {
              props.acceptButtonEnabled ? (
                <IonButtons slot="start">
                  <IonButton
                    onClick={props.onAccept ? () => props.onAccept!(tempFltData) : () => null}
                    color="primary" expand="block">
                    {props.acceptButtonText}
                  </IonButton>
                </IonButtons>) : null
            }
            {props.rejectButtonEnabled ? (
              <IonButtons slot="end">
                <IonButton onClick={props.onReject ? props.onReject : () => null}
                  color="danger" expand="block">{props.rejectButtonText}</IonButton>
              </IonButtons>
            ) : null}
          </IonToolbar>
        </IonRow>
      </IonGrid>
    </div>
  );
}

FlightDataInput.defaultProps = defaultProps;

export default FlightDataInput;