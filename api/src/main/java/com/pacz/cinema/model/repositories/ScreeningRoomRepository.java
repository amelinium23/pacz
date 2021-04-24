package com.pacz.cinema.model.repositories;

import com.pacz.cinema.model.entities.ScreeningRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScreeningRoomRepository extends JpaRepository<ScreeningRoom, Long> {
}

