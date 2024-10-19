import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { SimulatorData, SimulatorObject } from "@/interfaces/simulator.interfaces";

const nameSlice = "SIMULATOR";
const initialState: SimulatorObject = {
  simulator: {
    nombreProyecto: "",
    numeroUnidad: "",
    nombreCliente: "",
    rut: "",
    telefonoCliente: "",
    emailCliente: "",
    ejecutivoComercial: "",
    valorPropdiedad: 0,
    pieInicial: 0,
    plazo: 0,
    tasaInteresAnual: 0,
    rentaLiquidaDeudor: 0,
    otroIngresosDeudor: 0,
    pagosGastosMensualesDeudor: 0,
    rentaLiquidaCodeudor: 0,
    otroIngresosCodeudor: 0,
    pagosGastosMensualesCodeudor: 0,
  },
  uf: 0,
};

export const app = createSlice({
  name: nameSlice,
  initialState,
  reducers: {
    setSimulatorData: (state: SimulatorObject, action: PayloadAction<SimulatorData>) => {
      return { ...state, simulator: action.payload };
    },
    setUfStore: (state: SimulatorObject, action: PayloadAction<number>) => {
      return { ...state, uf: action.payload };
    },
    // Reset Redux State
    resetApp(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setSimulatorData, setUfStore } = app.actions;
export default app.reducer;
