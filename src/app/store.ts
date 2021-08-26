import { configureStore } from '@reduxjs/toolkit'
import flightDataReducer from '../features/flightData'

const store = configureStore({
  reducer: {
    flightData: flightDataReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;