import React from "react";
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  TableBody,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    width: "650px",
    flex: 3,
  },
  container: {
    display: "box",
    alignContent: "center",
    marginLeft: "10%",
    marginTop: "2.5%",
  },
  cell: {
    width: "250px",
  },
});

export default function Screening() {
  const classes = useStyles();
  const [screenings, setScreening] = React.useState([]);

  async function requestScreening() {
    const res = await fetch(`http://localhost:8080/screenings`);
    const json = await res.json();
    console.log(json);
    setScreening(json);
  }

  React.useEffect(() => {
    requestScreening();
  }, []);

  return (
    <div>
      <TableContainer className={classes.container} component={Paper}>
        <Table className={classes.Table}>
          <TableHead>
            <TableRow>
              <TableCell>Film</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Godzina</TableCell>
              <TableCell align="right">Sala</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {screenings.map((i) => (
              <TableRow key={i.id}>
                <TableCell className={classes.cell}>{i.film.title}</TableCell>
                <TableCell className={classes.cell} align="right">
                  {i.screeningDate}
                </TableCell>
                <TableCell className={classes.cell} align="right">
                  {i.startTime}
                </TableCell>
                <TableCell className={classes.cell} align="right">
                  {i.screeningRoom.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
