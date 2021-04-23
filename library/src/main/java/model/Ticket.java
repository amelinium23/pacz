package model;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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
    private SeatReservation seat;

    public abstract float calculatePrice();

    public Ticket(float basePrice, Screening screening, SeatReservation seat) {
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
