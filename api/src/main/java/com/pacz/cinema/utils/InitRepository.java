package com.pacz.cinema.utils;

import com.pacz.cinema.model.repositories.*;
import com.pacz.cinema.model.services.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Configuration
public class InitRepository {
    @Bean
    CommandLineRunner init(TicketRepository ticketRepo, FilmRepository filmRepo,
                           ScreeningRepository screeningRepo, ScreeningRoomRepository roomRepo,
                           SeatReservationRepository reservationRepo) {
        var filmService = new FilmService(filmRepo);
        var reservationService = new ReservationService(screeningRepo, reservationRepo);
        var screeningRoomService = new ScreeningRoomService(roomRepo);
        var screeningService = new ScreeningService(screeningRepo, roomRepo, filmRepo);
        var ticketService = new TicketService(ticketRepo, screeningRepo, reservationService);
        return args -> {
            var pokuj = screeningRoomService.createScreeningRoom("Sala 1", 5, 5);
            var film = filmService.createFilm("Najmanito the Movie", 200);
            var premiera = screeningService.createScreening(LocalDate.now(), LocalTime.now(), film.getId(), pokuj.getId());
            ticketService.createNormalTicket(15.40f, premiera.getId(), 1, 1);
            var seats = List.of(new int[]{1, 2}, new int[]{1, 3},
            new int[]{1, 4}, new int[]{1, 5}, new int[]{2, 1}, new int[]{2, 2});
            ticketService.createGroupTicket(15.40f, seats.size(), seats, premiera.getId());
        };
    }
}
