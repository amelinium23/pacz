import { Seat } from "../utils/APIResponseTypes";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: {
    margin: "auto",
    padding: "1.25%",
    borderRadius: "15px",
  },
  text: {
    margin: "1.25% 1.25%",
  },
}));

const SelectedSeatsList = ({
  selectedSeats,
}: {
  selectedSeats: Seat[];
}): JSX.Element => {
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <h2 className={classes.text}>Wybrane siedzenia:</h2>
      {selectedSeats.length ? (
        selectedSeats.map((seat) => (
          <p
            className={classes.text}
            key={`row${seat.seatRow}-seat${seat.seatNumber}`}
          >{`Rząd ${seat.seatRow}, Miejsce ${seat.seatNumber}`}</p>
        ))
      ) : (
        <p className={classes.text}>Wybierz siedzenia</p>
      )}
    </Paper>
  );
};

export default SelectedSeatsList;
