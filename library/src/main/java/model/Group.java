package model;

import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
@NoArgsConstructor
public class Group extends Ticket {
    public Group(float price, Screening screening, List<SeatReservation> seats, int numberOfPeople) {
        super(price, screening, seats.get(0));
        this.numberOfPeople = numberOfPeople;
        this.seats = seats;
    }

    private int numberOfPeople;
    @OneToMany
    private List<SeatReservation> seats;
    @Override
    public float calculatePrice() {
        if (numberOfPeople > 3) {
            if (numberOfPeople > 5) {
                return 0.7f * super.getBasePrice() * numberOfPeople;
            }
            return 0.85f * super.getBasePrice() * numberOfPeople;
        }
        return  numberOfPeople * super.getBasePrice();
    }
}
