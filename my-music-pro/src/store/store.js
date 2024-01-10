import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./reducers/todo";

export const store = configureStore({
  reducer: {
    player: playerReducer,
  },
});
