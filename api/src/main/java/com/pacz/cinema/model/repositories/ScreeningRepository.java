package com.pacz.cinema.model.repositories;

import com.pacz.cinema.model.entities.Screening;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ScreeningRepository extends JpaRepository<Screening, Long> {
    List<Screening> getScreeningsByScreeningDate(LocalDate date);
    List<Screening> getScreeningsByFilm_Id(Long id);
}

