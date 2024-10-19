import { useAppSelector } from "@/store/hooks";
import CardTable from "@/components/cardTable";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface CreditDataInterface {
  pieInicialValue: number;
  montoCreditoValue: number;
}

const CreditData: React.FC<CreditDataInterface> = ({ pieInicialValue, montoCreditoValue }) => {
  const { valorPropdiedad, plazo, tasaInteresAnual } = useAppSelector((state) => state.simulator.simulator);

  return (
    <CardTable title="Datos del Crédito">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="text-left font-light">Valor de la propiedad</TableCell>
            <TableCell className="text-right font-medium">{valorPropdiedad.toFixed(2)} UF</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-left font-light">Pie inicial</TableCell>
            <TableCell className="text-right font-medium">
              {(pieInicialValue * 100).toFixed(2)}% <span className="font-light text-xs">({(valorPropdiedad * pieInicialValue).toFixed(2)} UF)</span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-left font-light">Monto del crédito</TableCell>
            <TableCell className="text-right font-medium">{montoCreditoValue.toFixed(2)} UF</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-left font-light">Plazo</TableCell>
            <TableCell className="text-right font-medium">{plazo} Años</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-left font-light">Tasa de interés</TableCell>
            <TableCell className="text-right font-medium">{tasaInteresAnual.toFixed(2)} %</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardTable>
  );
};

export default CreditData;
