package com.pacz.cinema.model.entities;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Inheritance
@Data
@NoArgsConstructor
public abstract class Ticket {
    @Id
    @GeneratedValue
    private Long id;
    private float basePrice;
    @ManyToOne
    private Screening screening;
    @OneToOne
    protected SeatReservation seat;

    public abstract float calculatePrice();
    public abstract List<SeatReservation> getReservedSeats();

    protected Ticket(float basePrice, Screening screening, SeatReservation seat) {
        this.basePrice = basePrice;
        this.screening = screening;
        this.seat = seat;
    }

    @Override
    public String toString() {
        return "Ticket{" +
                "price=" + calculatePrice() +
                ", screening=" + screening +
                ", seat=" + seat;
    }
}
