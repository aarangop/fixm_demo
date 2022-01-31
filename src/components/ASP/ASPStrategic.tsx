import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { IFlightData, setAgreedTrajectory, setGufi } from "../../features/flightData";
import FlightDataInput from "../FlightDataInput";


const ASPStrategic: React.FC = () => {

  const operator = useAppSelector((state: RootState) => state.flightData.operator);
  const dispatch = useAppDispatch();

  const onTrajectoryAccepted = (trajectory: IFlightData) => {
    dispatch(setAgreedTrajectory(trajectory.routeTrajectoryGroup.desired))
    console.log("%c Desired trajectory accepted by ASP!", 'background: #69bb7b; color: #005a00');
    console.log(trajectory.routeTrajectoryGroup.desired)
  }

  const onTrajectoryRejected = () => {
    console.log("%c Desired trajectory rejected by ASP!", 'background: #ed576b; color: #222428');
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
      destinationEnabled={false}
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