import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { nextPlanningPhase, previousPlanningPhase } from "../../features/flightplanProcess";
import BasePage2 from "../../pages/BasePage2";
import ASPPreTactic from "./ASPPreTactic";
import ASPStrategic from "./ASPStrategic";

const ASPContent : React.FC = () => {
    
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
                return <ASPStrategic/>;
            case 1:
                return <ASPPreTactic/>
            case 2:
                return <div/>
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

export default ASPContent;