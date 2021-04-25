package com.pacz.cinema.model.repositories;

import com.pacz.cinema.model.entities.Film;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FilmRepository extends JpaRepository<Film, Long> {
    List<Film> findByTitle(String title);
}
