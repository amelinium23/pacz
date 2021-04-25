package com.pacz.cinema.controllers;

import com.pacz.cinema.controllers.requestbody.DiscountedTicketForm;
import com.pacz.cinema.controllers.requestbody.GroupTicketForm;
import com.pacz.cinema.controllers.requestbody.NormalTicketForm;
import com.pacz.cinema.exceptions.DuplicateException;
import com.pacz.cinema.exceptions.ScreeningNotFoundException;
import com.pacz.cinema.model.entities.Ticket;
import com.pacz.cinema.model.services.TicketService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TicketController {
    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping("/tickets")
    public ResponseEntity<List<Ticket>> getTicketsForScreening(@RequestParam Long screeningId) {
        try {
            return ResponseEntity.ok(ticketService.getTicketsForScreening(screeningId));
        } catch (ScreeningNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/tickets/normal")
    public ResponseEntity<Ticket> createNormalTicket(@RequestBody NormalTicketForm data) {
        try {
            return ResponseEntity.ok(ticketService.createNormalTicket(data.getBasePrice(), data.getScreeningId(),
                    data.getRow(), data.getSeat()));
        } catch (ScreeningNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (DuplicateException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/tickets/group")
    public ResponseEntity<Ticket> createGroupTicket(@RequestBody GroupTicketForm data) {
        try {
            return ResponseEntity.ok(ticketService.createGroupTicket(data.getBasePrice(), data.getSeats().size(),
                    data.getSeats(), data.getScreeningId()));
        } catch (ScreeningNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (DuplicateException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/tickets/discounted")
    public ResponseEntity<Ticket> createDiscountedTicket(@RequestBody DiscountedTicketForm data) {
        try {
            return ResponseEntity.ok(ticketService.createDiscountedTicket(data.getBasePrice(), data.getDiscount(),
                    data.getScreeningId(), data.getRow(), data.getSeat()));
        } catch (ScreeningNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (DuplicateException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }


}
