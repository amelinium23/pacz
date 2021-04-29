package com.pacz.cinema.controllers;

import com.pacz.cinema.controllers.dto.ScreeningRoomDto;
import com.pacz.cinema.exceptions.ScreeningRoomNotFoundException;
import com.pacz.cinema.model.entities.ScreeningRoom;
import com.pacz.cinema.model.services.ScreeningRoomService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class ScreeningRoomController {
    private final ScreeningRoomService screeningRoomService;
    private final ModelMapper modelMapper;

    public ScreeningRoomController(ScreeningRoomService screeningRoomService, ModelMapper modelMapper) {
        this.screeningRoomService = screeningRoomService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/screeningRooms")
    public List<ScreeningRoomDto> getScreeningRooms() {
        return screeningRoomService.getScreeningRooms()
                .stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @PostMapping("/screeningRooms")
    public ResponseEntity<ScreeningRoomDto> createScreeningRoom(@RequestBody ScreeningRoomDto data) {
        try {
            return new ResponseEntity<>(convertToDto(screeningRoomService.createScreeningRoom(data.getName(), data.getRowNumber(), data.getSeatsInRow()))
                    , HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/screeningRooms/{roomId}")
    public ResponseEntity<ScreeningRoomDto> getScreeningRoomById(@PathVariable Long roomId) {
        try {
            return ResponseEntity.ok(convertToDto(screeningRoomService.getScreeningRoomById(roomId)));
        } catch (ScreeningRoomNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }


    private ScreeningRoomDto convertToDto(ScreeningRoom screeningRoom) {
        return modelMapper.map(screeningRoom, ScreeningRoomDto.class);
    }

}
