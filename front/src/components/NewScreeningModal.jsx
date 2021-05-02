import FilmSelector from "../containers/FilmSelector.jsx";
import ScreeningRoomSelector from "../containers/ScreeningRoomSelector.jsx";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import { Modal, Button, makeStyles } from "@material-ui/core";
import DateFnUtils from "@date-io/date-fns";

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

const NewScreeningModal = ({
  open,
  setOpen,
  handleSubmit,
  selectedDate,
  handleDateChange,
  setSelectedFilm,
  setSelectedScreeningRoom,
}) => {
  const classes = useStyles();
  const onSubmit = (e) => {
    handleSubmit(e);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnUtils}>
      <Modal open={open} onClose={() => setOpen(false)}>
        <form onSubmit={onSubmit} className={classes.paper}>
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

export default NewScreeningModal;
