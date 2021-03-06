package com.pacz.cinema.model.services;

import com.pacz.cinema.exceptions.DuplicateException;
import com.pacz.cinema.exceptions.ScreeningNotFoundException;
import com.pacz.cinema.model.entities.SeatReservation;
import com.pacz.cinema.model.repositories.ScreeningRepository;
import com.pacz.cinema.model.repositories.SeatReservationRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReservationService {
    private final ScreeningRepository screeningRepository;
    private final SeatReservationRepository seatReservationRepository;

    public ReservationService(ScreeningRepository screeningRepository,
                              SeatReservationRepository seatReservationRepository) {
        this.screeningRepository = screeningRepository;
        this.seatReservationRepository = seatReservationRepository;
    }
    
    public List<SeatReservation> getReservationsForScreening(Long screeningId) {
        try {
            var screening = screeningRepository.findById(screeningId);
            if (screening.isPresent()) {
                return seatReservationRepository.getSeatReservationsByScreening(screening.get());
            }
            throw new ScreeningNotFoundException(screeningId);
        } catch(Exception e) {
            return new ArrayList<>();
        }
    }

    public SeatReservation makeReservation(Long screeningId, int row, int seatNumber) {
        var screening = screeningRepository.findById(screeningId);
        if (screening.isPresent()) {
                var seatToReserve = screening.get().getScreeningRoom().getSeat(row, seatNumber);
                var reservationCheck = seatReservationRepository.getSeatReservationBySeatAndScreening(seatToReserve, screening.get());
                if (reservationCheck.isPresent()) {
                    throw new DuplicateException("Seat is alreday taken!");
                }
                return seatReservationRepository.saveAndFlush(new SeatReservation(seatToReserve, screening.get()));
            }
        throw new ScreeningNotFoundException(screeningId);
    }
}
