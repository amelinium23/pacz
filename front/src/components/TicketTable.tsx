import {
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  TableBody,
  Paper,
  makeStyles,
} from "@material-ui/core";
import { Ticket } from "../utils/APIResponseTypes";

const useStyles = makeStyles({
  table: {
    marginRight: "30px",
    marginTop: "2%",
  },
  container: {
    display: "flex",
    alignSelf: "center",
  },
  cell: {
    width: "210px",
  },
});

const TicketTable = ({ tickets }: { tickets: Ticket[] }): JSX.Element => {
  const classes = useStyles();
  return (
    <TableContainer className={classes.table} component={Paper}>
      <TableHead>
        <TableRow>
          <TableCell className={classes.cell} align="center">
            Ilość miejsc
          </TableCell>
          <TableCell className={classes.cell} align="center">
            Cena
          </TableCell>
          <TableCell className={classes.cell} align="center">
            Film
          </TableCell>
          <TableCell className={classes.cell} align="center">
            Data seansu
          </TableCell>
          <TableCell className={classes.cell} align="center">
            Godzina rozpoczęcia
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tickets.map((i: Ticket) => (
          <TableRow key={i.id}>
            <TableCell className={classes.cell} align="center">
              {i.reservedSeats.length}
            </TableCell>
            <TableCell className={classes.cell} align="center">
              {i.price.toFixed(2)} zł
            </TableCell>
            <TableCell className={classes.cell} align="center">
              {i.screening.film.title}
            </TableCell>
            <TableCell className={classes.cell} align="center">
              {i.screening.screeningDate}
            </TableCell>
            <TableCell className={classes.cell} align="center">
              {i.screening.startTime}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
};

export default TicketTable;
