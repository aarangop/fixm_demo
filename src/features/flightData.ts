import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { stat } from 'fs';
import { stringify } from 'querystring';
import type { RootState } from '../app/store';

export interface ITrajectoryPoint4D {
    altimerterSetting: number,
    level: number
    position: { latitude: number, longitude: number}
    predictedAirspeed: number,
    predictedGroundspeed: number
    absoluteTime: string
}

export interface IRouteTrajectory {
    routeTrajectoryElements: Array<ITrajectoryPoint4D>
}

export interface ITrajectoryGroup {
    desired: IRouteTrajectory
    agreed: IRouteTrajectory
    filed: IRouteTrajectory
    negotiating: IRouteTrajectory
}

// Define a type for the slice state
export interface IFlightData {
  originator: string,
  submitter: string,
  routeTrajectoryGroup: ITrajectoryGroup
}

export interface IWaypointActionPayload {
    trajectoryCollection:string, 
    sequence: number
}

export interface IWaypointActionPayloadNumber extends IWaypointActionPayload {
    value: number
}

// Define the initial state using that type
const initialState = {
  originator: "",
  submitter: "",
  routeTrajectoryGroup: {
      "desired": {
          routeTrajectoryElements: []
      },
      "filed": {
          routeTrajectoryElements: []
      },
      "agreed": {
          routeTrajectoryElements: []
      },
      "negotiating": {
          routeTrajectoryElements: []
      }
  }
} as IFlightData;

export const flightDataSlice = createSlice({
  name: 'flightData',
  initialState,
  reducers: {
      setOriginator: (state, action:PayloadAction<string>) => {
          state.originator = action.payload;
      },
      setSubmitter: (state, action: PayloadAction<string>) => {
          state.submitter = action.payload;
      },
      addDesiredWaypoint: (state, action: PayloadAction<{trajectoryIndex: string, waypoint: ITrajectoryPoint4D}>) => {
          console.log(action.payload.trajectoryIndex);
          state.routeTrajectoryGroup.desired.routeTrajectoryElements
            .push(action.payload.waypoint);
      },
      setWaypointAltimeterSetting: (state, action: PayloadAction<IWaypointActionPayloadNumber>) => {
        //   const key: keyof typeof state.routeTrajectoryGroup = action.payload.trajectoryCollection;
          if (action.payload.trajectoryCollection in state.routeTrajectoryGroup)
          {
              const keyStr = action.payload.trajectoryCollection;
              const i = action.payload.sequence;
              state.routeTrajectoryGroup[keyStr as keyof typeof state.routeTrajectoryGroup]
                .routeTrajectoryElements[i].altimerterSetting = action.payload.value;
          }
      },
      setWaypointLevel: (state, action: PayloadAction<IWaypointActionPayloadNumber>) => {
          const payload = action.payload;
          state.routeTrajectoryGroup[payload.trajectoryCollection as keyof typeof state.routeTrajectoryGroup]
            .routeTrajectoryElements[payload.sequence].level = payload.value;
      }
  },
})

export const { 
    setOriginator, 
    setSubmitter, 
    addDesiredWaypoint,
    setWaypointAltimeterSetting,
    setWaypointLevel
} = flightDataSlice.actions;


// Other code such as selectors can use the imported `RootState` type
export const selectOriginator = (state: RootState) => state.flightData.originator;
export const selectSubmitter = (state: RootState) => state.flightData.submitter;
export const selectFlightData = (state: RootState) => state.flightData;

export default flightDataSlice.reducer