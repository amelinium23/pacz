import React, { useEffect, useState } from "react";
import Seat from "../components/Seat.jsx";
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
    try {
      const json = await axios.get(
        `http://localhost:8080/reservations?screeningId=${screening}`
      );
      setTakenSeats(json.data);
    } catch (err) {
      alert("Błąd przy pobieraniu rezerwacji");
    }
  };
  const isTaken = (row, seatNumber) => {
    return takenSeats.find(
      (seat) => seat.seatRow === row && seat.seatNumber === seatNumber
    );
  };
  const assignColor = (row, seatNumber) => {
    if (
      takenSeats.find(
        (seat) => seat.seatRow === row && seat.seatNumber === seatNumber
      )
    ) {
      return "disabled";
    } else if (
      selectedSeats.find((seat) => seat.row === row && seat.seat === seatNumber)
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
    getReservations();
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
              takenSeats={takenSeats}
              selectedSeats={selectedSeats}
              handlePress={handlePress}
              isTaken={isTaken(i + 1, j + 1)}
              color={assignColor(i + 1, j + 1)}
              seatInfo={{
                row: i + 1,
                seat: j + 1,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SeatSelector;
