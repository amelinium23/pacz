package model;

import lombok.Data;

import lombok.NoArgsConstructor;
import org.hibernate.collection.internal.PersistentList;

import javax.persistence.*;
import java.util.List;


@Entity
@Data
@NoArgsConstructor
public class Film {
    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private int length;

    public Film(String title, int length) {
        this.title = title;
        this.length = length;
    }

    @OneToMany(mappedBy = "film", cascade = CascadeType.ALL)
    private List<Screening> screenings = new PersistentList<>();
}
