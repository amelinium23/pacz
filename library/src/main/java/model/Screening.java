package model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.collection.internal.PersistentList;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Screening {
    @Id
    @GeneratedValue
    private Long id;
    private LocalTime beginTime;
    private LocalDate screeningDate;
    @ManyToOne
    @JoinColumn(name="film_id")
    private Film film;
    @OneToMany
    private List<SeatReservation> reservations = new PersistentList<>();

    @ManyToOne
    private ScreeningRoom screeningRoom;

    public Screening(LocalTime beginTime, LocalDate screeningDate, Film film, ScreeningRoom screeningRoom) {
        this.beginTime = beginTime;
        this.screeningDate = screeningDate;
        this.film = film;
        this.screeningRoom = screeningRoom;
    }
}
