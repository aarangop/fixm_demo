import React from "react";
import FlightDataInput from "../FlightDataInput";

const AUPreTactic: React.FC = () => {
  return (
    <FlightDataInput
      gufiEnabled={false}
      trajectoryVisible={true}
      desiredTrajectoryEditable={true}
    />
  );
};

export default AUPreTactic;