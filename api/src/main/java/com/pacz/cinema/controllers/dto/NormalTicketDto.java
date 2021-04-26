package com.pacz.cinema.controllers.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class NormalTicketDto extends TicketDto {
    private int row;
    private int seat;
}
