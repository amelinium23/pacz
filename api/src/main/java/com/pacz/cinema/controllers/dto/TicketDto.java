package com.pacz.cinema.controllers.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@NoArgsConstructor
@Setter
public class TicketDto {
    private Long id;
    private float price;
    private Long screeningId;
    private ScreeningDto screening;
    private List<SeatReservationDto> reservedSeats;

    public void setPrice(float price) {
        this.price = price;
    }

    public TicketDto(List<SeatReservationDto> reservedSeats) {
        this.reservedSeats = reservedSeats;
    }
}
