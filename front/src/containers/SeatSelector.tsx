import { useEffect, useState } from "react";
import Seat from "../components/Seat";
import axios from "axios";
import {
  Seat as SeatType,
  Screening,
  ScreeningRoom,
} from "../utils/APIResponseTypes";

interface IProps {
  selectedSeats: SeatType[];
  setSelectedSeats: (newSeats: SeatType[]) => void;
  seatCount: number;
  screeningRoom: ScreeningRoom;
  screening: Screening;
}

const SeatSelector = ({
  selectedSeats,
  setSelectedSeats,
  seatCount,
  screeningRoom,
  screening,
}: IProps): JSX.Element => {
  const [takenSeats, setTakenSeats] = useState([] as SeatType[]);
  const handlePress = ({ seatRow, seatNumber }: SeatType) => {
    if (
      selectedSeats.find(
        (selectedSeat) =>
          selectedSeat.seatRow === seatRow &&
          selectedSeat.seatNumber === seatNumber
      )
    ) {
      return;
    }
    if (selectedSeats.length >= seatCount) {
      setSelectedSeats([
        ...selectedSeats.slice(1),
        { seatRow: seatRow, seatNumber: seatNumber },
      ]);
    } else {
      setSelectedSeats([
        ...selectedSeats,
        { seatRow: seatRow, seatNumber: seatNumber },
      ]);
    }
  };
  const getReservations = async () => {
    try {
      const json = await axios.get(
        `http://localhost:8080/reservations?screeningId=${screening.id}`
      );
      setTakenSeats(json.data);
    } catch (err) {
      alert("Błąd przy pobieraniu rezerwacji");
    }
  };
  const isTaken = ({ seatRow, seatNumber }: SeatType) => {
    return !!takenSeats.find(
      (seat) => seat.seatRow === seatRow && seat.seatNumber === seatNumber
    );
  };
  const assignColor = ({ seatRow, seatNumber }: SeatType) => {
    if (
      takenSeats.find(
        (seat) => seat.seatRow === seatRow && seat.seatNumber === seatNumber
      )
    ) {
      return "disabled";
    } else if (
      selectedSeats.find(
        (seat) => seat.seatRow === seatRow && seat.seatNumber === seatNumber
      )
    ) {
      return "primary";
    } else {
      return "secondary";
    }
  };
  useEffect(() => {
    setSelectedSeats([]);
  }, [seatCount, setSelectedSeats]);
  useEffect(() => {
    void getReservations();
    setSelectedSeats([]);
    // eslint-disable-next-line
  }, [screening]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {[...Array(screeningRoom.rowNumber).keys()].map((i) => (
        <div key={`row${i + 1}`} style={{ display: "flex" }}>
          {[...Array(screeningRoom.seatsInRow).keys()].map((j) => (
            <Seat
              key={`row${i + 1}-seat${j + 1}`}
              handlePress={handlePress}
              isTaken={isTaken({ seatRow: i + 1, seatNumber: j + 1 })}
              color={assignColor({ seatRow: i + 1, seatNumber: j + 1 })}
              seatInfo={{
                seatRow: i + 1,
                seatNumber: j + 1,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SeatSelector;
