import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { formsSimulatorPersonalDataSchema, formsSimulatorCreditoSchema, formsSimulatorIngresosDedudorSchema } from "@/schemas/formSimulator.schemas";

export const usePersonalDataForm = () => {
  // 2. Define form
  const personalDataForm = useForm<z.infer<typeof formsSimulatorPersonalDataSchema>>({
    resolver: zodResolver(formsSimulatorPersonalDataSchema),
    defaultValues: {
      nombreProyecto: "",
      numeroUnidad: "",
      nombreCliente: "",
      rut: "",
      telefonoCliente: "",
      emailCliente: "",
      ejecutivoComercial: "",
    },
  });

  return personalDataForm;
};

export const useCreditoForm = () => {
  // 2. Define form
  const personalDataForm = useForm<z.infer<typeof formsSimulatorCreditoSchema>>({
    resolver: zodResolver(formsSimulatorCreditoSchema),
    defaultValues: {
      valorPropdiedad: 0,
      pieInicial: 0,
      plazo: 0,
      tasaInteresAnual: 0,
    },
  });

  return personalDataForm;
};

export const useIngresosDedudorForm = () => {
  // 2. Define form
  const ingresosDedudorDataForm = useForm<z.infer<typeof formsSimulatorIngresosDedudorSchema>>({
    resolver: zodResolver(formsSimulatorIngresosDedudorSchema),
    defaultValues: {
      rentaLiquidaDeudor: 0,
      otroIngresosDeudor: 0,
      pagosGastosMensualesDeudor: 0,
      rentaLiquidaCodeudor: 0,
      otroIngresosCodeudor: 0,
      pagosGastosMensualesCodeudor: 0,
    },
  });

  return ingresosDedudorDataForm;
};
