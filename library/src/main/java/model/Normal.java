package model;

public class Normal extends Ticket {
    public Normal(float price, Screening screening, Seat seat) {
        super(price, screening, seat);
    }

    @Override
    public float calculatePrice() {
        return this.getPrice();
    }
}
