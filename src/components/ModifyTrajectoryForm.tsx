import { IonButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonFooter, IonGrid, IonHeader, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { useEffect, useState } from "react";
import { addOutline, saveOutline } from "ionicons/icons";
import { addNew4DWaypoint, ITrajectoryPoint4D } from "../features/flightData";
import "./ModifyTrajectoryForm.scss"
import { getNewWaypoint } from "../features/flightData";
import TrajectoryView from "./TrajectoryView";
import { ISavedTrajectory } from "../features/defaultTrajectories";

const initialState = [] as Array<ITrajectoryPoint4D>;

const ModifyTrajectoryForm: React.FC<{ trajectory: string }> = ({ trajectory }) => {

  const tr = useAppSelector((state: RootState) => {
    if (trajectory in state.flightData.routeTrajectoryGroup) {
      return state.flightData.routeTrajectoryGroup[
        trajectory as keyof typeof state.flightData.routeTrajectoryGroup
      ];
    }
  });

  const dispatch = useAppDispatch();

  const availableTrajectories = useAppSelector(
    (state: RootState) => state.defaultTrajectories
  );

  const onTrajectorySelected = (trajectory: ISavedTrajectory) => {
    
  }

  const [trajectoryElements, setTrajectoryElements] = useState<Array<ITrajectoryPoint4D>>(initialState);
  const [savedTrajectories] = useState<typeof availableTrajectories>(availableTrajectories);

  return (
    <div className="contentContainer">
      <IonGrid>
        <IonRow>
          <IonCol>
            <TrajectoryView
              denomination="Selected Trajectory"
              selectable={false}
              trajectory={savedTrajectories.selected_trajectory} />
          </IonCol>
        </IonRow>
        <IonRow>
          {savedTrajectories.alternative_trajectories.map((t, i) =>
            <IonCol>
              <TrajectoryView key={`trajectory_${i}`}
                selectable={true} 
                trajectory={t}
                denomination="Alternative Trajectory"
                mapHeight={100}
              />
            </IonCol>
          )}
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default ModifyTrajectoryForm;