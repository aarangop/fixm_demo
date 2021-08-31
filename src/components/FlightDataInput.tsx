import { IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonItemDivider, IonText, IonToolbar, IonFooter, IonButton, IonContent, IonHeader, IonButtons, IonCard, IonCardHeader, useIonModal } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { useAppSelector } from "../app/hooks";
import store, { RootState } from "../app/store";
import { ISavedTrajectory } from "../features/defaultTrajectories";
import { IFlightData } from "../features/flightData";
import "./FlightDataInput.scss"
import ModifyTrajectoryForm from "./ModifyTrajectoryForm";
import TrajectoryView from "./TrajectoryView";

export interface IFlightDataInputProps {
  gufiEnabled?: boolean,
  originatorEnabled?: boolean,
  operatorEnabled?: boolean,
  departureEnabled?: boolean,
  destinationEnabled?: boolean,
  arrivalEnabled?: boolean,
  departureDateEnabled?: boolean,
  departureTimeEnabled?: boolean,
  arrivalDateEnabled?: boolean,
  arrivalTimeEnabled?: boolean,
  trajectoryVisible?: boolean,
  acceptButtonEnabled?: boolean,
  acceptButtonText?: string,
  rejectButtonEnabled?: boolean,
  rejectButtonText?: string,
  assignGufiButtonEnabled?: boolean,
  desiredTrajectoryEditable?: boolean,
  agreedTrajectoryEditable?: boolean,
  onGufiButtonClicked?: () => void,
  onAccept?: (tempFltData: IFlightData) => void
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
  rejectButtonText: "Reject",
  assignGufiButtonEnabled: false,
  desiredTrajectoryEditable: false,
  agreedTrajectoryEditable: false,
  onGufiButtonClicked: () => null
}

const FlightDataInput: React.FC<IFlightDataInputProps> = (props) => {

  const flightData = useAppSelector(state => state.flightData);
  const [tempFltData, setTempFltData] = useState<IFlightData>({ ...flightData });

  useEffect(() => {
    setTempFltData({...flightData})
  }, [flightData])

  const onDismiss = () => dismiss();

  const getTrajectoryModal = () => {
    return (
    <Provider store={store}>
      <ModifyTrajectoryForm onDismiss={onDismiss} trajectory="desired"/>
    </Provider>)
  };
  
  const [present, dismiss] = useIonModal(getTrajectoryModal());

  const onTrajectoryActionButtonClicked = () => present();

  return (
    <div className="flightDataInputContent">
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="stacked">
                GUFI
              </IonLabel>
              <IonInput 
                value={flightData.gufi}
                placeholder="Not assigned" disabled={!props.gufiEnabled}
                >
              </IonInput>
            </IonItem>
          </IonCol>
          <IonCol>
            {props.assignGufiButtonEnabled ? (
              <IonButton expand="block" onClick={() => { props.onGufiButtonClicked!() }}>
                Assign GUFI
              </IonButton>) : null}
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
                    disabled={!props.originatorEnabled}
                    value={props.originatorEnabled ? tempFltData.originator : flightData.originator}
                  >
                  </IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Operator</IonLabel>
                  <IonInput
                    onIonChange={(e) => setTempFltData({ ...tempFltData, operator: e.detail.value! })}
                    disabled={!props.operatorEnabled}
                    value={props.operatorEnabled? tempFltData.operator : flightData.operator}
                  ></IonInput>
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
                    placeholder="EDVE"
                    value={ props.departureDateEnabled ? tempFltData.departure : flightData.departure}
                  ></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Destination</IonLabel>
                  <IonInput
                    onIonChange={(e) => setTempFltData({ ...tempFltData, destination: e.detail.value! })}
                    disabled={!props.destinationEnabled}
                    value={props.destinationEnabled ? tempFltData.destination : flightData.destination}
                    placeholder="EDVE"
                  ></IonInput>
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
                  <IonInput
                    onIonChange={(e) => setTempFltData({ ...tempFltData, estimatedOffBlockTime: e.detail.value! })}
                    disabled={!props.departureDateEnabled}
                    placeholder="dd.mm.yyyy - HH:mm:ss"
                    value={ props.departureDateEnabled ? tempFltData.estimatedOffBlockTime : flightData.estimatedOffBlockTime}
                  ></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Est. Arrival Date</IonLabel>
                  <IonInput
                    onIonChange={(e) => setTempFltData({ ...tempFltData, estimatedArrivalBlockTime: e.detail.value! })}
                    disabled={!props.arrivalDateEnabled}
                    placeholder="dd.mm.yyyy - HH:mm:ss"
                    value={ props.arrivalDateEnabled ? tempFltData.estimatedArrivalBlockTime : flightData.estimatedArrivalBlockTime}
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            {
              props.trajectoryVisible ? (
                <IonGrid>
                  <IonRow>
                    <IonText><h4>4D Trajectories</h4></IonText>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <TrajectoryView
                        denomination="Desired"
                        trajectory={{
                          label: flightData.routeTrajectoryGroup.desired.label!,
                          waypoints: flightData.routeTrajectoryGroup.desired.routeTrajectoryElements,
                          edited: false
                        }}
                        actionButtonText="Change"
                        actionButtonEnabled={props.desiredTrajectoryEditable}
                        onActionButtonClicked={onTrajectoryActionButtonClicked}
                        />
                    </IonCol>
                    <IonCol>
                      <TrajectoryView
                        denomination="Agreed"
                        actionButtonEnabled={props.agreedTrajectoryEditable}
                        trajectory={{
                          label: flightData.routeTrajectoryGroup.agreed.label!,
                          waypoints: flightData.routeTrajectoryGroup.agreed.routeTrajectoryElements,
                          edited: false
                        }}
                      />
                    </IonCol>
                  </IonRow>
                </IonGrid>
              ) : null
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