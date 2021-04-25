import React from "react";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Button,
} from "@material-ui/core";
import "./Screening.css";

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
  const [counter, set] = React.useState(0);

  return (
    <div class="Screening">
      {edit ? (
        <Table
          id="s1"
          style={{ border: "3px solid black", borderCollapse: "collapse" }}
        >
          <TableHead
            style={{
              border: "1px solid black",
              textAlign: "center",
            }}
          >
            <TableRow>
              <TableCell
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Rząd
              </TableCell>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <TableCell
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {i}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.number}
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {row.number}
                </TableCell>
                {[
                  <Button id="1" />,
                  <Button id="2" />,
                  <Button id="3" />,
                  <Button id="4" />,
                  <Button id="5" />,
                  <Button id="6" />,
                  <Button id="7" />,
                  <Button id="8" />,
                  <Button id="9" />,
                ].map((i) => (
                  <TableCell
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    {i}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Table
          id="s1"
          style={{ border: "3px solid black", borderCollapse: "collapse" }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Rząd
              </TableCell>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <TableCell
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {i}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody style={{ border: "1px solid black" }}>
            {rows.map((row) => (
              <TableRow
                key={row.number}
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {row.number}
                </TableCell>
                {[
                  <Button id="1" disabled={true} />,
                  <Button id="2" disabled={true} />,
                  <Button id="3" disabled={true} />,
                  <Button id="4" disabled={true} />,
                  <Button id="5" disabled={true} />,
                  <Button id="6" disabled={true} />,
                  <Button id="7" disabled={true} />,
                  <Button id="8" disabled={true} />,
                  <Button id="9" disabled={true} />,
                ].map((i) => (
                  <TableCell
                    id={i}
                    style={{
                      border: "1px solid black",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    {console.log(document.getElementById("1"))}
                    {i}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Button
        id="reserve"
        onClick={() => {
          edit ? setEdit(false) : setEdit(true);
        }}
      >
        Wybierz miescja
      </Button>
      <Button id="submit" onClick={() => console.log("jestem tutaj")}>
        Zarezerwuj
      </Button>
    </div>
  );
}
