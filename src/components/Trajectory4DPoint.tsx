import { IonButton, IonCol, IonIcon, IonInput, IonItem, IonLabel, IonRow } from "@ionic/react";
import { ITrajectoryPoint4D } from "../features/flightData";
import { pencilOutline, trashOutline, saveOutline } from "ionicons/icons";
import { useState } from "react";

const Trajectory4DPoint: React.FC<{ trajectoryElement: ITrajectoryPoint4D }> = (trajectoryElement) => {

  const [editOn, setEditOn] = useState<boolean>(false);
  const onEditClicked = () => {
    setEditOn(true);
  }
  const onDeleteClicked = () => {
    console.log("Delete waypoint!");
  }

  return (
    <IonItem>
      <IonRow>
        <IonCol>
          <IonLabel position="stacked">LAT</IonLabel>
          <IonInput disabled>53.5N</IonInput>
        </IonCol>
        <IonCol>
          <IonLabel position="stacked">LNG</IonLabel>
          <IonInput disabled>53.5N</IonInput>
        </IonCol>
        <IonCol>
          <IonLabel position="stacked">TIME</IonLabel>
          <IonInput disabled>00:00</IonInput>
        </IonCol>
        <IonCol>
          <IonButton size="small" shape="round" onClick={() => editOn ? setEditOn(false) : onEditClicked()}>
            <IonIcon icon={!editOn ? pencilOutline : saveOutline} />
          </IonButton>

        </IonCol>
        <IonCol>
          <IonButton onClick={onDeleteClicked} size="small" shape="round" color="danger">
            <IonIcon icon={trashOutline} />
          </IonButton>

        </IonCol>

      </IonRow>
    </IonItem>
  );
}
export default Trajectory4DPoint;