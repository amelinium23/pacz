package com.pacz.cinema.model.services;

import com.pacz.cinema.exceptions.FilmNotFoundException;
import com.pacz.cinema.model.entities.Film;
import com.pacz.cinema.model.repositories.FilmRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FilmService {
    private final FilmRepository filmRepository;

    public FilmService(FilmRepository filmRepository) {
        this.filmRepository = filmRepository;
    }

    public List<Film> findAllFilms() { return filmRepository.findAll(Sort.by(Sort.Direction.ASC, "id")); }

    public Film getFilmById(Long id) {
        return filmRepository.findById(id).orElseThrow(() -> new FilmNotFoundException(id));
    }

    public Film createFilm(String title, int runtime) {
        return filmRepository.save(new Film(title, runtime));
    }

    public void removeFilm(Long id) {
        var filmToRemove = filmRepository.findById(id);
        filmToRemove.ifPresent(filmRepository::delete);
    }

    public Film updateFilm(String title, int runtime, Long id) {
        var newFilm = new Film(title, runtime);
        return filmRepository.findById(id)
                .map(film -> {
                    film.setTitle(title);
                    film.setLength(runtime);
                    return filmRepository.save(film);
                })
                .orElseGet(() -> {
                    newFilm.setId(id);
                    return filmRepository.save(newFilm);
                });
    }

}
