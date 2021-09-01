import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { stat } from 'fs';
import { stringify } from 'querystring';
import type { RootState } from '../app/store';

export interface ITrajectoryPoint4D {
  altimerterSetting: number,
  level: number
  position: { latitude: number, longitude: number }
  predictedAirspeed: number,
  predictedGroundspeed: number
  absoluteTime: string
}

export interface IRouteTrajectory {
  label?: string,
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
  gufi: string,
  originator: string,
  operator?: string,
  departure?: string,
  destination?: string,
  estimatedOffBlockTime?: string,
  estimatedArrivalBlockTime?: string,
  routeTrajectoryGroup: ITrajectoryGroup
}

export interface IWaypointActionPayload {
  trajectoryCollection: string,
  sequence: number
}

export interface IWaypointActionPayloadNumber extends IWaypointActionPayload {
  value: number
}

export const getNewWaypoint = (): ITrajectoryPoint4D => {
  return {
    altimerterSetting: 1013.25,
    level: 100,
    position: { latitude: 0, longitude: 0 },
    predictedAirspeed: 100,
    predictedGroundspeed: 100,
    absoluteTime: "00:00:00"
  }
};

// Define the initial state using that type
const initialState = {
  gufi: "",
  originator: "",
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
    },
    estimatedOffBlockTime: "01.01.2022 - 08:00:00",
    estimatedArrivalBlockTime: "01.01.2022 - 10:00:00",
  }
} as IFlightData;

export const flightDataSlice = createSlice({
  name: 'flightData',
  initialState,
  reducers: {
    setGufi: ((state, action: PayloadAction<string>) => {
      state.gufi = action.payload;
      console.log("GUFI assigned: ", state.gufi);
    }),
    setOriginator: (state, action: PayloadAction<string>) => {
      state.originator = action.payload;
    },
    setBasicFltData: ((state, action: PayloadAction<IFlightData>) => ({
        ...action.payload,
        routeTrajectoryGroup: state.routeTrajectoryGroup
    })),
    addNew4DWaypoint: (state, action: PayloadAction<string>) => {
      if (action.payload in state.routeTrajectoryGroup) {
        state.routeTrajectoryGroup[action.payload as keyof typeof state.routeTrajectoryGroup]
          .routeTrajectoryElements.push(getNewWaypoint());
      }
    },
    addDesiredWaypoint: (state, action: PayloadAction<{ trajectoryIndex: string, waypoint: ITrajectoryPoint4D }>) => {
      console.log(action.payload.trajectoryIndex);
      state.routeTrajectoryGroup.desired.routeTrajectoryElements
        .push(action.payload.waypoint);
    },
    setWaypointAltimeterSetting: (state, action: PayloadAction<IWaypointActionPayloadNumber>) => {
      if (action.payload.trajectoryCollection in state.routeTrajectoryGroup) {
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
    },
    setDesiredTrajectory: ((state, action: PayloadAction<IRouteTrajectory>) => {
      state.routeTrajectoryGroup.desired = action.payload;
      console.log("Desired trajectory changed:");
      console.log(state.routeTrajectoryGroup.desired)
    }),
    setAgreedTrajectory: ((state, action: PayloadAction<IRouteTrajectory>) => {
      state.routeTrajectoryGroup.agreed = action.payload;
      console.log("Agreed trajectory changed:");
      console.log(state.routeTrajectoryGroup.agreed);
    })
  },
})

export const {
  setOriginator,
  addDesiredWaypoint,
  addNew4DWaypoint,
  setWaypointAltimeterSetting,
  setWaypointLevel,
  setBasicFltData,
  setDesiredTrajectory,
  setAgreedTrajectory,
  setGufi
} = flightDataSlice.actions;


// Other code such as selectors can use the imported `RootState` type
export const selectOriginator = (state: RootState) => state.flightData.originator;
export const selectFlightData = (state: RootState) => state.flightData;

export default flightDataSlice.reducer