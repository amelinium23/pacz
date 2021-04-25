package com.pacz.cinema.exceptions;

public class FilmNotFoundException extends RuntimeException {
    public FilmNotFoundException(Long id) {
        super("No film found with id = " + id);
    }
}
