package com.pacz.cinema.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    private ScreeningRoom screeningRoom;

    @OneToMany(mappedBy = "seat")
    @JsonIgnore
    private List<SeatReservation> reservations = new ArrayList<>();

    public Seat(int row, int number) {
        this.row = row;
        this.number = number;
    }

    public Seat(int row, int number, ScreeningRoom screeningRoom) {
        this.row = row;
        this.number = number;
        this.screeningRoom = screeningRoom;
    }
}
