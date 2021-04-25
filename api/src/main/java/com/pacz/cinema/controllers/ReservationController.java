package com.pacz.cinema.controllers;

import com.pacz.cinema.exceptions.ScreeningNotFoundException;
import com.pacz.cinema.model.entities.SeatReservation;
import com.pacz.cinema.model.services.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ReservationController {
    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping("/reservations")
    public ResponseEntity<List<SeatReservation>> getReservationsForScreening(@RequestParam Long screeningId) {
        try {
            return ResponseEntity.ok(reservationService.getReservationsForScreening(screeningId));
        } catch (ScreeningNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
