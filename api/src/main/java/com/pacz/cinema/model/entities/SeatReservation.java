package com.pacz.cinema.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    private Screening screening;
    public SeatReservation(Seat seat, Screening screening) {
        this.seat = seat;
        this.screening = screening;
    }

}
