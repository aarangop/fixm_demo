import { IonButton, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonRow, IonSplitPane, IonText, IonTitle, IonToolbar } from '@ionic/react';
import FixmFlightData from '../components/FixmCode';
import { Controller, useForm } from "react-hook-form"
import { useAppDispatch, useAppSelector } from '../app/hooks';
import './Home.css';
import { setSubmitter, setOriginator, addDesiredWaypoint, ITrajectoryGroup, ITrajectoryPoint4D } from '../features/flightData';
import { RootState } from '../app/store';
import { useState } from 'react';
import WaypointInput from '../components/WaypointInput';

const initFixmText = `<?xml version="1.0" encoding="UTF-8"?>
  <FlightData></FlightData>
`

interface IInputData {
  submitter: string,
  originator: string
}

const Home: React.FC = () => {

  const dispatch = useAppDispatch();

  const desiredRoute = useAppSelector((state: RootState) => 
    state.flightData.routeTrajectoryGroup.desired
  );

  const onParse = (data: IInputData) => {
    dispatch(setOriginator(data.originator));
    dispatch(setSubmitter(data.submitter));
  };

  const onOriginatorChange = (e: any) => {
    dispatch(setOriginator(e.target.value));
  }

  const onSubmitterChange = (e: any) => {
    dispatch(setSubmitter(e.target.value));
  }

  const addNew4DPoint = () => {
    const newWaypoint = {
      altimerterSetting: 1013.25,
      level: 100,
      position: { latitude: 0, longitude: 0},
      predictedAirspeed: 0,
      predictedGroundspeed: 0,
      absoluteTime: new Date().toTimeString(),
    } as ITrajectoryPoint4D;

    dispatch(addDesiredWaypoint({trajectoryIndex: "desired", waypoint: newWaypoint}));
  }

  const { handleSubmit, control } = useForm<IInputData>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>FIXM Demo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonTitle>
                Flight Plan Data
              </IonTitle>
            </IonCol>
            <IonCol>
              <IonTitle>
                FIXM JSON
              </IonTitle>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <form onSubmit={handleSubmit((data) => onParse(data))}>
              <IonList>
              <IonItem>
                <IonLabel position="floating">Flight Plan Originator</IonLabel>
                <IonInput onIonChange={onOriginatorChange}></IonInput>  
              </IonItem>
              <IonItem>
                <IonLabel position="floating"> Flight Plan Submitter</IonLabel>
                <IonInput onIonChange={onSubmitterChange}></IonInput>
              </IonItem>
              <IonItemDivider>Filed Flight Route</IonItemDivider>
              <IonItem>
                <IonGrid>
                  <IonList>
                    {desiredRoute.routeTrajectoryElements.map((elem, i) =>
                      <WaypointInput key={`waypoint_row_${i}`} collection="desired" sequence={i}></WaypointInput>
                    )}
                    </IonList>
                    <IonButton onClick={addNew4DPoint}>Add 4D Point</IonButton>
                </IonGrid>
              </IonItem>
              <IonButton expand="block" type="submit">Parse</IonButton>
              </IonList>
              </form>
            </IonCol>
            <IonCol>
            <FixmFlightData></FixmFlightData>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
