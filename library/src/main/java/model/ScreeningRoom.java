package model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class ScreeningRoom {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private int rowNumber;
    private int seatsInRow;
    @OneToMany(mappedBy = "screeningroom", cascade = CascadeType.ALL)
    private List<Screening> screenings;
    @OneToMany(mappedBy = "screeningroom", cascade = CascadeType.ALL)
    private List<Seat> seats;
}
