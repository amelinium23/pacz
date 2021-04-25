package com.pacz.cinema.controllers.requestbody;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ScreeningForm {
    private Long screeningRoomId;
    private Long filmId;
    private String screeningDate;
    private String startTime;
}
