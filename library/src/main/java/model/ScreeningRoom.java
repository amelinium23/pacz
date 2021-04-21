package model;

import java.util.ArrayList;
import java.util.List;

public class ScreeningRoom {
    private String name;
    private List<Seat> seats = new ArrayList<>();
    private int rowNumber;
    private int seatsInRow;

    public ScreeningRoom(String name, int rowNumber, int seatsInRow) {
        this.name = name;
        this.rowNumber = rowNumber;
        this.seatsInRow = seatsInRow;
        for (int i = 1; i <= rowNumber; i++) {
            for (int j = 1; j <= seatsInRow; j++) {
                seats.add(new Seat(rowNumber, seatsInRow));
            }
        }
    }

    public String getName() {
        return name;
    }

    public List<Seat> getSeats() {
        return seats;
    }

    public int getRowNumber() {
        return rowNumber;
    }

}
