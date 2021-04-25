package com.pacz.cinema.exceptions;

public class ScreeningNotFoundException extends RuntimeException {
    public ScreeningNotFoundException(Long id) {
        super("No Screening found with id = " + id);
    }
}
