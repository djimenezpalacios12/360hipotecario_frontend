import { useEffect, useState } from "react";
import moment from "moment";

import { useAppDispatch } from "@/store/hooks";
import { setUfStore } from "@/store/ducks/simulator";
import Stepper from "@/components/stepper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";

const Simulator = () => {
  const today = moment().format("YYYY-MM-DD");
  const dispatch = useAppDispatch();

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

  return (
    <>
      {resultSimulator ? (
        <div className="grid gap-4 grid-cols-1">
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

          <Card x-chunk="dashboard-07-chunk-1">
            <CardHeader className="flex justify-between">
              <CardTitle>Datos Personales</CardTitle>
              <CardDescription>
                <Separator className="my-4 p-[1px] bg-neutral-600 " />
              </CardDescription>
              <CardContent>tabla</CardContent>
            </CardHeader>
          </Card>

          <Card x-chunk="dashboard-07-chunk-1">
            <CardHeader className="flex justify-between">
              <CardTitle>Datos del Crédito</CardTitle>
              <CardDescription>
                <Separator className="my-4 p-[1px] bg-neutral-600 " />
              </CardDescription>

              <CardContent>tabla</CardContent>
            </CardHeader>
          </Card>

          <Card x-chunk="dashboard-07-chunk-1">
            <CardHeader className="flex justify-between">
              <CardTitle>Cálculo del Dividendo</CardTitle>
              <CardDescription>
                <Separator className="my-4 p-[1px] bg-neutral-600 " />
              </CardDescription>
              <CardContent>tabla</CardContent>
            </CardHeader>
          </Card>

          <Card x-chunk="dashboard-07-chunk-1">
            <CardHeader className="flex justify-between">
              <CardTitle>Probabilidad de Aprobación</CardTitle>
              <CardDescription>
                <Separator className="my-4 p-[1px] bg-neutral-600 " />
              </CardDescription>
              <CardContent></CardContent>
            </CardHeader>
          </Card>
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
