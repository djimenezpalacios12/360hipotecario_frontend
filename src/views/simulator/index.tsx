import { useEffect, useState, useRef, ChangeEvent } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Undo, FileDown } from "lucide-react";
import moment from "moment";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUfStore } from "@/store/ducks/simulator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Stepper from "@/components/stepper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logoHipotecario from "../../assets/wallpapers/logo-360Hipotecario.png";
import PersonalData from "./personalData";
import CreditData from "./creditData";
import DividendCalcutation from "./dividendCalculation";
import Approval from "./Approval";

const Simulator = () => {
  const today = moment().format("YYYY-MM-DD");
  const dispatch = useAppDispatch();
  const { valorPropdiedad, pieInicial, plazo, tasaInteresAnual } = useAppSelector((state) => state.simulator.simulator);

  const cardRef = useRef<HTMLDivElement>(null); // Referencia al componente
  const [UF, setUF] = useState<number | undefined>(0);
  const [editUF, seteditUF] = useState<boolean>(false);
  const [resultSimulator, setresultSimulator] = useState<boolean>(false);

  useEffect(() => {
    const urlUF = "https://mindicador.cl/api/uf";
    const corsProxy = "https://api.allorigins.win/raw?url=";

    fetch(corsProxy + encodeURIComponent(urlUF))
      .then((response) => {
        if (!response.ok) {
          seteditUF(true);
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
        seteditUF(true);
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

  // Función para exportar el Card a PDF
  const exportPDF = async () => {
    const input = cardRef.current;
    if (input) {
      const canvas = await html2canvas(input, { scale: 2 }); // Generar imagen del componente
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      // Calcular las dimensiones para que se ajuste correctamente al PDF
      const imgWidth = 210; // Ancho del A4 en mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 10, imgWidth, imgHeight);
      pdf.save("simulation.pdf"); // Guardar PDF
    }
  };

  return (
    <>
      {resultSimulator ? (
        <>
          <div className="flex justify-center md:justify-end gap-2 px-1 md:px-20">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="outline" size="icon" className="rounded-full" onClick={() => setresultSimulator(!resultSimulator)}>
                    <Undo className="h-4 w-4  dark:text-neutral-100" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Volver</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="outline" size="icon" className="rounded-full" onClick={exportPDF}>
                    <FileDown className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Exportar</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div ref={cardRef} className="grid gap-4 grid-cols-1 px-4 md:px-20">
            <Card x-chunk="dashboard-07-chunk-1" className="overflow-hidden text-ellipsis p-2 block md:flex items-center">
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

              <CardContent className="w-full flex justify-center md:justify-end items-center p-0">
                <img src={logoHipotecario} alt="logo 360 Hipotecario" className="w-[100px] self-center" />
              </CardContent>
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
        </>
      ) : (
        <Card x-chunk="dashboard-07-chunk-1">
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

            {editUF ? (
              <div className="grid grid-cols-12 py-4 ">
                <div className="col-span-3">
                  <div className="flex max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">UF</Label>
                    <Input type="number" id="rut" placeholder="$" onChange={(event: ChangeEvent<HTMLInputElement>) => setUF(+event.target.value)} />
                  </div>
                  <p className="text-xs text-muted-foreground">Existe un error obtener el valor de la UF, puede ingresar un valor personalizado</p>
                </div>
              </div>
            ) : null}
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
