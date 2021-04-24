package com.pacz.cinema.exceptions;

public class ScreeningRoomNotFoundException extends RuntimeException {
    public ScreeningRoomNotFoundException(Long id) {
        super("No Screening Room found with id = " + id);
    }

    public ScreeningRoomNotFoundException(String name) {
        super("No Screening Room found with name = " + name);
    }
}
