package managers;

import model.Film;
import repositories.FilmRepository;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class FilmManager {
    EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("Cinema");
    private final FilmRepository filmRepo = new FilmRepository(entityManagerFactory.createEntityManager());
    public void addFilm(String title, int runtime) {
        Film film = new Film(title, runtime);
        filmRepo.save(film);
    }
    public void removeFilm(int id) {
        filmRepo.remove(id);
    }
}
