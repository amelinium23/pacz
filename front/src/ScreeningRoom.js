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

export default function ScreeningRoom({ number }) {
  const [edit, setEdit] = React.useState(false);
  const [colorButton, setColorButton] = React.useState(true);

  return (
    <div className="Screening">
      <p className="Title">Sala nr.{number}</p>
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
                  key={i}
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
                  <Button
                    id="1"
                    key={1}
                    style={
                      colorButton
                        ? { backgroundColor: "green" }
                        : { backgroundColor: "red" }
                    }
                    onClick={() => setColorButton(!colorButton)}
                  />,
                  <Button
                    id="2"
                    key={2}
                    style={
                      colorButton
                        ? { backgroundColor: "green" }
                        : { backgroundColor: "red" }
                    }
                    onClick={() => setColorButton(!colorButton)}
                  />,
                  <Button
                    id="3"
                    key={3}
                    style={
                      colorButton
                        ? { backgroundColor: "green" }
                        : { backgroundColor: "red" }
                    }
                    onClick={() => setColorButton(!colorButton)}
                  />,
                  <Button
                    id="4"
                    key={4}
                    style={
                      colorButton
                        ? { backgroundColor: "green" }
                        : { backgroundColor: "red" }
                    }
                    onClick={() => setColorButton(!colorButton)}
                  />,
                  <Button
                    id="5"
                    key={5}
                    style={
                      colorButton
                        ? { backgroundColor: "green" }
                        : { backgroundColor: "red" }
                    }
                    onClick={() => setColorButton(!colorButton)}
                  ></Button>,
                  <Button
                    id="6"
                    key={6}
                    style={
                      colorButton
                        ? { backgroundColor: "green" }
                        : { backgroundColor: "red" }
                    }
                    onClick={() => setColorButton(!colorButton)}
                  />,
                  <Button
                    id="7"
                    key={7}
                    style={
                      colorButton
                        ? { backgroundColor: "green" }
                        : { backgroundColor: "red" }
                    }
                    onClick={() => setColorButton(!colorButton)}
                  />,

                  <Button
                    id="8"
                    key={8}
                    style={
                      colorButton
                        ? { backgroundColor: "green" }
                        : { backgroundColor: "red" }
                    }
                    onClick={() => setColorButton(!colorButton)}
                  />,
                  <Button
                    id="9"
                    key={9}
                    style={
                      colorButton
                        ? { backgroundColor: "green" }
                        : { backgroundColor: "red" }
                    }
                    onClick={() => setColorButton(!colorButton)}
                  />,
                ].map((i) => (
                  <TableCell
                    style={{
                      border: "1px solid black",
                      textAlign: "center",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                    key={i}
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
                  key={i}
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
                  <Button id="1" disabled={true} key={1} />,
                  <Button id="2" disabled={true} key={2} />,
                  <Button id="3" disabled={true} key={3} />,
                  <Button id="4" disabled={true} key={4} />,
                  <Button id="5" disabled={true} key={5} />,
                  <Button id="6" disabled={true} key={6} />,
                  <Button id="7" disabled={true} key={7} />,
                  <Button id="8" disabled={true} key={8} />,
                  <Button id="9" disabled={true} key={9} />,
                ].map((i) => (
                  <TableCell
                    id={i}
                    style={{
                      border: "1px solid black",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                    key={i}
                  >
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
