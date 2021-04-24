package com.pacz.cinema.model.repositories;

import com.pacz.cinema.model.entities.SeatReservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatReservationRepository extends JpaRepository<SeatReservation, Long> {
}

