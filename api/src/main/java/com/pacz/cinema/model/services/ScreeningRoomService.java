package com.pacz.cinema.model.services;

import com.pacz.cinema.exceptions.DuplicateException;
import com.pacz.cinema.exceptions.ScreeningRoomNotFoundException;
import com.pacz.cinema.model.entities.ScreeningRoom;
import com.pacz.cinema.model.repositories.ScreeningRoomRepository;
import com.pacz.cinema.model.repositories.SeatRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScreeningRoomService {
    private ScreeningRoomRepository screeningRoomRepository;
    private SeatRepository seatRepository;

    public ScreeningRoomService(ScreeningRoomRepository screeningRoomRepository, SeatRepository seatRepository) {
        this.screeningRoomRepository = screeningRoomRepository;
        this.seatRepository = seatRepository;
    }

    public ScreeningRoom getScreeningRoomByName(String name) {
        return screeningRoomRepository.getScreeningRoomsByName(name)
                .orElseThrow(() -> new ScreeningRoomNotFoundException(name));
    }

    public List<ScreeningRoom> getScreeningRooms() {
        return screeningRoomRepository.findAll();
    }

    public ScreeningRoom createScreeningRoom(String name, int rows, int seatsInRow) throws DuplicateException {
        try {
            screeningRoomRepository.getScreeningRoomsByName(name);
            throw new DuplicateException("Room with this name already exists");
        } catch (ScreeningRoomNotFoundException e) {
            return screeningRoomRepository.save(new ScreeningRoom(name, rows, seatsInRow));
        }
    }

    public void deleteScreeningRoom(String name) {
        try {
            var screeningRoom = getScreeningRoomByName(name);
            screeningRoomRepository.delete(screeningRoom);
        } catch (ScreeningRoomNotFoundException ignored) {}
    }
}
