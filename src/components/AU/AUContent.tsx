import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { nextPlanningPhase, previousPlanningPhase } from "../../features/flightplanProcess";
import BasePage from "../../pages/BasePage"
import BasePage2 from "../../pages/BasePage2";
import AUPreTactic from "./AUPreTactic";
import AUStrategic from "./AUStrategic";
import AUTactic from "./AUTactic";

const AUContent : React.FC = () => {
    
    const planningPhase = useAppSelector(state => state.flightplanProcess.planningPhaseIndex);
    const dispatch = useAppDispatch();

    const onNextPhase = () => {
        dispatch(nextPlanningPhase());
    }

    const onPreviousPhase = () => {
        dispatch(previousPlanningPhase());
    }

    const getAUContent = () => {
        console.log("Current phase", planningPhase)
        // return a component based on current planning phase.
        switch(planningPhase){
            case 0:
                return <AUStrategic/>;
            case 1:
                return <AUPreTactic/>;
            case 2:
                return <AUTactic/>
        };
    };
    
    return(
        <BasePage2 
            onPreviousPhase={() => onPreviousPhase()} 
            onNextPhase={() => onNextPhase()}
        >
            {getAUContent()}
        </BasePage2>
    );
}

export default AUContent;