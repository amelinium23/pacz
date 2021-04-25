package com.pacz.cinema.controllers;

import com.pacz.cinema.controllers.requestbody.FilmForm;
import com.pacz.cinema.exceptions.FilmNotFoundException;
import com.pacz.cinema.model.entities.Film;
import com.pacz.cinema.model.services.FilmService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class FilmController {
    private final FilmService filmService;

    public FilmController(FilmService filmService) {
        this.filmService = filmService;
    }

    @GetMapping("/films")
    public List<Film> getAllFilms() {
        return filmService.findAllFilms();
    }

    @PostMapping("/films")
    public ResponseEntity<Film> createFilm(@RequestBody FilmForm data) {
        return new ResponseEntity<>(filmService.createFilm(data.getTitle(), data.getLength()), HttpStatus.CREATED);
    }

    @GetMapping("/films/{filmId}")
    public ResponseEntity<Film> getFilmInfo(@PathVariable Long filmId) {
        try {
            return ResponseEntity.ok(filmService.getFilmById(filmId));
        } catch (FilmNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/films/{filmId}")
    public void removeFilm(@PathVariable Long filmId) {
        filmService.removeFilm(filmId);
    }

    @PutMapping("/films/{filmId}")
    public ResponseEntity<Film> updateFilmInfo(@RequestBody FilmForm data, @PathVariable Long filmId) {
        return ResponseEntity.ok(filmService.updateFilm(data.getTitle(), data.getLength(), filmId));
    }

}
