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
    marginTop: "10px",
    width: "84.5%",
  },
  container: {
    display: "flex",
    alignSelf: "center",
  },
  cell: {
    width: "auto",
  },
});

const TicketTable = ({ tickets }: { tickets: Ticket[] }): JSX.Element => {
  const classes = useStyles();
  return (
    <TableContainer className={classes.table} component={Paper}>
      <TableHead>
        <TableRow>
          <TableCell>Ilość miejsc</TableCell>
          <TableCell align="right">Cena</TableCell>
          <TableCell align="right">Film</TableCell>
          <TableCell align="right">Data seansu</TableCell>
          <TableCell align="right">Godzina rozpoczęcia</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tickets.map((i: Ticket) => (
          <TableRow key={i.id}>
            <TableCell>{i.reservedSeats.length}</TableCell>
            <TableCell>{i.price.toFixed(2)} zł</TableCell>
            <TableCell align="right">{i.screening.film.title}</TableCell>
            <TableCell align="right">{i.screening.screeningDate}</TableCell>
            <TableCell align="right">{i.screening.startTime}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
};

export default TicketTable;
