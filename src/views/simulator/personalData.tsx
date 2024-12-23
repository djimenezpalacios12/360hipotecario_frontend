import { useAppSelector } from "@/store/hooks";
import CardTable from "@/components/cardTable";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const personalData = () => {
  const { nombreCliente, numeroUnidad, nombreProyecto, rut, telefonoCliente, emailCliente, ejecutivoComercial } = useAppSelector(
    (state) => state.simulator.simulator
  );

  return (
    <CardTable title="Datos Personales">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="text-left text-lg font-light">Nombre del Proyecto</TableCell>
            <TableCell className="text-right text-lg font-medium">{nombreProyecto}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-left text-lg font-light">Número de la unidad</TableCell>
            <TableCell className="text-right text-lg font-medium">{numeroUnidad}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-left text-lg font-light">Nombre del Cliente</TableCell>
            <TableCell className="text-right text-lg font-medium">{nombreCliente}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-left text-lg font-light">RUT del cliente</TableCell>
            <TableCell className="text-right text-lg font-medium">{rut}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-left text-lg font-light">Teléfono del cliente</TableCell>
            <TableCell className="text-right text-lg font-medium">{telefonoCliente}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-left text-lg font-light">Email del cliente</TableCell>
            <TableCell className="text-right text-lg font-medium">{emailCliente}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-left text-lg font-light">Ejecutivo comercial</TableCell>
            <TableCell className="text-right text-lg font-medium">{ejecutivoComercial}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardTable>
  );
};

export default personalData;
