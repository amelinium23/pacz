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
      <TableContainer component={Paper}>
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
                <TableCell align="right">{i.film.title}</TableCell>
                <TableCell align="right">{i.screeningDate}</TableCell>
                <TableCell align="right">{i.startTime}</TableCell>
                <TableCell align="right">{i.screeningRoom.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
