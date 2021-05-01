import EventSeatIcon from "@material-ui/icons/EventSeat";
import IconButton from "@material-ui/core/IconButton";
const Seat = ({ handlePress, isTaken, color, seatInfo }) => {
  const { row, seat } = seatInfo;
  return (
    <IconButton
      aria-label="seat"
      onClick={() => {
        handlePress(row, seat);
      }}
      disabled={isTaken}
    >
      <EventSeatIcon style={{ fontSize: 80 }} color={color} />
    </IconButton>
  );
};

export default Seat;
