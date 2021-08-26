import { IonHeader, IonInput, IonItem, IonLabel, IonList, IonText, IonToolbar } from "@ionic/react";
import React from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { IRouteTrajectory, setWaypointAltimeterSetting, setWaypointLevel } from "../features/flightData";


const WaypointInput: React.FC<{collection: string, sequence: number}> = ({children, sequence, collection}) => {

    const dispatch = useAppDispatch();

    const onAltimeterSettingChange = (e: any) => {
        dispatch(setWaypointAltimeterSetting({
            sequence,
            trajectoryCollection: collection,
            value: e.target.value
        }))
    };

    return (<IonList>
        <IonHeader>
            <IonToolbar>
                <IonText>Waypoint {sequence}</IonText>
            </IonToolbar>
        </IonHeader>
        <IonItem>
            <IonLabel position="floating">Altimeter Setting</IonLabel>
            <IonInput onIonChange={onAltimeterSettingChange}></IonInput>
        </IonItem>
        <IonItem>
            <IonLabel position="floating">Flight Level / Altitude</IonLabel>
            <IonInput onIonChange={(e: any) => dispatch(setWaypointLevel({
                sequence,
                trajectoryCollection: collection,
                value: e.target.value
            }))}></IonInput>
        </IonItem>
        <IonItem>
            <IonLabel position="floating">Latitude</IonLabel>
            <IonInput></IonInput>
        </IonItem>
        <IonItem>
            <IonLabel position="floating">Longitude</IonLabel>
            <IonInput></IonInput>
        </IonItem>
        <IonItem>
            <IonLabel position="floating">Predicted Airspeed</IonLabel>
            <IonInput></IonInput>
        </IonItem>
        <IonItem>
            <IonLabel position="floating">Predicted Groud Speed</IonLabel>
            <IonInput></IonInput>
        </IonItem>
        <IonItem>
            <IonLabel position="floating">Absolute Time</IonLabel>
            <IonInput></IonInput>
        </IonItem>
    </IonList>
)};

export default WaypointInput;