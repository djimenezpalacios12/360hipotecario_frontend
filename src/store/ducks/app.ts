import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

import { AppStore } from "@/interfaces/app.interfaces";

const nameSlice = "APP";
const initialState: AppStore = {
  user: {
    email: "",
    nombre: "",
    empresa: "",
    rol: "",
    token: "",
  },
};

export const app = createSlice({
  name: nameSlice,
  initialState,
  reducers: {
    // Reset Redux State
    resetApp(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { resetApp } = app.actions;
export default app.reducer;
