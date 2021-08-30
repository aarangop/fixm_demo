import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface IFlightPlanProcess {
    planningPhaseIndex: number,
    flightPhaseIndex: number
};

const planningPhases = [
    "Strategic",
    "Pre-Tactical",
    "Tactical"
]

const flightPhases = [
    "Pre-flight",
    "In-flight",
    "En-route"
]

/**
 * Flight Phases:
 * - pre-flight
 * - flight
 * - enroute
 */

/**
 * Stages:
 * - strategic
 * - pre-tactic
 * - tactical
 */

const initialState = {
    planningPhaseIndex: 0,
    flightPhaseIndex: 0
} as IFlightPlanProcess;

export const flightplanProcessSlice = createSlice({
    name: "flightplanProcess",
    initialState,
    reducers: {
        nextPlanningPhase: (state) => {
            console.log("Going to next planning phase! -- reducer!");
            if (state.planningPhaseIndex < planningPhases.length - 1)
                state.planningPhaseIndex += 1;
        },
        previousPlanningPhase: (state) => {
            if(state.planningPhaseIndex > 0) 
                state.planningPhaseIndex = state.planningPhaseIndex - 1;
        }
    }
});

export const { nextPlanningPhase, previousPlanningPhase } = flightplanProcessSlice.actions;
export const selectFlightPhase = (state: RootState) => flightPhases[state.flightplanProcess.flightPhaseIndex];
export const selectPlanningPhase = (state: RootState) => planningPhases[state.flightplanProcess.planningPhaseIndex];
export const selectPlanningPhaseIndex = (state: RootState) => state.flightplanProcess.flightPhaseIndex;

export default flightplanProcessSlice.reducer;