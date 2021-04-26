package com.pacz.cinema.controllers;

import com.pacz.cinema.controllers.dto.ScreeningDto;
import com.pacz.cinema.model.entities.Screening;
import com.pacz.cinema.model.services.ScreeningService;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class ScreeningController {
    private final ScreeningService screeningService;
    private final ModelMapper modelMapper;

    public ScreeningController(ScreeningService screeningService, ModelMapper modelMapper) {
        this.screeningService = screeningService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/screenings")
    public ResponseEntity<List<ScreeningDto>> getAllScreenings(@RequestParam(required = false) String date,
                                            @RequestParam(required = false) Long filmId) {
        try {
            if (date != null) {
                var parsedDate = LocalDate.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
                return ResponseEntity.ok(screeningService.getScreeningsByDate(parsedDate).
                        stream().map(this::convertToDto).collect(Collectors.toList()));
            } else if (filmId != null) {
                return ResponseEntity.ok(screeningService.getScreeningsByFilm(filmId).
                        stream().map(this::convertToDto).collect(Collectors.toList()));
            } else {
                return ResponseEntity.ok(screeningService.getAllScreenings()
                        .stream().map(this::convertToDto).collect(Collectors.toList()));
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/screenings")
    public ResponseEntity<ScreeningDto> createNewScreening(@RequestBody ScreeningDto data) {
        try {
            var time = LocalTime.parse(data.getStartTime());
            var startingDate = LocalDate.parse(data.getScreeningDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            return ResponseEntity.ok(convertToDto(screeningService.createScreening(startingDate, time, data.getFilmId(),
                    data.getScreeningRoomId())));
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    private ScreeningDto convertToDto(Screening screening) {
        var screeningDto = modelMapper.map(screening, ScreeningDto.class);
        screeningDto.setScreeningDate(screening.getScreeningDate());
        screeningDto.setStartTime(screening.getStartTime());
        return screeningDto;
    }



}
