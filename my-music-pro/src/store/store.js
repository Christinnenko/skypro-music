import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./reducers/todo";
import { getFavTracksApi } from "../services/todo";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    [getFavTracksApi.reducerPath]: getFavTracksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(getFavTracksApi.middleware),
});
