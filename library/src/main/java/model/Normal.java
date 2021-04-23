package model;

import lombok.NoArgsConstructor;

import javax.persistence.Entity;

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
}
