package com.pacz.cinema.model.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Screening {
    @Id
    @GeneratedValue
    private Long id;
    private LocalTime beginTime;
    private LocalDate screeningDate;
    @ManyToOne
    @JoinColumn(name="film_id")
    private Film film;
    @OneToMany(mappedBy = "screening")
    private List<SeatReservation> reservations = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name="ScreeningRoom_id")
    private ScreeningRoom screeningRoom;

    public Screening(LocalTime beginTime, LocalDate screeningDate, Film film, ScreeningRoom screeningRoom) {
        this.beginTime = beginTime;
        this.screeningDate = screeningDate;
        this.film = film;
        this.screeningRoom = screeningRoom;
    }
}
