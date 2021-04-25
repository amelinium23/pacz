package com.pacz.cinema.controllers;

import com.pacz.cinema.controllers.requestbody.ScreeningRoomForm;
import com.pacz.cinema.exceptions.ScreeningRoomNotFoundException;
import com.pacz.cinema.model.entities.ScreeningRoom;
import com.pacz.cinema.model.services.ScreeningRoomService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ScreeningRoomController {
    private final ScreeningRoomService screeningRoomService;

    public ScreeningRoomController(ScreeningRoomService screeningRoomService) {
        this.screeningRoomService = screeningRoomService;
    }

    @GetMapping("/screeningRooms")
    public List<ScreeningRoom> getScreeningRooms() {
        return screeningRoomService.getScreeningRooms();
    }

    @PostMapping("/screeningRooms")
    public ResponseEntity<ScreeningRoom> createScreeningRoom(@RequestBody ScreeningRoomForm data) {
        try {
            return new ResponseEntity<>(screeningRoomService.createScreeningRoom(data.getName(), data.getRows(), data.getSeatsInRow())
                    , HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/screeningRooms/{roomId}")
    public ResponseEntity<ScreeningRoom> getScreeningRoomById(@PathVariable Long roomId) {
        try {
            return ResponseEntity.ok(screeningRoomService.getScreeningRoomById(roomId));
        } catch (ScreeningRoomNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/screeningRooms/{roomId}")
    public void removeFilm(@PathVariable Long roomId) {
        screeningRoomService.deleteScreeningRoom(roomId);
    }


}
