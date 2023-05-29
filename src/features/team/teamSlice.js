import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";


const initialState = {
  data: [],
  selectedPlayerList: [],
};

export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setNewTeam: (state, { payload }) => {
      state.data = [...state.data, { ...payload, id: uuidv4() }];
      state.selectedPlayerList = [
        ...state.selectedPlayerList,
        ...payload.players,
      ];
    },
    updateTeam: (state, { payload }) => {
      const index = state.data.findIndex((item) => item.id === payload.id);
      state.data[index] = payload;
      state.selectedPlayerList = [
        ...state.selectedPlayerList,
        ...payload.players,
      ];
    },
    deleteTeam: (state, { payload }) => {
      const data = state.data.filter((item) => item.id !== payload);
      state.data = data;
    },
  },
});

export const { setNewTeam, updateTeam, deleteTeam } = teamSlice.actions;


export const getTeam = state => state.teams.data
export const getSelectedPlayer = state => state.teams.selectedPlayerList


export default teamSlice.reducer;
