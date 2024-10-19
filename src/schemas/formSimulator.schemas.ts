import { z } from "zod";

import { regexEmail, regexPhone, regexRUT } from "@/lib/regex";

// 1. Create schema Personal Data
export const formsSimulatorPersonalDataSchema = z.object({
  nombreProyecto: z.string().min(1, {
    message: "Ingresar el nombre del proyecto",
  }),
  numeroUnidad: z.string().min(1, {
    message: "Ingresar el número de la unidad",
  }),
  nombreCliente: z.string().min(1, {
    message: "Ingresar el nombre Cliente",
  }),
  rut: z.string().regex(regexRUT, {
    message: "Ingresar un rut válido",
  }),
  telefonoCliente: z.string().regex(regexPhone, {
    message: "Ingresar un número de teléfono válido ej: +56912345678",
  }),
  emailCliente: z.string().regex(regexEmail, {
    message: "Ingresar un correo valido",
  }),
  ejecutivoComercial: z.string().min(1, {
    message: "Ingrese el nombre del Ejecutivo",
  }),
});

// 1.1 Create schema calculo credito
export const formsSimulatorCreditoSchema = z.object({
  valorPropdiedad: z.number().min(1, {
    message: "Ingresar el valor de la propiedad en UF",
  }),
  pieInicial: z.number().min(0, {
    message: "Ingresar el porcentaje del pie inicial",
  }),
  plazo: z.number().min(0, {
    message: "Ingresar el en plazo en años",
  }),
  tasaInteresAnual: z.number().min(0, {
    message: "Ingrese el porcentaje de interes anual",
  }),
});

// 1.2 Create schema Ingresos dedudor
export const formsSimulatorIngresosDedudorSchema = z.object({
  rentaLiquidaDeudor: z.number().min(0, {
    message: "Ingrese la renta líquida del deudor en CLP",
  }),
  otroIngresosDeudor: z.number().min(0, {
    message: "Ingrese otros ingresos del deudor en CLP",
  }),
  pagosGastosMensualesDeudor: z.number().min(0, {
    message: "Ingrese los gastos mensuales del deudor en CLP",
  }),
  rentaLiquidaCodeudor: z.number().optional(),
  otroIngresosCodeudor: z.number().optional(),
  pagosGastosMensualesCodeudor: z.number().optional(),
});
