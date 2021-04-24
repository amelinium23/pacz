package model;

import lombok.Data;
import org.hibernate.collection.internal.PersistentList;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table(name = "screening_room")
public class ScreeningRoom {
    @Id
    @GeneratedValue
    private Long id;
    @Column(unique = true)
    private String name;
    private int rowNumber;
    private int seatsInRow;
    @OneToMany(mappedBy = "screening_room", cascade = CascadeType.ALL)
    private List<Screening> screenings = new PersistentList<>();
    @OneToMany(mappedBy = "screening_room", cascade = CascadeType.ALL)
    private List<Seat> seats = new PersistentList<>();

    public ScreeningRoom() {
        for (var i = 1; i <= rowNumber; i++) {
            for (var j = 1; j <= seatsInRow; j++) {
                seats.add(new Seat(i, j));
            }
        }
    }
}
