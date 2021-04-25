package com.pacz.cinema.controllers.requestbody;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public abstract class TicketForm {
    private float basePrice;
    private Long screeningId;

}
