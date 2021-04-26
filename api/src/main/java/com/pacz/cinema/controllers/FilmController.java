package com.pacz.cinema.controllers;

import com.pacz.cinema.controllers.dto.FilmDto;
import com.pacz.cinema.exceptions.FilmNotFoundException;
import com.pacz.cinema.model.entities.Film;
import com.pacz.cinema.model.services.FilmService;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class FilmController {
    private final FilmService filmService;
    private final ModelMapper modelMapper;

    public FilmController(FilmService filmService, ModelMapper modelMapper) {
        this.filmService = filmService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/films")
    public List<FilmDto> getAllFilms() {
        return filmService.findAllFilms().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @PostMapping("/films")
    @ResponseStatus(HttpStatus.CREATED)
    public FilmDto createFilm(@RequestBody FilmDto data) {
        return convertToDto(filmService.createFilm(data.getTitle(), data.getLength()));
    }

    @GetMapping("/films/{filmId}")
    public ResponseEntity<FilmDto> getFilmInfo(@PathVariable Long filmId) {
        try {
            return ResponseEntity.ok(convertToDto(filmService.getFilmById(filmId)));
        } catch (FilmNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/films/{filmId}")
    public void removeFilm(@PathVariable Long filmId) {
        filmService.removeFilm(filmId);
    }

    @PutMapping("/films/{filmId}")
    public FilmDto updateFilmInfo(@RequestBody FilmDto data, @PathVariable Long filmId) {
        return convertToDto(filmService.updateFilm(data.getTitle(), data.getLength(), filmId));
    }

    private FilmDto convertToDto(Film film) {
        return modelMapper.map(film, FilmDto.class);
    }

}
