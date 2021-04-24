package repositories;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

public abstract class Repository<T> {
    private final Class<T> type;
    private final EntityManager entityManager;

    protected Repository(EntityManager entityManager, Class<T> type) {
        this.entityManager = entityManager;
        this.type = type;
    }

    public Optional<T> findById(int id) {
        var obj = entityManager.find(type, id);
        return obj != null ? Optional.of(obj) : Optional.empty();
    }

    public List findAll() {
        return entityManager.createQuery("SELECT * FROM :className")
                .setParameter("className", type.getName())
                .getResultList();
    }

    public Optional<T> save(T obj) {
        try {
            entityManager.getTransaction().begin();
            entityManager.persist(obj);
            entityManager.getTransaction().commit();
            return Optional.of(obj);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Optional.empty();
    }

    public void remove(int id) {
        try {
            entityManager.getTransaction().begin();
            entityManager.remove(findById(id));
            entityManager.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
