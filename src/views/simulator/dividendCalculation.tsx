import CardTable from "@/components/cardTable";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface DividendCalcutationInterface {
  montoCreditoValue: number;
  tasaMensual: number;
  plazoMeses: number;
  seguroDesgravamen: number;
  seguroIncendioSismo: number;
}

const DividendCalcutation: React.FC<DividendCalcutationInterface> = ({
  montoCreditoValue,
  tasaMensual,
  plazoMeses,
  seguroDesgravamen,
  seguroIncendioSismo,
}) => {
  // Dividendo
  const dividendoBase = (montoCreditoValue * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazoMeses));
  const dividendoTotal = dividendoBase + seguroDesgravamen + seguroIncendioSismo;

  return (
    <CardTable title="Cálculo del Dividendo">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="text-left font-light">Dividendo base</TableCell>
            <TableCell className="text-right font-medium">{dividendoBase.toFixed(2)} UF</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-left font-light">Total seguros</TableCell>
            <TableCell className="text-right font-medium">{(seguroDesgravamen + seguroIncendioSismo).toFixed(2)} UF</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-left font-light">Dividendo Total mensual</TableCell>
            <TableCell className="text-right font-medium">{dividendoTotal.toFixed(2)} UF</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardTable>
  );
};

export default DividendCalcutation;
