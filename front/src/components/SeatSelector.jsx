import React, { useState } from "react";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import IconButton from "@material-ui/core/IconButton";

const SeatSelector = ({ setSelectedSeats, seatCount, screeningRoom }) => {
  const [selectedSeat, setSelectedSeat] = useState({});
  console.log(setSelectedSeats);
  console.log(seatCount);
  console.log(screeningRoom);
  return (
    <div>
      {[...Array(screeningRoom.rowNumber).keys()].map((i) => (
        <div key={`row${i + 1}`} style={{ display: "flex" }}>
          {[...Array(screeningRoom.seatsInRow).keys()].map((j) => (
            <IconButton
              aria-label="seat"
              key={`row${i + 1}-seat${j + 1}`}
              onClick={() => {
                setSelectedSeat({
                  row: i + 1,
                  seat: j + 1,
                });
                console.log(selectedSeat);
              }}
            >
              <EventSeatIcon
                style={{ fontSize: 80 }}
                color={
                  selectedSeat.row === i + 1 && selectedSeat.seat === j + 1
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
