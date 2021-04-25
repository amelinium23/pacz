package com.pacz.cinema.controllers;

import com.pacz.cinema.controllers.requestbody.ScreeningForm;
import com.pacz.cinema.model.entities.Screening;
import com.pacz.cinema.model.services.ScreeningService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
public class ScreeningController {
    private final ScreeningService screeningService;

    public ScreeningController(ScreeningService screeningService) {
        this.screeningService = screeningService;
    }

    @GetMapping("/screenings")
    public ResponseEntity<List<Screening>> getAllScreenings(@RequestParam(required = false) String date,
                                            @RequestParam(required = false) Long filmId) {
        try {
            if (date != null) {
                var parsedDate = LocalDate.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
                return ResponseEntity.ok(screeningService.getScreeningsByDate(parsedDate));
            } else if (filmId != null) {
                return ResponseEntity.ok(screeningService.getScreeningsByFilm(filmId));
            } else {
                return ResponseEntity.ok(screeningService.getAllScreenings());
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/screenings")
    public ResponseEntity<Screening> createNewScreening(@RequestBody ScreeningForm data) {
        try {
            var time = LocalTime.parse(data.getStartTime());
            var startingDate = LocalDate.parse(data.getScreeningDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            return ResponseEntity.ok(screeningService.createScreening(startingDate, time, data.getFilmId(),
                    data.getScreeningRoomId()));
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


}
