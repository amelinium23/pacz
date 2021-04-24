package model;

import lombok.NoArgsConstructor;

import javax.persistence.Entity;

@Entity
@NoArgsConstructor
public class Discounted extends Ticket {
    private float discount;

    public void setDiscount(float discount) {
        this.discount = discount;
    }

    public Discounted(float price, Screening screening, SeatReservation seat, float discount) {
        super(price, screening, seat);
        this.discount = discount;
    }

    @Override
    public float calculatePrice() {
        return discount * super.getBasePrice();
    }

    @Override
    public String toString() {
        return super.toString() + ", type=Discounted, discount=" + discount + '}';
    }
}
