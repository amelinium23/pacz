package com.pacz.cinema.model.entities;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
public class ScreeningRoom {
    @Id
    @GeneratedValue
    private Long id;
    @Column(unique = true)
    private String name;
    private int rowNumber;
    private int seatsInRow;
    @OneToMany(mappedBy = "screeningRoom", cascade = CascadeType.ALL)
    private List<Screening> screenings = new ArrayList<>();
    @OneToMany(mappedBy = "screeningRoom", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Seat> seats;

    public ScreeningRoom(String name, int rowNumber, int seatsInRow) {
        this.name = name;
        this.rowNumber = rowNumber;
        this.seatsInRow = seatsInRow;
    }

    public Seat getSeat(int row, int number) {
        return seats.stream().filter(seat -> row == seat.getRow() && number == seat.getNumber()).findAny().orElse(null);
    }
}
