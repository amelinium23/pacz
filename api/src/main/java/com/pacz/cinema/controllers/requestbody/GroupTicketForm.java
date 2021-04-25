package com.pacz.cinema.controllers.requestbody;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Getter
public class GroupTicketForm extends TicketForm {
    private List<int[]> seats;
}
