package model;

public class Group extends Ticket {
    public Group(float price, Screening screening, Seat seat, int numberOfPeople) {
        super(price, screening, seat);
        this.numberOfPeople = numberOfPeople;
    }

    private final int numberOfPeople;
    @Override
    public float calculatePrice() {
        if (numberOfPeople > 3) {
            if (numberOfPeople > 5) {
                return 0.7f * super.getPrice() * numberOfPeople;
            }
            return 0.85f * super.getPrice() * numberOfPeople;
        }
        return  numberOfPeople * super.getPrice();
    }
}
