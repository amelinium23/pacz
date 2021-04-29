package com.pacz.cinema.model.services;

import com.pacz.cinema.exceptions.ScreeningRoomNotFoundException;
import com.pacz.cinema.model.entities.ScreeningRoom;
import com.pacz.cinema.model.entities.Seat;
import com.pacz.cinema.model.repositories.ScreeningRoomRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;


@Service
public class ScreeningRoomService {
    private final ScreeningRoomRepository screeningRoomRepository;

    public ScreeningRoomService(ScreeningRoomRepository screeningRoomRepository) {
        this.screeningRoomRepository = screeningRoomRepository;
    }

    public ScreeningRoom getScreeningRoomById(Long id) {
        return screeningRoomRepository.findById(id).orElseThrow(() -> new ScreeningRoomNotFoundException(id));
    }


    public List<ScreeningRoom> getScreeningRooms() {
        return screeningRoomRepository.findAll();
    }

    public ScreeningRoom createScreeningRoom(String name, int rows, int seatsInRow) {
        var screeningRoom = new ScreeningRoom(name, rows, seatsInRow);
        var seats = new ArrayList<Seat>();
        for (var i = 1; i <= screeningRoom.getRowNumber(); i++) {
            for (var j = 1; j <= screeningRoom.getSeatsInRow(); j++) {
                seats.add(new Seat(i, j, screeningRoom));
            }
        }
        screeningRoom.setSeats(seats);
        screeningRoomRepository.save(screeningRoom);
        return screeningRoom;
    }

}
