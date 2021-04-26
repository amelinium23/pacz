package com.pacz.cinema.controllers;

import com.pacz.cinema.controllers.dto.SeatReservationDto;
import com.pacz.cinema.exceptions.ScreeningNotFoundException;
import com.pacz.cinema.model.entities.SeatReservation;
import com.pacz.cinema.model.services.ReservationService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class ReservationController {
    private final ReservationService reservationService;
    private final ModelMapper modelMapper;

    public ReservationController(ReservationService reservationService, ModelMapper modelMapper) {
        this.reservationService = reservationService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/reservations")
    public ResponseEntity<List<SeatReservationDto>> getReservationsForScreening(@RequestParam Long screeningId) {
        try {
            return ResponseEntity.ok(reservationService.getReservationsForScreening(screeningId)
                    .stream().map(this::convertToDto).collect(Collectors.toList()));
        } catch (ScreeningNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    private SeatReservationDto convertToDto(SeatReservation seatReservation) {
        return modelMapper.map(seatReservation, SeatReservationDto.class);
    }
}
