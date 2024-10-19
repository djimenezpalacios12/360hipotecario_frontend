import { useEffect, useState } from "react";

import { useAppDispatch } from "@/store/hooks";
import { setUfStore } from "@/store/ducks/simulator";
import Stepper from "@/components/stepper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Simulator = () => {
  const dispatch = useAppDispatch();

  const [UF, setUF] = useState<number | undefined>(0);

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
    <Card x-chunk="dashboard-07-chunk-1">
      <CardHeader className="flex justify-between">
        <CardTitle>Bienvenido al simulador de crédito hipotecario de 360 Gestión</CardTitle>
        <CardDescription>
          Fecha: 17-10-2024 | Valor UF: $
          {UF?.toLocaleString("es-CL", {
            minimumFractionDigits: 2,
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Stepper />
      </CardContent>
    </Card>
  );
};

export default Simulator;
