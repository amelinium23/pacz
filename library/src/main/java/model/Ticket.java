package model;

public abstract class Ticket {
    private final float price;
    private final Screening screening;
    private final Seat seat;

    public abstract float calculatePrice();

    public Ticket(float price, Screening screening, Seat seat) {
        this.price = price;
        this.screening = screening;
        this.seat = seat;
    }

    public float getPrice() {
        return price;
    }

    public Screening getScreening() {
        return screening;
    }

    public Seat getSeat() {
        return seat;
    }
}
