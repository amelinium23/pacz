import { useEffect, useState } from "react";
import axios from "axios";
import { Autocomplete } from "@material-ui/lab";
import { TextField, Button } from "@material-ui/core";
import FilmSelector from "./FilmSelector";
import SeatSelector from "./SeatSelector";
import ScreeningAutocomplete from "../components/ScreeningAutocomplete";
import { ticketTypes } from "../utils/TicketTypes";
import { Screening, Seat, Film } from "../utils/APIResponseTypes";
import SelectedSeatsList from "../components/SelectedSeatsList";

const NewTicket = (): JSX.Element => {
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
  const [screenings, setScreenings] = useState([] as Screening[]);
  const [selectedTicketType, setSelectedTicketType] = useState(ticketTypes[0]);
  const [selectedFilm, setSelectedFilm] = useState(null as Film | null);
  const [selectedScreening, setSelectedScreening] = useState(
    null as Screening | null
  );
  const [isSeatSelectorOpen, setIsSelectorOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([] as Seat[]);
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
          setDiscount(discounts[0]);
          setSeatCount(1);
          setTicketPrice(
            newValue.price({
              ticketBasePrice: ticketBasePrice,
              seatCount: seatCount,
              discount: discount,
            })
          );
        }}
        style={{ width: "auto", marginTop: "1.5%" }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Typ biletu"
            variant="outlined"
            required
          />
        )}
      />
      {selectedTicketType.name === "Ulgowy" && (
        <Autocomplete
          id="combo-box-discount"
          getOptionSelected={(option, value) => option.name === value.name}
          disableClearable
          options={discounts}
          getOptionLabel={(option) => `${option.name} - ${option.value}%`}
          onChange={(event, newValue) => {
            setDiscount(newValue);
            setTicketPrice(
              selectedTicketType.price({
                ticketBasePrice: ticketBasePrice,
                seatCount: seatCount,
                discount: newValue,
              })
            );
          }}
          style={{ width: "auto", marginTop: "1.5%" }}
          renderInput={(params) => (
            <TextField {...params} label="Zniżka" variant="outlined" required />
          )}
        />
      )}
      {!selectedTicketType.seatLimited && (
        <TextField
          value={seatCount}
          id="numberOfSeats"
          label="Liczba miejsc"
          onChange={(e) => {
            setSeatCount(parseInt(e.target.value) || 0);
            setTicketPrice(
              selectedTicketType.price({
                ticketBasePrice: ticketBasePrice,
                seatCount: parseInt(e.target.value) || 0,
                discount: discount,
              })
            );
          }}
          type="number"
        />
      )}
      <FilmSelector setSelectedFilm={setSelectedFilm} />
      <ScreeningAutocomplete
        screenings={screenings}
        isSeatSelectorOpen={isSeatSelectorOpen}
        setIsSelectorOpen={setIsSelectorOpen}
        setSelectedScreening={setSelectedScreening}
      />
      {isSeatSelectorOpen && selectedScreening && (
        <SeatSelector
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
          seatCount={selectedTicketType.seatLimited ? 1 : seatCount}
          screeningRoom={selectedScreening.screeningRoom}
          screening={selectedScreening}
        />
      )}
      <SelectedSeatsList selectedSeats={selectedSeats} />
      <p>
        Cena ostateczna:{" "}
        {Number.isNaN(ticketPrice) ? "Wybierz zniżkę" : ticketPrice.toFixed(2)}{" "}
        zł
      </p>
      <Button
        onClick={async () => {
          selectedScreening &&
            (await selectedTicketType.onSubmit({
              selectedSeats: selectedSeats,
              ticketBasePrice: ticketBasePrice,
              selectedScreening: selectedScreening,
              seatCount: seatCount,
              discount: discount,
            }));
        }}
        disabled={
          !!selectedScreening &&
          !selectedTicketType.allDataInserted({
            selectedSeats: selectedSeats,
            ticketBasePrice: ticketBasePrice,
            selectedScreening: selectedScreening,
            seatCount: seatCount,
            discount: discount,
          })
        }
      >
        Zatwierdź zakup
      </Button>
    </div>
  );
};

export default NewTicket;
