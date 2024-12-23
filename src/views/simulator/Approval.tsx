import { useAppSelector } from "@/store/hooks";
import CardTable from "@/components/cardTable";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface ApprobalProps {
  uf: number | undefined;
  montoCreditoValue: number;
  tasaMensual: number;
  plazoMeses: number;
  seguroDesgravamen: number;
  seguroIncendioSismo: number;
}

const Approval: React.FC<ApprobalProps> = ({ uf, montoCreditoValue, tasaMensual, plazoMeses, seguroDesgravamen, seguroIncendioSismo }) => {
  const {
    rentaLiquidaDeudor,
    rentaLiquidaCodeudor,
    otroIngresosDeudor,
    otroIngresosCodeudor,
    pagosGastosMensualesDeudor,
    pagosGastosMensualesCodeudor,
  } = useAppSelector((state) => state.simulator.simulator);

  // Rentas (dedudor + codeuor)
  const rentaLiquida = rentaLiquidaDeudor + rentaLiquidaCodeudor;
  const otroIngresos = otroIngresosDeudor + otroIngresosCodeudor;
  const pagosGastosMensuales = pagosGastosMensualesDeudor + pagosGastosMensualesCodeudor;

  const valorUF = uf || 0;
  const totalDisponibleDeudor = (rentaLiquida + otroIngresos - pagosGastosMensuales) / valorUF;
  const dividendoBase = (montoCreditoValue * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazoMeses));

  // Dividendo
  const dividendoTotal = dividendoBase + seguroDesgravamen + seguroIncendioSismo;

  // Cálculo de la probabilidad de aprobación
  let porcentajeMaximo;
  if (totalDisponibleDeudor <= 1200) {
    porcentajeMaximo = 0.25;
  } else if (totalDisponibleDeudor <= 2200) {
    porcentajeMaximo = 0.3;
  } else {
    porcentajeMaximo = 0.33;
  }

  const dividendoMaximoAprobado = totalDisponibleDeudor * porcentajeMaximo;
  const ratioUso = (dividendoTotal / dividendoMaximoAprobado) * 100;

  // Probabilidad aprobación
  let probabilidadAprobacion;
  if (ratioUso <= 30) {
    probabilidadAprobacion = "100%";
  } else if (ratioUso <= 60) {
    probabilidadAprobacion = "80%";
  } else if (ratioUso <= 90) {
    probabilidadAprobacion = "60%";
  } else if (ratioUso <= 100) {
    probabilidadAprobacion = "40%";
  } else if (ratioUso <= 110) {
    probabilidadAprobacion = "20%";
  } else {
    probabilidadAprobacion = "0%";
  }

  return (
    <CardTable title="Probabilidad de Aprobación">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="text-left text-lg">Total disponible para evaluar</TableCell>
            <TableCell className="text-right text-lg font-medium">{totalDisponibleDeudor.toFixed(2)} UF</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-left text-lg">Porcentaje máximo de uso dividendo</TableCell>
            <TableCell className="text-right text-lg font-medium">{porcentajeMaximo * 100} %</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-left text-lg">Dividendo máximo aprobado</TableCell>
            <TableCell className="text-right text-lg font-medium">{dividendoMaximoAprobado.toFixed(2)} UF</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-left text-lg">Ratio de uso</TableCell>
            <TableCell className="text-right text-lg font-medium">{ratioUso.toFixed(2)} %</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-left text-lg">Probabilidad de aprobación</TableCell>
            <TableCell className="text-right text-lg font-medium">{probabilidadAprobacion}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardTable>
  );
};

export default Approval;
