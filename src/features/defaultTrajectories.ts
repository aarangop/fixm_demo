import { createSlice, PayloadAction,  } from "@reduxjs/toolkit";
import trajectories from "../data/flightplans/trajectories.json"
import { ITrajectoryPoint4D } from "./flightData";

export interface ISavedTrajectory {
  label: string,
  edited: boolean,
  waypoints: Array<ITrajectoryPoint4D>
}

export interface ISavedTrajectories {
  "selected_trajectory": ISavedTrajectory,
  "alternative_trajectories": Array<ISavedTrajectory>,
  "agreed_trajectory": Array<ISavedTrajectory>
}

const initialState = trajectories as ISavedTrajectories;

export const defaultTrajectoriesSlice = createSlice({
    name: 'flightData',
  initialState,
  reducers: {
    setSelectedTrajectory: ((state, action: PayloadAction<ISavedTrajectory>) => {
      state.selected_trajectory = action.payload;
    })
  }
});

export const { 
  setSelectedTrajectory
} = defaultTrajectoriesSlice.actions; 

export default defaultTrajectoriesSlice.reducer;