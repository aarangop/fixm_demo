import React from "react";
import ReactMarkdown from "react-markdown";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { RootState } from "../app/store";
import { selectFlightData } from "../features/flightData";

const FixmFlightData: React.FC = () => {

  const fixmCode = useAppSelector((state: RootState) => state.flightData)

  return (
    <pre>{JSON.stringify(fixmCode, null, 2)}</pre>
  );
};

export default FixmFlightData;