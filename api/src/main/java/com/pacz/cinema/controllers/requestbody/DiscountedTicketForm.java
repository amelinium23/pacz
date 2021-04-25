package com.pacz.cinema.controllers.requestbody;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class DiscountedTicketForm extends TicketForm {
    int discount;
    int row;
    int seat;
}
