package com.pacz.cinema.controllers.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@NoArgsConstructor
@Getter
@Setter
public class ScreeningDto {
    private Long id;
    private Long screeningRoomId;
    private Long filmId;
    private FilmDto film;
    private ScreeningRoomDto screeningRoom;
    private String screeningDate;
    private String startTime;

    public void setScreeningDate(LocalDate screeningDate) {
        this.screeningDate = screeningDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime.format(DateTimeFormatter.ofPattern("HH:mm"));
    }
}
