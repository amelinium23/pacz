package com.pacz.cinema.controllers.requestbody;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ScreeningRoomForm {
    private String name;
    private int rows;
    private int seatsInRow;
}
