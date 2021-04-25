package com.pacz.cinema.model.services;

import com.pacz.cinema.exceptions.FilmNotFoundException;
import com.pacz.cinema.exceptions.ScreeningRoomNotFoundException;
import com.pacz.cinema.model.entities.Screening;
import com.pacz.cinema.model.repositories.FilmRepository;
import com.pacz.cinema.model.repositories.ScreeningRepository;
import com.pacz.cinema.model.repositories.ScreeningRoomRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class ScreeningService {
    private final ScreeningRepository screeningRepository;
    private final ScreeningRoomRepository screeningRoomRepository;
    private final FilmRepository filmRepository;

    public ScreeningService(ScreeningRepository screeningRepository,
                            ScreeningRoomRepository screeningRoomRepository, FilmRepository filmRepository) {
        this.screeningRepository = screeningRepository;
        this.screeningRoomRepository = screeningRoomRepository;
        this.filmRepository = filmRepository;
    }

    public List<Screening> getScreeningsByDate(LocalDate date) {
        return screeningRepository.getScreeningsByScreeningDate(date);
    }

    public List<Screening> getScreeningsByFilm(Long filmId) {
        return screeningRepository.getScreeningsByFilm_Id(filmId);
    }


    public List<Screening> getAllScreenings() {
        return screeningRepository.findAll();
    }

    public Screening createScreening(LocalDate screeningDate, LocalTime startTime, Long filmId, Long screeningRoomId) {
        try {
        var film = filmRepository.findById(filmId);
        var screeningRoom = screeningRoomRepository.findById(screeningRoomId);
        if (film.isPresent()) {
            if (screeningRoom.isPresent()) {
                return screeningRepository.save(new Screening(startTime, screeningDate, film.get(), screeningRoom.get()));
            }
            throw new ScreeningRoomNotFoundException(screeningRoomId);
        }
        throw new FilmNotFoundException(filmId);
        } catch(Exception e) {
            return null;
        }
    }
}
