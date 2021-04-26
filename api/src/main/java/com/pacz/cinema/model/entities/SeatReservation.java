package com.pacz.cinema.model.entities;

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
    public SeatReservation(Seat seat, Screening screening) {
        this.seat = seat;
        this.screening = screening;
    }

}
