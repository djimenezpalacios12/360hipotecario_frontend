import { Dispatch, SetStateAction, useState } from "react";
import { Loader } from "lucide-react";
import { z } from "zod";

import { useAppDispatch } from "@/store/hooks";
import { setSimulatorData } from "@/store/ducks/simulator";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCreditoForm, useIngresosDedudorForm, usePersonalDataForm } from "@/hooks/useFormSimulator";
import { formsSimulatorPersonalDataSchema, formsSimulatorCreditoSchema, formsSimulatorIngresosDedudorSchema } from "@/schemas/formSimulator.schemas";
import "./styles.css";

interface StepperProps {
  setresultSimulator: Dispatch<SetStateAction<boolean>>;
}

const Stepper: React.FC<StepperProps> = ({ setresultSimulator }) => {
  const dipatch = useAppDispatch();

  const formPersonalData = usePersonalDataForm();
  const formCredit = useCreditoForm();
  const formDeudor = useIngresosDedudorForm();

  const [currentStep, setCurrentStep] = useState(0);
  const [load, setLoad] = useState(false);
  const [step0, setstep0] = useState<any>({});
  const [step1, setstep1] = useState<any>({});

  const nextStep0 = (values: z.infer<typeof formsSimulatorPersonalDataSchema>) => {
    if (currentStep === 0) {
      setstep0(values);
      setCurrentStep(currentStep + 1);
    }
  };

  const nextStep1 = (values: z.infer<typeof formsSimulatorCreditoSchema>) => {
    if (currentStep === 1) {
      setstep1(values);
      setCurrentStep(currentStep + 1);
    }
  };

  const nextStep2 = (values: z.infer<typeof formsSimulatorIngresosDedudorSchema>) => {
    if (currentStep === 2) {
      setLoad(true);
      dipatch(
        setSimulatorData({
          ...step0,
          ...step1,
          ...values,
        })
      );
      setresultSimulator(true);
      setLoad(false);
      return;
    }
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep));
  };

  return (
    <div className="w-full max-w-[90%] mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <div className={`step-item ${currentStep >= 0 ? "active" : ""}`}>
          <div className="step-number">1</div>
          <div className="step-label">Datos Personales</div>
        </div>
        <div className="step-connector" />
        <div className={`step-item ${currentStep >= 1 ? "active" : ""}`}>
          <div className="step-number">2</div>
          <div className="step-label">Cálculo del Crédito</div>
        </div>
        <div className="step-connector" />
        <div className={`step-item ${currentStep >= 2 ? "active" : ""}`}>
          <div className="step-number">3</div>
          <div className="step-label">Ingresos</div>
        </div>
      </div>

      {/* Contenido de los pasos */}
      {currentStep === 0 && (
        <div>
          <Form {...formPersonalData}>
            <form onSubmit={formPersonalData.handleSubmit(nextStep0)} className="space-y-2 ">
              <Card className="border-none">
                <CardHeader>
                  <CardTitle>Paso 1</CardTitle>
                  <CardDescription>Ingrese sus datos personales y del proyecto</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-6">
                      <FormField
                        control={formPersonalData.control}
                        name="nombreProyecto"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre del Proyecto</FormLabel>
                            <FormControl>
                              <Input placeholder="Proyecto A-1" {...field} disabled={load} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <FormField
                        control={formPersonalData.control}
                        name="numeroUnidad"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Número de la unidad</FormLabel>
                            <FormControl>
                              <Input placeholder="Unidad 1" {...field} disabled={load} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <FormField
                        control={formPersonalData.control}
                        name="nombreCliente"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre del cliente</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} disabled={load} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <FormField
                        control={formPersonalData.control}
                        name="rut"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>RUT del cliente</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} disabled={load} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <FormField
                        control={formPersonalData.control}
                        name="telefonoCliente"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Teléfono del cliente</FormLabel>
                            <FormControl>
                              <Input placeholder="+56912345678" {...field} disabled={load} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <FormField
                        control={formPersonalData.control}
                        name="emailCliente"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email del cliente</FormLabel>
                            <FormControl>
                              <Input placeholder="john.doe@email.cl" {...field} disabled={load} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <FormField
                        control={formPersonalData.control}
                        name="ejecutivoComercial"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ejecutivo comercial</FormLabel>
                            <FormControl>
                              <Input placeholder="Sr. Smith" {...field} disabled={load} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-end">
                  <Button type="submit" disabled={load}>
                    Siguiente
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </div>
      )}

      {currentStep === 1 && (
        <div>
          <Form {...formCredit}>
            <form onSubmit={formCredit.handleSubmit(nextStep1)} className="space-y-2 ">
              <Card className="border-none">
                <CardHeader>
                  <CardTitle>Paso 2</CardTitle>
                  <CardDescription>Datos para el Cálculo del Crédito</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-6">
                      <FormField
                        control={formCredit.control}
                        name="valorPropdiedad"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Valor de la propiedad (UF)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Proyecto A-1"
                                {...field}
                                onChange={(e) => field.onChange(+e.target.value)}
                                type="number"
                                disabled={load}
                              />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <FormField
                        control={formCredit.control}
                        name="pieInicial"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pie inicial (%)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Unidad 1"
                                {...field}
                                disabled={load}
                                onChange={(e) => field.onChange(+e.target.value)}
                                type="number"
                              />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <FormField
                        control={formCredit.control}
                        name="plazo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Plazo (años)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Unidad 1"
                                {...field}
                                disabled={load}
                                onChange={(e) => field.onChange(+e.target.value)}
                                type="number"
                              />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <FormField
                        control={formCredit.control}
                        name="tasaInteresAnual"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tasa de interés anual (%)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Unidad 1"
                                {...field}
                                disabled={load}
                                onChange={(e) => field.onChange(+e.target.value)}
                                type="number"
                              />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <Button variant="secondary" onClick={prevStep} disabled={load}>
                    Anterior
                  </Button>
                  <Button type="submit" disabled={load}>
                    Siguiente
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <Form {...formDeudor}>
            <form onSubmit={formDeudor.handleSubmit(nextStep2)} className="space-y-2 ">
              <Card className="border-none">
                <CardHeader>
                  <CardTitle>Paso 3</CardTitle>
                  <CardDescription>Datos de los Ingresos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-6">
                      <FormField
                        control={formDeudor.control}
                        name="rentaLiquidaDeudor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Renta líquida deudor</FormLabel>
                            <FormControl>
                              <Input placeholder="0" {...field} onChange={(e) => field.onChange(+e.target.value)} type="number" disabled={load} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <FormField
                        control={formDeudor.control}
                        name="otroIngresosDeudor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Otros ingresos deudor (CLP)</FormLabel>
                            <FormControl>
                              <Input placeholder="0" {...field} onChange={(e) => field.onChange(+e.target.value)} type="number" disabled={load} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <FormField
                        control={formDeudor.control}
                        name="pagosGastosMensualesDeudor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pagos y gastos mensuales deudor (CLP)</FormLabel>
                            <FormControl>
                              <Input placeholder="0" {...field} onChange={(e) => field.onChange(+e.target.value)} type="number" disabled={load} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 ">
                      <Separator className="my-4 w-full" />
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-6 border-2 rounded-lg p-4">
                    <div className="col-span-12 md:col-span-6">
                      <FormField
                        control={formDeudor.control}
                        name="rentaLiquidaCodeudor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="italic">Renta líquida codeudor</FormLabel>
                            <FormControl>
                              <Input placeholder="0" {...field} onChange={(e) => field.onChange(+e.target.value)} type="number" disabled={load} />
                            </FormControl>
                            <FormDescription className="italic">Opcional</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <FormField
                        control={formDeudor.control}
                        name="otroIngresosCodeudor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="italic">Otros ingresos codeudor (CLP)</FormLabel>
                            <FormControl>
                              <Input placeholder="0" {...field} onChange={(e) => field.onChange(+e.target.value)} type="number" disabled={load} />
                            </FormControl>
                            <FormDescription className="italic">Opcional</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <FormField
                        control={formDeudor.control}
                        name="pagosGastosMensualesCodeudor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="italic">Pagos y gastos mensuales codeudor (CLP)</FormLabel>
                            <FormControl>
                              <Input placeholder="0" {...field} onChange={(e) => field.onChange(+e.target.value)} type="number" disabled={load} />
                            </FormControl>
                            <FormDescription className="italic">Opcional</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <Button variant="secondary" onClick={prevStep} disabled={load}>
                    Anterior
                  </Button>
                  <Button type="submit" variant="destructive" disabled={load}>
                    {load && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                    Simular
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Stepper;
