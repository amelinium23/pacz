import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, TextField, makeStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DateFnUtils from "@date-io/date-fns";
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
  const [films, setFilms] = useState([]);
  const [screeningRooms, setScreeningRooms] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null); // TypeScript commits sudoku
  const [selectedScreeningRoom, setSelectedScreeningRoom] = useState(null);
  const [selectedDate, handleDateChange] = useState(new Date());
  const requestData = async () => {
    let json = await axios.get(`http://localhost:8080/films`);
    setFilms(json.data);
    json = await axios.get(`http://localhost:8080/screeningRooms`);
    setScreeningRooms(json.data);
  };
  const addScreening = async () => {
    const hours = selectedDate.getHours();
    const minutes = selectedDate.getMinutes();
    const month = selectedDate.getMonth();
    const date = selectedDate.getDate();
    console.log(selectedFilm);
    const json = await axios.post(`http://localhost:8080/screenings`, {
      filmId: selectedFilm.id,
      screeningRoomId: selectedScreeningRoom.id,
      startTime: `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
      }`,
      screeningDate: `${selectedDate.getFullYear()}-${
        month < 10 ? `0${month}` : month
      }-${date < 10 ? `0${date}` : date}`,
    });
    newScreeningHandler(json.data);
  };
  useEffect(() => {
    requestData();
  }, []);

  return (
    <MuiPickersUtilsProvider utils={DateFnUtils}>
      <Modal open={open} onClose={() => setOpen(false)}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addScreening();
            setOpen(false); // It's ugly but works until I come up with something better
            setSelectedFilm(null);
            setSelectedScreeningRoom(null);
            handleDateChange(new Date());
          }}
          className={classes.paper}
        >
          <Autocomplete
            id="film-selection"
            value={selectedFilm}
            onChange={(event, newValue) => {
              setSelectedFilm(newValue);
            }}
            options={films}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                className={classes.input}
                {...params}
                label="Wybierz film"
                variant="outlined"
                required
              />
            )}
            required
          />
          <Autocomplete
            id="room-selection"
            value={selectedScreeningRoom}
            onChange={(event, newValue) => {
              setSelectedScreeningRoom(newValue);
            }}
            options={screeningRooms}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                className={classes.input}
                {...params}
                label="Wybierz salę"
                variant="outlined"
                required
              />
            )}
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
