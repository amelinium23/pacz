import {
  makeStyles,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  TableBody,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    width: "650px",
  },
  container: {
    display: "flex",
    alignSelf: "center",
  },
  cell: {
    width: "250px",
  },
});

const ScreeningTable = ({ screenings }) => {
  const classes = useStyles();
  return (
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
  );
};

export default ScreeningTable;
