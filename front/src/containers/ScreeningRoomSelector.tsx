import { useEffect, useState } from "react";
import axios from "axios";
import { TextField, makeStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ScreeningRoom } from "../utils/APIResponseTypes";

const useStyles = makeStyles(() => ({
  input: {
    width: "100%",
    marginBottom: "1%",
    marginTop: "1.25%",
  },
}));

interface IProps {
  setSelectedScreeningRoom: (newScreeningRoom: ScreeningRoom | null) => void;
}
const ScreeningRoomSelector = ({
  setSelectedScreeningRoom,
}: IProps): JSX.Element => {
  const classes = useStyles();
  const [screeningRooms, setScreeningRooms] = useState([] as ScreeningRoom[]);
  const requestData = async () => {
    try {
      const json = await axios.get(`http://localhost:8080/screeningRooms`);
      setScreeningRooms(json.data as ScreeningRoom[]);
    } catch (err) {
      alert("Błąd przy pobieraniu sal");
    }
  };

  useEffect(() => void requestData(), []);

  return (
    <Autocomplete
      id="room-selection"
      onChange={(event, newValue: ScreeningRoom | null) => {
        console.log(newValue);
        setSelectedScreeningRoom(newValue);
      }}
      options={screeningRooms}
      getOptionSelected={(option, value) => option.id === value.id}
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
  );
};

export default ScreeningRoomSelector;
