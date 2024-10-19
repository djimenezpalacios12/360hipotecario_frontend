export interface SimulatorObject {
  simulator: SimulatorData;
  uf: number | undefined;
}

export interface SimulatorData {
  nombreProyecto: string;
  numeroUnidad: string;
  nombreCliente: string;
  rut: string;
  telefonoCliente: string;
  emailCliente: string;
  ejecutivoComercial: string;
  valorPropdiedad: number;
  pieInicial: number;
  plazo: number;
  tasaInteresAnual: number;
  rentaLiquidaDeudor: number;
  otroIngresosDeudor: number;
  pagosGastosMensualesDeudor: number;
  rentaLiquidaCodeudor: number;
  otroIngresosCodeudor: number;
  pagosGastosMensualesCodeudor: number;
}
