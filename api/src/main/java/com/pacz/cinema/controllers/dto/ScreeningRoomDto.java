package com.pacz.cinema.controllers.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ScreeningRoomDto {
    private Long id;
    private String name;
    private int rowNumber;
    private int seatsInRow;
}
