package com.pacz.cinema.controllers;

import com.pacz.cinema.controllers.dto.*;
import com.pacz.cinema.exceptions.DuplicateException;
import com.pacz.cinema.exceptions.ScreeningNotFoundException;
import com.pacz.cinema.model.entities.Ticket;
import com.pacz.cinema.model.services.TicketService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class TicketController {
    private final TicketService ticketService;
    private final ModelMapper modelMapper;

    public TicketController(TicketService ticketService, ModelMapper modelMapper) {
        this.ticketService = ticketService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/tickets")
    public ResponseEntity<List<TicketDto>> getTicketsForScreening(@RequestParam Long screeningId) {
        try {
            return ResponseEntity.ok(ticketService.getTicketsForScreening(screeningId)
                    .stream().map(this::convertToDto).collect(Collectors.toList()));
        } catch (ScreeningNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/tickets/normal")
    public ResponseEntity<TicketDto> createNormalTicket(@RequestBody NormalTicketDto data) {
        try {
            return ResponseEntity.ok(convertToDto(ticketService.createNormalTicket(data.getPrice(), data.getScreeningId(),
                    data.getRow(), data.getSeat())));
        } catch (ScreeningNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (DuplicateException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/tickets/group")
    public ResponseEntity<TicketDto> createGroupTicket(@RequestBody GroupTicketDto data) {
        try {
            return ResponseEntity.ok(convertToDto(ticketService.createGroupTicket(data.getPrice(), data.getSeats().size(),
                    data.getSeats(), data.getScreeningId())));
        } catch (ScreeningNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (DuplicateException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/tickets/discounted")
    public ResponseEntity<TicketDto> createDiscountedTicket(@RequestBody DiscountedTicketDto data) {
        try {
            return ResponseEntity.ok(convertToDto(ticketService.createDiscountedTicket(data.getPrice(), data.getDiscount(),
                    data.getScreeningId(), data.getRow(), data.getSeat())));
        } catch (ScreeningNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (DuplicateException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    private TicketDto convertToDto(Ticket ticket) {
        var ticketDto = modelMapper.map(ticket, TicketDto.class);
        ticketDto.setPrice(ticket.calculatePrice());
        ticketDto.setReservedSeats(ticket.getReservedSeats()
                .stream().map(seat -> modelMapper.map(seat, SeatReservationDto.class))
                .collect(Collectors.toList()));
        return ticketDto;
    }


}
