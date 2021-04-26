package com.pacz.cinema.model.entities;

import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import java.util.List;

@Entity
@NoArgsConstructor
public class Normal extends Ticket {
    public Normal(float price, Screening screening, SeatReservation seat) {
        super(price, screening, seat);
    }

    @Override
    public float calculatePrice() {
        return this.getBasePrice();
    }

    @Override
    public List<SeatReservation> getReservedSeats() {
        return List.of(seat);
    }
}
