import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import teamReducer from "../features/team/teamSlice";
import playerReducer from "../features/player/playerSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    teams: teamReducer,
    players: playerReducer,
  },
});
