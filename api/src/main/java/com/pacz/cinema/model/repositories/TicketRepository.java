package com.pacz.cinema.model.repositories;

import com.pacz.cinema.model.entities.Screening;
import com.pacz.cinema.model.entities.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> getTicketsByScreening(Screening screening);
}

