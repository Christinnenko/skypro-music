import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./reducers/reducers.js";
import { getFavTracksApi } from "../services/Services";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    [getFavTracksApi.reducerPath]: getFavTracksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(getFavTracksApi.middleware),
});
