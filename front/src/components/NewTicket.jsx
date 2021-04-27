import React, { useEffect, useState } from "react";
import axios from "axios";
import { Autocomplete } from "@material-ui/lab";
import { TextField, Paper, Button } from "@material-ui/core";
import FilmSelector from "./FilmSelector.jsx";
import SeatSelector from "./SeatSelector.jsx";
import { ticketTypes } from "./TicketTypes.js";

const NewTicket = () => {
  const ticketBasePrice = 15.4;

  const discounts = [
    {
      name: "Uczeń",
      value: 37,
    },
    {
      name: "Student",
      value: 51,
    },
    {
      name: "Dziecko poniżej 4 lat",
      value: 100,
    },
    {
      name: "Członek sekcji trójboju siłowego PŁ",
      value: 70,
    },
    {
      name: "Członek ONCE",
      value: 100,
    },
  ];
  const [screenings, setScreenings] = useState([]);
  const [selectedTicketType, setSelectedTicketType] = useState(ticketTypes[0]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [selectedScreening, setSelectedScreening] = useState(null);
  const [isSeatSelectorOpen, setIsSelectorOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatCount, setSeatCount] = useState(1);
  const [discount, setDiscount] = useState(discounts[0]);
  const [ticketPrice, setTicketPrice] = useState(ticketBasePrice);

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
    };
    requestScreenings();
  }, [selectedFilm]);

  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <Autocomplete
        id="combo-box-ticket-type"
        disableClearable
        getOptionSelected={(option, value) => option.name === value.name}
        options={ticketTypes}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => {
          setSelectedTicketType(newValue);
          setDiscount(0);
          setSeatCount(1);
          setTicketPrice(newValue.price(ticketBasePrice, seatCount, discount));
        }}
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
        <Autocomplete
          id="combo-box-discount"
          getOptionSelected={(option, value) => option.name === value.name}
          disableClearable
          options={discounts}
          getOptionLabel={(option) => `${option.name} - ${option.value}%`}
          onChange={(event, newValue) => {
            setDiscount(newValue);
            setTicketPrice(
              selectedTicketType.price(ticketBasePrice, seatCount, newValue)
            );
          }}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Zniżka" variant="outlined" required />
          )}
        />
      ) : null}
      {selectedTicketType.seatLimited ? null : (
        <TextField
          value={seatCount}
          id="numberOfSeats"
          label="Liczba miejsc"
          onChange={(e) => {
            setSeatCount(e.target.value);
            setTicketPrice(
              selectedTicketType.price(
                ticketBasePrice,
                e.target.value,
                discount
              )
            );
          }}
          type="number"
        />
      )}
      <FilmSelector setSelectedFilm={setSelectedFilm} />
      <Autocomplete
        id="combo-box-screenings"
        disableClearable
        options={screenings}
        getOptionSelected={(option, value) => option.id === value.id}
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
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
          seatCount={selectedTicketType.seatLimited ? 1 : seatCount}
          screeningRoom={selectedScreening.screeningRoom}
          screening={selectedScreening.id}
        />
      ) : null}
      <Paper>
        <h2>Wybrane siedzenia:</h2>
        {selectedSeats.length ? (
          selectedSeats.map((seat) => (
            <p
              key={`row${seat.row}-seat${seat.seat}`}
            >{`Rząd ${seat.row}, Miejsce ${seat.seat}`}</p>
          ))
        ) : (
          <p>Wybierz siedzenia</p>
        )}
      </Paper>
      <p>
        Cena ostateczna:{" "}
        {Number.isNaN(ticketPrice) ? "Wybierz zniżkę" : ticketPrice.toFixed(2)}{" "}
        zł
      </p>
      <Button
        onClick={async () => {
          await selectedTicketType.onSubmit(
            selectedSeats,
            ticketBasePrice,
            selectedScreening,
            seatCount,
            discount
          );
        }}
        disabled={
          !selectedTicketType.allDataInserted(
            selectedSeats.length,
            ticketBasePrice,
            selectedScreening,
            seatCount,
            discount
          )
        }
      >
        Zatwierdź zakup
      </Button>
    </div>
  );
};

export default NewTicket;
