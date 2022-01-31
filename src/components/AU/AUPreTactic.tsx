import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { IFlightData, setDesiredTrajectory } from "../../features/flightData";
import FlightDataInput from "../FlightDataInput";

const AUPreTactic: React.FC = () => {

  const dispatch = useAppDispatch();
  const submitTrajectory = (fltData: IFlightData) =>
    dispatch(setDesiredTrajectory({ ...fltData.routeTrajectoryGroup.desired })
    );

  return (
    <FlightDataInput
      gufiEnabled={false}
      trajectoryVisible={true}
      desiredTrajectoryEditable={true}
      rejectButtonEnabled={false}
      acceptButtonText="Submit Changes"
      onAccept={submitTrajectory}
    />
  );
};

export default AUPreTactic;