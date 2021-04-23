package model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class SeatReservation {
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    @JoinColumn(name="seat_id")
    private Seat seat;
    @ManyToOne
    @JoinColumn(name="screening_id")
    private Screening screening;



}
