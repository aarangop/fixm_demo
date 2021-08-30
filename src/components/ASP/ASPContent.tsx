import React from "react";
import { IonLabel } from "@ionic/react";
import BasePage from "../../pages/BasePage";

const ASPContent : React.FC<{onNextPhase: Function, onPreviousPhase: Function}> = ({onNextPhase, onPreviousPhase}) => {
    return (
        <BasePage onNextPhase={onNextPhase} onPreviousPhase={onPreviousPhase}>
            <IonLabel>Flight Data</IonLabel>
        </BasePage>
    );
}

export default ASPContent;