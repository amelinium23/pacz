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
    private LocalTime startTime;
    private LocalDate screeningDate;
    @ManyToOne
    @JoinColumn(name="film_id")
    private Film film;
    @OneToMany(mappedBy = "screening", orphanRemoval = true)
    private List<SeatReservation> reservations = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name="ScreeningRoom_id")
    private ScreeningRoom screeningRoom;
    @OneToMany(mappedBy = "screening", orphanRemoval = true)
    private List<Ticket> tickets;

    public Screening(LocalTime startTime, LocalDate screeningDate, Film film, ScreeningRoom screeningRoom) {
        this.startTime = startTime;
        this.screeningDate = screeningDate;
        this.film = film;
        this.screeningRoom = screeningRoom;
    }
}
