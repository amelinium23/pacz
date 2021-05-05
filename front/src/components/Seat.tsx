import EventSeatIcon from "@material-ui/icons/EventSeat";
import IconButton from "@material-ui/core/IconButton";
import { Seat as SeatType } from "../utils/APIResponseTypes";
interface IProps {
  handlePress: (clickedSeat: SeatType) => void;
  isTaken: boolean;
  color: "disabled" | "primary" | "secondary";
  seatInfo: SeatType;
}
const Seat = ({
  handlePress,
  isTaken,
  color,
  seatInfo,
}: IProps): JSX.Element => {
  return (
    <IconButton
      aria-label="seat"
      onClick={() => {
        handlePress(seatInfo);
      }}
      disabled={isTaken}
    >
      <EventSeatIcon style={{ fontSize: 80 }} color={color} />
    </IconButton>
  );
};

export default Seat;
