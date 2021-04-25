package com.pacz.cinema.controllers.requestbody;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class NormalTicketForm extends TicketForm {
    private int row;
    private int seat;
}
