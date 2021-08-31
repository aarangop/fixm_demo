import { IonCol, IonContent, IonGrid, IonInput, IonItem, IonItemDivider, IonLabel, IonRow, IonText } from "@ionic/react"
import React from "react"
import { useAppDispatch } from "../../app/hooks";
import { IFlightData, setAgreedTrajectory, setBasicFltData, setOriginator } from "../../features/flightData";
import FlightDataInput, { IFlightDataInputProps } from "../FlightDataInput";

const flightDataInputProps: IFlightDataInputProps = {
  gufiEnabled: false,
  operatorEnabled: true,
  originatorEnabled: true,
  departureEnabled: true,
  arrivalEnabled: true,
  trajectoryVisible: true,
  acceptButtonEnabled: true,
  acceptButtonText: "Submit Initial Flight Plan",
  rejectButtonEnabled: false,
  departureDateEnabled: true,
  arrivalDateEnabled: true,
  desiredTrajectoryEditable: true
}
const AUStrategic: React.FC = () => {

  const dispatch = useAppDispatch();

  const onSubmit = (tempFltData: IFlightData) => {
    dispatch(setBasicFltData({...tempFltData}))
  }

  return (
    <FlightDataInput {...flightDataInputProps} onAccept={onSubmit} />
  )
}

export default AUStrategic;