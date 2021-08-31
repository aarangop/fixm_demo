import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { setSelectedTrajectory } from "../../features/defaultTrajectories";
import { IFlightData, setAgreedTrajectory, setGufi } from "../../features/flightData";
import FlightDataInput from "../FlightDataInput";


const ASPStrategic: React.FC = () => {

  const operator = useAppSelector((state: RootState) => state.flightData.operator);
  const dispatch = useAppDispatch();

  const savedTrajectories = useAppSelector((state: RootState) => state.defaultTrajectories)

  const onTrajectoryAccepted = (trajectory: IFlightData) => {
    dispatch(setAgreedTrajectory(trajectory.routeTrajectoryGroup.desired))
    // dispatch(setSelectedTrajectory())
  }

  const onTrajectoryRejected = () => {
    
  }

  const createGufi = (): string => {
    const number = Math.round(Math.random() * 1e12);
    return `${operator}-${number}`;
  };

  const onGufiButtonClicked = () => {
    const gufi = createGufi();
    dispatch(setGufi(gufi));
  }

  return (
    <FlightDataInput
      assignGufiButtonEnabled={true}
      originatorEnabled={false}
      operatorEnabled={false}
      departureEnabled={false}
      arrivalEnabled={false}
      departureDateEnabled={false}
      arrivalDateEnabled={false}
      trajectoryVisible={true}
      desiredTrajectoryEditable={false}
      agreedTrajectoryEditable={false}
      acceptButtonEnabled={true}
      rejectButtonEnabled={true}
      onAccept={onTrajectoryAccepted}
      onReject={onTrajectoryRejected}
      onGufiButtonClicked={onGufiButtonClicked}
    />
  );
}

export default ASPStrategic;