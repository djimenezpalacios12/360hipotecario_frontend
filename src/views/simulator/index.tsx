import { useEffect, useState } from "react";
import moment from "moment";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUfStore } from "@/store/ducks/simulator";
import Stepper from "@/components/stepper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PersonalData from "./personalData";
import CreditData from "./creditData";
import DividendCalcutation from "./dividendCalculation";
import Approval from "./Approval";

const Simulator = () => {
  const today = moment().format("YYYY-MM-DD");
  const dispatch = useAppDispatch();
  const { valorPropdiedad, pieInicial, plazo, tasaInteresAnual } = useAppSelector((state) => state.simulator.simulator);

  const [UF, setUF] = useState<number | undefined>(0);
  const [resultSimulator, setresultSimulator] = useState<boolean>(false);

  useEffect(() => {
    const urlUF = "https://mindicador.cl/api/uf";
    const corsProxy = "https://api.allorigins.win/raw?url=";

    fetch(corsProxy + encodeURIComponent(urlUF))
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta de la red");
        }
        return response.json();
      })
      .then((data) => {
        const valorUF = data.serie[0].valor;
        setUF(valorUF);
        dispatch(setUfStore(valorUF));
      })
      .catch((error) => {
        console.error("Error al obtener el valor de la UF:", error);
      });
  });

  // Calculos generales
  const pieInicialValue = pieInicial / 100;
  const montoCreditoValue = valorPropdiedad - valorPropdiedad * pieInicialValue;
  const tasaMensual = tasaInteresAnual / 100 / 12; // Tasa mensual
  const plazoMeses = plazo * 12; // Plazo en meses
  const seguroDesgravamen = (montoCreditoValue * 0.0063241) / 100;
  const seguroIncendioSismo = (valorPropdiedad * 0.0202774) / 100;

  return (
    <>
      {resultSimulator ? (
        <div className="grid gap-4 grid-cols-1 px-20">
          <Card x-chunk="dashboard-07-chunk-1">
            <CardHeader className="flex justify-between">
              <CardTitle>Resultado simulación y predicción de tu crédito hipotecario en 360 Gestión</CardTitle>
              <CardDescription>
                Fecha: {today} | Valor UF: $
                {UF?.toLocaleString("es-CL", {
                  minimumFractionDigits: 2,
                })}
              </CardDescription>
            </CardHeader>
          </Card>

          <PersonalData />
          <CreditData pieInicialValue={pieInicialValue} montoCreditoValue={montoCreditoValue} />
          <DividendCalcutation
            montoCreditoValue={montoCreditoValue}
            tasaMensual={tasaMensual}
            plazoMeses={plazoMeses}
            seguroDesgravamen={seguroDesgravamen}
            seguroIncendioSismo={seguroIncendioSismo}
          />
          <Approval
            uf={UF}
            montoCreditoValue={montoCreditoValue}
            tasaMensual={tasaMensual}
            plazoMeses={plazoMeses}
            seguroDesgravamen={seguroDesgravamen}
            seguroIncendioSismo={seguroIncendioSismo}
          />
        </div>
      ) : (
        <Card x-chunk="dashboard-07-chunk-1">
          <CardHeader className="flex justify-between">
            <CardTitle>Bienvenido al simulador de crédito hipotecario de 360 Gestión</CardTitle>
            <CardDescription>
              Fecha: {today} | Valor UF: $
              {UF?.toLocaleString("es-CL", {
                minimumFractionDigits: 2,
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Stepper setresultSimulator={setresultSimulator} />
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Simulator;
