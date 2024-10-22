import { useEffect, useState } from "react";
import { Undo, FileDown } from "lucide-react";
import moment from "moment";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUfStore } from "@/store/ducks/simulator";
import Stepper from "@/components/stepper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
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
      {!resultSimulator ? (
        <div className="grid gap-4 grid-cols-1 px-1 md:px-20">
          <Card x-chunk="dashboard-07-chunk-1" className="overflow-hidden text-ellipsis">
            <CardHeader>
              <CardTitle className="text-center md:text-left">Resultado simulación y predicción de tu crédito hipotecario en 360 Gestión</CardTitle>
              <CardDescription className="text-center md:text-left flex justify-center md:justify-between items-center">
                <div className="block md:flex h-5 items-center space-x-4 text-sm">
                  <p className="text-md text-muted-foreground">
                    Fecha: <span className="font-semibold">{today}</span>
                  </p>
                  <Separator orientation="vertical" className="hidden md:flex" />
                  <p className="text-md text-muted-foreground">
                    Valor UF: $
                    <span className="font-semibold">
                      {UF?.toLocaleString("es-CL", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </p>
                </div>
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="flex justify-center md:justify-end gap-2">
            <Button variant="outline" size="icon" className="rounded-full" onClick={() => setresultSimulator(!resultSimulator)}>
              <Undo className="h-4 w-4 text-neutral-100" />
            </Button>
            <Button variant="outline" size="icon" className="border-red-700 rounded-full">
              <FileDown className="h-4 w-4" />
            </Button>
          </div>

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
