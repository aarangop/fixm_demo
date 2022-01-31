import { IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonText, IonToolbar, useIonModal } from "@ionic/react";
import { pencilOutline } from "ionicons/icons";
import { Provider } from "react-redux";
import store from "../app/store";
import ModifyTrajectoryForm from "./ModifyTrajectoryForm";

interface ITrajectoryCardProps {
  trajectory: string
};

const TrajectoryCard: React.FC<{ trajectoryProps: ITrajectoryCardProps }> = ({ trajectoryProps }) => {

  const getTrajectoryModal = () => {
    return (
      <Provider store={store}>
        <ModifyTrajectoryForm trajectory={trajectoryProps.trajectory} />
      </Provider>)
  };

  const [present, dismiss] = useIonModal(getTrajectoryModal(), {
    trajectory: trajectoryProps.trajectory
  });

  const openModifyTrajectoryModal = () => { present() };

  return (
    <IonCard>
      <IonCardHeader>
        <IonToolbar>
          <IonBadge color="success">Accepted</IonBadge>
          <IonButtons slot="primary">
            <IonButton onClick={openModifyTrajectoryModal} color="medium">
              <IonIcon icon={pencilOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonCardTitle>{trajectoryProps.trajectory}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonText>WP1, WP2, WP3</IonText>
      </IonCardContent>
    </IonCard>
  );
}

export default TrajectoryCard;