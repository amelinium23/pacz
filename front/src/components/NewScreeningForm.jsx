import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, makeStyles } from "@material-ui/core";
import DateFnUtils from "@date-io/date-fns";
import { format } from "date-fns";
import FilmSelector from "./FilmSelector.jsx";
import ScreeningRoomSelector from "./ScreeningRoomSelector.jsx";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
  input: {
    width: "100%",
    marginBottom: "1%",
    marginTop: "1.25%",
  },
  submit: {
    marginTop: "3%",
    width: "100%",
    border: "1px solid black",
  },
}));

const NewScreeningForm = ({ open, setOpen, newScreeningHandler }) => {
  const classes = useStyles();
  const [selectedFilm, setSelectedFilm] = useState(null); // TypeScript commits sudoku
  const [selectedScreeningRoom, setSelectedScreeningRoom] = useState(null);
  const [selectedDate, handleDateChange] = useState(new Date());
  const addScreening = async () => {
    try {
      const json = await axios.post(`http://localhost:8080/screenings`, {
        filmId: selectedFilm.id,
        screeningRoomId: selectedScreeningRoom.id,
        startTime: format(selectedDate, "HH:mm"),
        screeningDate: format(selectedDate, "yyyy-MM-dd"),
      });
      newScreeningHandler(json.data);
    } catch (err) {
      alert("Błąd przy dodawaniu seansu");
    }
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnUtils}>
      <Modal open={open} onClose={() => setOpen(false)}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addScreening();
            setOpen(false);
            setSelectedFilm(null);
            setSelectedScreeningRoom(null);
            handleDateChange(new Date());
          }}
          className={classes.paper}
        >
          <FilmSelector setSelectedFilm={setSelectedFilm} />
          <ScreeningRoomSelector
            setSelectedScreeningRoom={setSelectedScreeningRoom}
          />
          <KeyboardDatePicker
            className={classes.input}
            clearable="true"
            variant="inline"
            value={selectedDate}
            label="Data seansu"
            onChange={(date) => handleDateChange(date)}
            minDate={new Date()}
            format="yyyy-MM-dd"
          />{" "}
          <br />
          <KeyboardTimePicker
            className={classes.input}
            ampm={false}
            variant="inline"
            label="Godzina seansu"
            value={selectedDate}
            onChange={handleDateChange}
            minutesStep={5}
          />
          <Button type="submit" color="primary" fullWidth>
            Zatwierdź
          </Button>
        </form>
      </Modal>
    </MuiPickersUtilsProvider>
  );
};

export default NewScreeningForm;
