package com.pacz.cinema.controllers.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class DiscountedTicketDto extends TicketDto {
    int discount;
    int row;
    int seat;
}
