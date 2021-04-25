package com.pacz.cinema.controllers.requestbody;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class FilmForm {
    private String title;
    private int length;
}
