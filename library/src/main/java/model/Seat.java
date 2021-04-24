package model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.collection.internal.PersistentList;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Seat {
    @Id
    @GeneratedValue
    private Long id;
    private int row;
    private int number;
    @ManyToOne
    @JoinColumn(name="screening_room_id")
    private ScreeningRoom screeningRoom;

    @OneToMany
    private List<SeatReservation> reservations = new PersistentList<>();

    public Seat(int row, int number) {
        this.row = row;
        this.number = number;
    }
}
