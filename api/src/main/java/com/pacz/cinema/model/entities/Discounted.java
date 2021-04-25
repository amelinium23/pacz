package com.pacz.cinema.model.entities;

import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;

@Entity
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Discounted extends Ticket {
    private int discountPercent;

    public Discounted(float price, Screening screening, SeatReservation seat, int discountPercent) {
        super(price, screening, seat);
        this.discountPercent = discountPercent;
    }

    @Override
    public float calculatePrice() {
        return 0.01f * discountPercent * super.getBasePrice();
    }

    @Override
    public String toString() {
        return super.toString() + ", type=Discounted, discount=" + discountPercent + '}';
    }
}
