package model;

import lombok.Data;
import lombok.NoArgsConstructor;

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
    @JoinColumn(name="screeningroom_id")
    private ScreeningRoom screeningRoom;
    @OneToMany
    private List<SeatReservation> reservations;
}
