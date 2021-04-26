package com.pacz.cinema.model.entities;

import lombok.Data;

import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Data
@NoArgsConstructor
public class Film {
    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private int length;

    public Film(String title, int length) {
        this.title = title;
        this.length = length;
    }

    @OneToMany(mappedBy = "film", cascade = CascadeType.ALL)
    private List<Screening> screenings = new ArrayList<>();
}
