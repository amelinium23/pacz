import {
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableContainer,
  TableBody,
  Paper,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    width: "100%",
  },
  divcontainer: {
    width: "100%",
  },
  tablecontainer: {
    width: "50%",
    margin: "auto",
  },
  cell: {
    width: "300px",
  },
});

const ScreeningRoomTable = ({ screeningRooms }) => {
  const classes = useStyles();
  return (
    <TableContainer className={classes.tablecontainer} component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Nazwa</TableCell>
            <TableCell align="right">Liczba rzędów</TableCell>
            <TableCell align="right" style={{ width: "200px" }}>
              Liczba miejsc w rzędzie
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {screeningRooms.map((i) => (
            <TableRow key={i.id}>
              <TableCell className={classes.cell}>{i.name}</TableCell>
              <TableCell className={classes.cell} align="right">
                {i.rowNumber}
              </TableCell>
              <TableCell className={classes.cell} align="right">
                {i.seatsInRow}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ScreeningRoomTable;
