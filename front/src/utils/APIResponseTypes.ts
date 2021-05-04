export interface Film {
  id: number;
  title: string;
  length: number;
}

export interface Screening {
  id: number;
  screeningRoomId: number;
  filmId: number;
  film: Film;
  screeningRoom: ScreeningRoom;
  screeningDate: string;
  startTime: string;
}

export interface ScreeningRoom {
  id: number;
  name: string;
  rowNumber: number;
  seatsInRow: number;
}

export interface Ticket {
  id: number;
  price: number;
  screeningId: number;
  screening: Screening;
  reservedSeats: Seat[];
}

export interface Seat {
  seatRow: number;
  seatNumber: number;
}
