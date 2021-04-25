package com.pacz.cinema.model.services;

import com.pacz.cinema.model.entities.Film;
import com.pacz.cinema.model.repositories.FilmRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FilmService {
    private final FilmRepository filmRepository;

    public FilmService(FilmRepository filmRepository) {
        this.filmRepository = filmRepository;
    }

    public List<Film> findAllFilms() { return filmRepository.findAll(); }

    public Film createFilm(String title, int runtime) {
        return filmRepository.save(new Film(title, runtime));
    }

    public void removeFilm(Long id) {
        var filmToRemove = filmRepository.findById(id);
        filmToRemove.ifPresent(filmRepository::delete);
    }

}
