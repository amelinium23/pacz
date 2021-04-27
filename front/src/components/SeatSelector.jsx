import React, { useEffect, useState } from "react";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";

const SeatSelector = ({
  selectedSeats,
  setSelectedSeats,
  seatCount,
  screeningRoom,
  screening,
}) => {
  const [takenSeats, setTakenSeats] = useState([]);
  const handlePress = (row, seat) => {
    if (
      selectedSeats.find(
        (selectedSeat) => selectedSeat.row === row && selectedSeat.seat === seat
      )
    ) {
      return;
    }
    if (selectedSeats.length >= seatCount) {
      setSelectedSeats([...selectedSeats.slice(1), { row: row, seat: seat }]);
    } else {
      setSelectedSeats([...selectedSeats, { row: row, seat: seat }]);
    }
  };
  const getReservations = async () => {
    const json = await axios.get(
      `http://localhost:8080/reservations?screeningId=${screening}`
    );
    setTakenSeats(json.data);
    console.log(takenSeats);
  };
  useEffect(() => {
    setSelectedSeats([]);
  }, [seatCount, setSelectedSeats]);
  useEffect(() => {
    getReservations();
    setSelectedSeats([]);
  }, [screening]);
  return (
    <div>
      {[...Array(screeningRoom.rowNumber).keys()].map((i) => (
        <div key={`row${i + 1}`} style={{ display: "flex" }}>
          {[...Array(screeningRoom.seatsInRow).keys()].map((j) => (
            <IconButton
              aria-label="seat"
              key={`row${i + 1}-seat${j + 1}`}
              onClick={() => {
                handlePress(i + 1, j + 1);
              }}
              disabled={takenSeats.find(
                (seat) => seat.seatRow === i + 1 && seat.seatNumber === j + 1
              )}
            >
              <EventSeatIcon
                style={{ fontSize: 80 }}
                color={
                  takenSeats.find(
                    (seat) =>
                      seat.seatRow === i + 1 && seat.seatNumber === j + 1
                  )
                    ? "disabled"
                    : selectedSeats.find(
                        (seat) => seat.row === i + 1 && seat.seat === j + 1
                      )
                    ? "primary"
                    : "secondary"
                }
              />
            </IconButton>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SeatSelector;
