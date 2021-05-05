/* eslint-disable @typescript-eslint/no-unused-vars */
// A lot of unused vars here, but I wanted to make the price method universal for all ticket types
import axios from "axios";
import { Seat, Screening } from "./APIResponseTypes";
interface Discount {
  name: string;
  value: number;
}
interface SubmitData {
  selectedSeats: Seat[];
  ticketBasePrice: number;
  selectedScreening: Screening;
  seatCount: number;
  discount: Discount;
}
interface PriceCalculationData {
  ticketBasePrice: number;
  seatCount: number;
  discount: Discount;
}
interface RequiredData {
  selectedSeats: Seat[];
  ticketBasePrice: number;
  selectedScreening: Screening;
  seatCount?: number;
  discount?: Discount;
}
export const ticketTypes = [
  {
    name: "Normalny",
    seatLimited: true,
    price: ({
      ticketBasePrice: basePrice,
      seatCount,
      discount,
    }: PriceCalculationData): number => basePrice,
    onSubmit: async ({
      selectedSeats,
      ticketBasePrice,
      selectedScreening,
      seatCount,
      discount,
    }: SubmitData): Promise<void> => {
      if (!selectedSeats.length) {
        alert("Nie zaznaczono siedzenia");
        return;
      }
      await axios.post("http://localhost:8080/tickets/normal", {
        price: ticketBasePrice,
        screeningId: selectedScreening.id,
        row: selectedSeats[0].seatRow,
        seat: selectedSeats[0].seatNumber,
      });
      window.location.reload(false); // UGLY
    },
    allDataInserted: ({
      selectedSeats,
      ticketBasePrice,
      selectedScreening,
    }: RequiredData): boolean => {
      return !!selectedSeats.length && !!ticketBasePrice && !!selectedScreening;
    },
  },
  {
    name: "Ulgowy",
    seatLimited: true,
    price: ({
      ticketBasePrice: basePrice,
      seatCount,
      discount,
    }: PriceCalculationData): number => {
      return basePrice - 0.01 * discount.value * basePrice;
    },
    onSubmit: async ({
      selectedSeats,
      ticketBasePrice,
      selectedScreening,
      seatCount,
      discount,
    }: SubmitData): Promise<void> => {
      if (!selectedSeats.length) {
        alert("Nie zaznaczono siedzenia");
        return;
      }
      await axios.post("http://localhost:8080/tickets/discounted", {
        price: ticketBasePrice,
        screeningId: selectedScreening.id,
        discount: discount.value,
        row: selectedSeats[0].seatRow,
        seat: selectedSeats[0].seatNumber,
      });
      window.location.reload(false); // UGLY!
    },
    allDataInserted: ({
      selectedSeats,
      ticketBasePrice,
      selectedScreening,
      seatCount,
      discount,
    }: RequiredData): boolean => {
      return (
        !!selectedSeats.length &&
        !!ticketBasePrice &&
        !!selectedScreening &&
        !!discount
      );
    },
  },
  {
    name: "Grupowy",
    seatLimited: false,
    price: ({
      ticketBasePrice: basePrice,
      seatCount,
      discount,
    }: PriceCalculationData): number => {
      if (seatCount > 3) {
        if (seatCount > 5) {
          return 0.7 * basePrice * seatCount;
        }
        return 0.85 * basePrice * seatCount;
      }
      return seatCount * basePrice;
    },
    onSubmit: async ({
      selectedSeats,
      ticketBasePrice,
      selectedScreening,
      seatCount,
      discount,
    }: SubmitData): Promise<void> => {
      if (selectedSeats.length != seatCount) {
        alert("Nie wybrano wszystkich siedzeń");
        return;
      }
      await axios.post("http://localhost:8080/tickets/group", {
        price: ticketBasePrice,
        screeningId: selectedScreening.id,
        seats: selectedSeats.map((seat) => [seat.seatRow, seat.seatNumber]),
      });
      window.location.reload(false);
    },
    allDataInserted: ({
      selectedSeats,
      ticketBasePrice,
      selectedScreening,
      seatCount,
      discount,
    }: RequiredData): boolean => {
      return (
        selectedSeats.length === seatCount &&
        !!ticketBasePrice &&
        !!selectedScreening &&
        !!seatCount
      );
    },
  },
];
