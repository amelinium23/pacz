package com.pacz.cinema.model.repositories;

import com.pacz.cinema.model.entities.ScreeningRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ScreeningRoomRepository extends JpaRepository<ScreeningRoom, Long> {
    Optional<ScreeningRoom> getScreeningRoomsByName(String name);
}

