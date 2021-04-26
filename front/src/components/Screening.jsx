import React from "react";
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  TableBody,
  Paper,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import NewScreeningForm from "./NewScreeningForm.jsx";

const useStyles = makeStyles({
  table: {
    width: "650px",
  },
  container: {
    display: "flex",
    alignSelf: "center",
    margin: "0% 25%",
  },
  cell: {
    width: "250px",
  },
  button: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
  },
});

export default function Screening() {
  const classes = useStyles();
  const [screenings, setScreenings] = React.useState([]);
  const [formOpen, setFormOpen] = React.useState(false);

  async function requestScreening() {
    const res = await axios.get(`http://localhost:8080/screenings`);
    setScreenings(res.data);
  }

  React.useEffect(() => {
    requestScreening();
  }, []);

  return (
    <div>
      <Button
        className={classes.button}
        color="primary"
        onClick={() => setFormOpen(!formOpen)}
      >
        Zaplanuj seans
      </Button>
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
      <NewScreeningForm
        open={formOpen}
        setOpen={setFormOpen}
        newScreeningHandler={(newScreening) =>
          setScreenings([...screenings, newScreening])
        }
      />
    </div>
  );
}
