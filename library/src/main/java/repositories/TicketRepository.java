package repositories;

import model.Ticket;

import javax.persistence.EntityManager;

public class TicketRepository extends Repository<Ticket> {
    public TicketRepository(EntityManager entityManager) {
        super(entityManager, Ticket.class);
    }
}
