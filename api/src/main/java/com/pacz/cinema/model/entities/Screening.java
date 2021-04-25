package com.pacz.cinema.model.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonFormat(pattern = "HH:mm")
    private LocalTime beginTime;
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate screeningDate;
    @ManyToOne
    @JoinColumn(name="film_id")
    private Film film;
    @OneToMany(mappedBy = "screening")
    @JsonIgnore
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
