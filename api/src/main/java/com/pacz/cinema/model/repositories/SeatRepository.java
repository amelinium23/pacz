package com.pacz.cinema.model.repositories;

import com.pacz.cinema.model.entities.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatRepository extends JpaRepository<Seat, Long> {
}
