package repositories;

import model.ScreeningRoom;

import javax.persistence.EntityManager;

public class ScreeningRoomRepository extends Repository<ScreeningRoom> {

    public ScreeningRoomRepository(EntityManager entityManager) {
        super(entityManager, ScreeningRoom.class);
    }
}
