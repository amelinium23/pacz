package repositories;

import model.SeatReservation;

import javax.persistence.EntityManager;

public class ReservationRepository extends Repository<SeatReservation> {
    public ReservationRepository(EntityManager entityManager) {
        super(entityManager, SeatReservation.class);
    }
}
