import { Seat } from "../utils/APIResponseTypes";
import { Paper } from "@material-ui/core";

const SelectedSeatsList = ({
  selectedSeats,
}: {
  selectedSeats: Seat[];
}): JSX.Element => {
  return (
    <Paper>
      <h2>Wybrane siedzenia:</h2>
      {selectedSeats.length ? (
        selectedSeats.map((seat) => (
          <p
            key={`row${seat.seatRow}-seat${seat.seatNumber}`}
          >{`Rząd ${seat.seatRow}, Miejsce ${seat.seatNumber}`}</p>
        ))
      ) : (
        <p>Wybierz siedzenia</p>
      )}
    </Paper>
  );
};

export default SelectedSeatsList;
