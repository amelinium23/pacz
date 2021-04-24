package repositories;

import model.Screening;

import javax.persistence.EntityManager;

public class ScreeningRepository extends Repository<Screening> {
    public ScreeningRepository(EntityManager entityManager) {
        super(entityManager, Screening.class);
    }
}
