/* eslint-disable no-unused-vars */
// A lot of unused vars here, but I wanted to make the price method universal for all ticket types
import axios from "axios";
export const ticketTypes = [
  {
    name: "Normalny",
    seatLimited: true,
    price: (basePrice, seatCount, discount) => basePrice,
    onSubmit: async (
      selectedSeats,
      ticketBasePrice,
      selectedScreening,
      seatCount,
      discount
    ) => {
      if (!selectedSeats.length) {
        alert("Nie zaznaczono siedzenia");
        return;
      }
      await axios.post("http://localhost:8080/tickets/normal", {
        price: ticketBasePrice,
        screeningId: selectedScreening.id,
        row: selectedSeats[0].row,
        seat: selectedSeats[0].seat,
      });
      window.location.reload(false); // UGLY
    },
    allDataInserted: (selectedSeats, ticketBasePrice, selectedScreening) => {
      return selectedSeats && ticketBasePrice && selectedScreening;
    },
  },
  {
    name: "Ulgowy",
    seatLimited: true,
    price: (basePrice, seatCount, discount) => {
      return basePrice - 0.01 * discount.value * basePrice;
    },
    onSubmit: async (
      selectedSeats,
      ticketBasePrice,
      selectedScreening,
      seatCount,
      discount
    ) => {
      if (!selectedSeats.length) {
        alert("Nie zaznaczono siedzenia");
        return;
      }
      await axios.post("http://localhost:8080/tickets/discounted", {
        price: ticketBasePrice,
        screeningId: selectedScreening.id,
        discount: discount.value,
        row: selectedSeats[0].row,
        seat: selectedSeats[0].seat,
      });
      window.location.reload(false); // UGLY!
    },
    allDataInserted: (
      selectedSeats,
      ticketBasePrice,
      selectedScreening,
      seatCount,
      discount
    ) => {
      return selectedSeats && ticketBasePrice && selectedScreening && discount;
    },
  },
  {
    name: "Grupowy",
    seatLimited: false,
    price: (basePrice, seatCount, discount) => {
      if (seatCount > 3) {
        if (seatCount > 5) {
          return 0.7 * basePrice * seatCount;
        }
        return 0.85 * basePrice * seatCount;
      }
      return seatCount * basePrice;
    },
    onSubmit: async (
      selectedSeats,
      ticketBasePrice,
      selectedScreening,
      seatCount,
      discount
    ) => {
      if (selectedSeats.length != seatCount) {
        alert("Nie wybrano wszystkich siedzeń");
        return;
      }
      await axios.post("http://localhost:8080/tickets/group", {
        price: ticketBasePrice,
        screeningId: selectedScreening.id,
        seats: selectedSeats.map((seat) => [seat.row, seat.seat]),
      });
      window.location.reload(false);
    },
    allDataInserted: (
      selectedSeats,
      ticketBasePrice,
      selectedScreening,
      seatCount,
      discount
    ) => {
      return selectedSeats && ticketBasePrice && selectedScreening && seatCount;
    },
  },
];
