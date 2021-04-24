package com.pacz.cinema.model.repositories;

import com.pacz.cinema.model.entities.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
}

