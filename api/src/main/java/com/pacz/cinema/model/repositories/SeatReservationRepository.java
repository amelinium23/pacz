package com.pacz.cinema.model.repositories;

import com.pacz.cinema.model.entities.Screening;
import com.pacz.cinema.model.entities.Seat;
import com.pacz.cinema.model.entities.SeatReservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SeatReservationRepository extends JpaRepository<SeatReservation, Long> {
    List<SeatReservation> getSeatReservationsByScreening(Screening screening);
    Optional<SeatReservation> getSeatReservationBySeat(Seat seat);
}

