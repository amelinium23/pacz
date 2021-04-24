import React from "react";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Button,
} from "@material-ui/core";

function createData(number) {
  return { number };
}

const rows = [
  createData("1"),
  createData("2"),
  createData("2"),
  createData("3"),
  createData("4"),
  createData("5"),
  createData("6"),
  createData("7"),
  createData("8"),
  createData("9"),
];

export default function Screening() {
  const [edit, setEdit] = React.useState(false);

  React.useEffect(() => {
    if (edit) {
    }
  }, [edit]);

  return (
    <div class="Screening">
      <Table id="s1">
        <TableHead>
          <TableRow>
            <TableCell>Rząd</TableCell>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <TableCell>{i}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.number}>
              <TableCell component="th" scope="row">
                {row.number}
              </TableCell>
              {[
                <Button id="1" class="button" disabled={true} />,
                <Button id="2" class="button" disabled={true} />,
                <Button id="3" class="button" disabled={true} />,
                <Button id="4" class="button" disabled={true} />,
                <Button id="5" class="button" disabled={true} />,
                <Button id="6" class="button" disabled={true} />,
                <Button id="7" class="button" disabled={true} />,
                <Button id="8" class="button" disabled={true} />,
                <Button id="9" class="button" disabled={true} />,
              ].map((i) => (
                <TableCell>{i}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onPress={() => setEdit(true)}>Zarezerwuj miejsa</Button>
    </div>
  );
}
