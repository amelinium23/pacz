package repositories;

import model.Film;

import javax.persistence.EntityManager;

public class FilmRepository extends Repository<Film> {
    public FilmRepository(EntityManager entityManager) {
        super(entityManager, Film.class);
    }
}
