package com.pacz.cinema.model.services;

import com.pacz.cinema.exceptions.ScreeningNotFoundException;
import com.pacz.cinema.model.entities.*;
import com.pacz.cinema.model.repositories.ScreeningRepository;
import com.pacz.cinema.model.repositories.TicketRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TicketService {
    private final TicketRepository ticketRepository;
    private final ScreeningRepository screeningRepository;
    private final ReservationService reservationService;

    public TicketService(TicketRepository ticketRepository, ScreeningRepository screeningRepository,
                         ReservationService reservationService) {
        this.ticketRepository = ticketRepository;
        this.screeningRepository = screeningRepository;
        this.reservationService = reservationService;
    }

    public Ticket createNormalTicket(float price, Long screeningId, int row, int column) {
        var reservation = reservationService.makeReservation(screeningId, row, column);
        var screening = screeningRepository.findById(screeningId);
        return ticketRepository.save(new Normal(price, screening.get(), reservation));
    }

    public Ticket createDiscountedTicket(float price, int discount, Long screeningId, int row, int column) {
        var reservation = reservationService.makeReservation(screeningId, row, column);
        var screening = screeningRepository.findById(screeningId);
        return ticketRepository.save(new Discounted(price, screening.get(), reservation, discount));

    }

    public Ticket createGroupTicket(float price, int numberOfPeople, List<int[]> seats, Long screeningId) {
        var reservations = seats.stream().map(seat -> reservationService
                    .makeReservation(screeningId, seat[0], seat[1])).collect(Collectors.toList());
        var screening = screeningRepository.findById(screeningId);
        return ticketRepository.save(new Group(price, screening.get(), reservations, numberOfPeople));
    }

    public List<Ticket> getTicketsForScreening(Long screeningId) {
        var screening = screeningRepository.findById(screeningId);
        if (screening.isPresent()) {
            return ticketRepository.getTicketsByScreening(screening.get());
        }
        throw new ScreeningNotFoundException(screeningId);
    }
}
