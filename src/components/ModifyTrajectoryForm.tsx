import { IonButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonFooter, IonHeader, IonIcon, IonItem, IonList, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { useEffect, useState } from "react";
import { addOutline, saveOutline } from "ionicons/icons";
import { addNew4DWaypoint, ITrajectoryPoint4D } from "../features/flightData";
import "./ModifyTrajectoryForm.scss"
import Trajectory4DPoint from "./Trajectory4DPoint";
import { getNewWaypoint } from "../features/flightData";

const initialState = [] as Array<ITrajectoryPoint4D>;

const ModifyTrajectoryForm: React.FC<{ trajectory: string }> = ({ trajectory }) => {

  const tr = useAppSelector((state: RootState) => {
    if (trajectory in state.flightData.routeTrajectoryGroup) {
      return state.flightData.routeTrajectoryGroup[trajectory as keyof typeof state.flightData.routeTrajectoryGroup];
    }
  });

  const dispatch = useAppDispatch();

  const onAddNew4DWayoint = () => {
    const newWaypoint = getNewWaypoint();
    setTrajectoryElements([...trajectoryElements, newWaypoint]);
    dispatch(addNew4DWaypoint(trajectory));
  }

  const [trajectoryElements, setTrajectoryElements] = useState<Array<ITrajectoryPoint4D>>(initialState);

  useEffect(() => {
    console.log(`Loading trajectory ${trajectory} from store`);
    if (tr?.routeTrajectoryElements)
      setTrajectoryElements([...tr?.routeTrajectoryElements]);
  }, []);

  return (
    <div className="contentContainer">
      <IonList>
        {trajectoryElements?.map((e, i) => {
          return (
            <Trajectory4DPoint key={`waypoint_${i}`} trajectoryElement={e} />
          );
        })}
      </IonList>
      <IonFab vertical="bottom" horizontal="end">
        <IonRow>
          <IonCol>
            <IonFabButton>
              <IonIcon icon={saveOutline} />
            </IonFabButton>
          </IonCol>
          <IonCol>
            <IonFabButton onClick={onAddNew4DWayoint}>
              <IonIcon icon={addOutline} />
            </IonFabButton>
          </IonCol>
        </IonRow>
      </IonFab>
    </div>
  );
};

export default ModifyTrajectoryForm;