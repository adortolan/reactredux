import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "1", name: "Adilson" },
  { id: "2", name: "Angelica" },
  { id: "3", name: "Ingrid" },
];

export const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
});

export default usersSlice.reducer;
