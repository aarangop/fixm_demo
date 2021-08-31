import { IonButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonFooter, IonGrid, IonHeader, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { useEffect, useState } from "react";
import "./ModifyTrajectoryForm.scss"
import TrajectoryView from "./TrajectoryView";
import { ISavedTrajectories, ISavedTrajectory, setSelectedTrajectory } from "../features/defaultTrajectories";
import { saveOutline } from "ionicons/icons";
import { setDesiredTrajectory } from "../features/flightData";

const ModifyTrajectoryForm: React.FC<{ trajectory: string, onDismiss?: () => void }> = (props) => {

  const tr = useAppSelector((state: RootState) => {
    if (props.trajectory in state.flightData.routeTrajectoryGroup) {
      return state.flightData.routeTrajectoryGroup[
        props.trajectory as keyof typeof state.flightData.routeTrajectoryGroup
      ];
    }
  });

  const dispatch = useAppDispatch();

  const availableTrajectories = useAppSelector(
    (state: RootState) => state.defaultTrajectories
  );

  const onTrajectorySelected = (trajectory: ISavedTrajectory) => {
    setTempSavedTrajectories({ ...tempSavedTrajectories, selected_trajectory: trajectory });
  }

  const onSave = () => {
    dispatch(setDesiredTrajectory({
      label: tempSavedTrajectories.selected_trajectory.label,
      routeTrajectoryElements: tempSavedTrajectories.selected_trajectory.waypoints
    }));
    dispatch(setSelectedTrajectory(tempSavedTrajectories.selected_trajectory));
    props.onDismiss!();
  }

  const [savedTrajectories] = useState<typeof availableTrajectories>(availableTrajectories);
  const [tempSavedTrajectories, setTempSavedTrajectories] = useState<ISavedTrajectories>(savedTrajectories);

  return (
    <div className="contentContainer">
      <IonGrid>
        <IonRow>
          <IonCol>
            <TrajectoryView
              denomination="Selected Trajectory"
              actionButtonEnabled={false}
              trajectory={tempSavedTrajectories.selected_trajectory}
              highlight={true}
            />
          </IonCol>
        </IonRow>
        {/* <IonRow> */}
        {savedTrajectories.alternative_trajectories.map((t, i) =>
          <IonCol key={`trajectory_${i}`}>
            <TrajectoryView
              actionButtonEnabled={true}
              trajectory={t}
              denomination={`Alternative Trajectory ${i + 1}`}
              mapHeight={200}
              actionButtonText={"Choose"}
              onActionButtonClicked={onTrajectorySelected}
            />
          </IonCol>
        )}
        {/* </IonRow> */}
      </IonGrid>
      <IonFab vertical="top" horizontal="end">
        <IonFabButton onClick={onSave}>
          <IonIcon icon={saveOutline} />
        </IonFabButton>
      </IonFab>
    </div>
  );
};

export default ModifyTrajectoryForm;