import { configureStore } from '@reduxjs/toolkit'
import flightDataReducer from '../features/flightData'
import flightplanProcessReducer from "../features/flightplanProcess";

const store = configureStore({
  reducer: {
    flightData: flightDataReducer,
    flightplanProcess: flightplanProcessReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;