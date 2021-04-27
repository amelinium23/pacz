import React, { useEffect, useState } from "react";
import axios from "axios";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import FilmSelector from "./FilmSelector.jsx";
import SeatSelector from "./SeatSelector.jsx";

const NewTicket = () => {
  const ticketBasePrice = 15.4;
  const ticketTypes = [
    {
      name: "Normalny",
      seatLimited: true,
      price: (basePrice) => basePrice,
    },
    {
      name: "Ulgowy",
      seatLimited: true,
      price: (basePrice) => basePrice - 0.01 * discount * basePrice,
    },
    {
      name: "Grupowy",
      seatLimited: false,
      price: (basePrice) => {
        if (seatCount > 3) {
          if (seatCount > 5) {
            return 0.7 * basePrice * seatCount;
          }
          return 0.85 * basePrice * seatCount;
        }
        return seatCount * basePrice;
      },
    },
  ];
  const [screenings, setScreenings] = useState([]);
  const [selectedTicketType, setSelectedTicketType] = useState(ticketTypes[0]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [selectedScreening, setSelectedScreening] = useState(null);
  const [isSeatSelectorOpen, setIsSelectorOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatCount, setSeatCount] = useState(1);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const requestScreenings = async () => {
      if (selectedFilm === null) {
        return;
      }
      const json = await axios.get(
        `http://localhost:8080/screenings?filmId=${selectedFilm.id}`
      );
      setScreenings(json.data);
      if (json.data.length) {
        setSelectedScreening(json.data[0]);
      }
      console.log(selectedTicketType);
      console.log(selectedScreening);
      console.log(selectedSeats);
    };
    requestScreenings();
  }, [selectedFilm]);

  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <Autocomplete
        id="combo-box-ticket-type"
        options={ticketTypes}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => setSelectedTicketType(newValue)}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Typ biletu"
            variant="outlined"
            required
          />
        )}
      />
      {selectedTicketType.name === "Ulgowy" ? (
        <TextField
          id="discount"
          label="Zniżka"
          onChange={(e) => setDiscount(e.target.value)}
        />
      ) : null}
      {selectedTicketType.seatLimited ? null : (
        <TextField
          id="numberOfSeats"
          label="Liczba miejsc"
          onChange={(e) => setSeatCount(e.target.value)}
          type="number"
        />
      )}
      <FilmSelector setSelectedFilm={setSelectedFilm} />
      <Autocomplete
        id="combo-box-screenings"
        options={screenings}
        getOptionLabel={(option) =>
          `${option.screeningDate} ${option.startTime}`
        }
        onChange={(event, newValue) => {
          if (!isSeatSelectorOpen) {
            setIsSelectorOpen(true);
          }
          setSelectedScreening(newValue);
        }}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Seans" variant="outlined" required />
        )}
      />
      {isSeatSelectorOpen ? (
        <SeatSelector
          setSelectedSeats={setSelectedSeats}
          seatCount={seatCount}
          screeningRoom={selectedScreening.screeningRoom}
        />
      ) : null}
      <p>{ticketBasePrice}</p>
    </div>
  );
};

export default NewTicket;
