import { createSlice,  } from "@reduxjs/toolkit";
import trajectories from "../data/flightplans/trajectories.json"
import { ITrajectoryPoint4D } from "./flightData";

export interface ISavedTrajectory {
  label: string,
  edited: boolean,
  waypoints: Array<ITrajectoryPoint4D>
}

interface ISavedTrajectories {
  "selected_trajectory": ISavedTrajectory,
  "alternative_trajectories": Array<ISavedTrajectory>
}

const initialState = trajectories as ISavedTrajectories;

export const defaultTrajectoriesSlice = createSlice({
    name: 'flightData',
  initialState,
  reducers: {

  }
});

export const { } = defaultTrajectoriesSlice.actions; 

export default defaultTrajectoriesSlice.reducer;