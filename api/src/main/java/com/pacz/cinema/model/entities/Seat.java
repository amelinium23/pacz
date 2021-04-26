package com.pacz.cinema.model.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Seat {
    @Id
    @GeneratedValue
    private Long id;
    private int row;
    private int number;
    @ManyToOne
    @JoinColumn(name="screeningRoom_id")
    private ScreeningRoom screeningRoom;

    @OneToMany(mappedBy = "seat")
    private List<SeatReservation> reservations = new ArrayList<>();

    public Seat(int row, int number, ScreeningRoom screeningRoom) {
        this.row = row;
        this.number = number;
        this.screeningRoom = screeningRoom;
    }
}
