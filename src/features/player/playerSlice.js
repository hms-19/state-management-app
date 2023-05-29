import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  count: 0,
};

export const playerSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setPlayers: (state, { payload }) => {
      state.data = [...payload];
      state.count = payload.length;
    },
  },
});

export const { setPlayers } = playerSlice.actions;

export const getPlayers = state => state.players.data
export default playerSlice.reducer;
