package com.pacz.cinema.utils;

import com.pacz.cinema.model.entities.*;
import com.pacz.cinema.model.repositories.*;
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
                           SeatReservationRepository reservationRepo, SeatRepository seatRepo) {
        return args -> {
            var pokuj = new ScreeningRoom("Sala 1", 5, 5);
            roomRepo.save(pokuj);
            var film = new Film("Najmanito The Movie", 200);
            filmRepo.save(film);
            var premiera = new Screening(LocalTime.now(), LocalDate.now(), film, pokuj);
            screeningRepo.save(premiera);
            seatRepo.saveAll(pokuj.getSeats());


            ticketRepo.save(new Normal(15.40f, premiera,
                    reservationRepo.save(new SeatReservation(pokuj.getSeat(1, 1), premiera))));
            var group1 = reservationRepo.save(new SeatReservation(pokuj.getSeat(1, 2), premiera));
            var group2 = reservationRepo.save(new SeatReservation(pokuj.getSeat(1, 2), premiera));
            var group3 = reservationRepo.save(new SeatReservation(pokuj.getSeat(1, 3), premiera));
            var group4 = reservationRepo.save(new SeatReservation(pokuj.getSeat(1, 4), premiera));
            var group5 = reservationRepo.save(new SeatReservation(pokuj.getSeat(1, 5), premiera));
            var group6 = reservationRepo.save(new SeatReservation(pokuj.getSeat(2, 1), premiera));


            ticketRepo.save(new Group(15.40f, premiera, List.of(group1, group2, group3, group4, group5, group6), 6));
        };
    }
}
