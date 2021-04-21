package model;

public class Discounted extends Ticket {
    public float discount;

    public Discounted(float price, Screening screening, Seat seat, float discount) {
        super(price, screening, seat);
        this.discount = discount;
    }

    @Override
    public float calculatePrice() {
        return discount * super.getPrice();
    }
}
