import React from "react";

import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import NewScreeningRoomForm from "../components/NewScreeningRoomForm";
import ScreeningRoomTable from "../components/ScreeningRoomTable";
import { ScreeningRoom as ScreeningRoomType } from "../utils/APIResponseTypes";

const useStyles = makeStyles({
  divcontainer: {
    width: "100%",
  },
});

const ScreeningRoom = (): JSX.Element => {
  const classes = useStyles();
  const [name, setName] = React.useState("");
  const [seatsInRow, setSeatsInRow] = React.useState(0);
  const [rowNumber, setRowNumber] = React.useState(0);
  const screeningRoomState = React.useState([] as ScreeningRoomType[]);
  const [screeningRooms, setScreeningRooms] = screeningRoomState;

  const requestScreeningRooms = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/screeningRooms`);
      setScreeningRooms(res.data);
    } catch (err) {
      alert("Błąd przy pobieraniu seansów");
    }
  };

  const addScreeningRoom = async () => {
    try {
      const res = await axios.post(`http://localhost:8080/screeningRooms`, {
        name: name,
        seatsInRow: seatsInRow,
        rowNumber: rowNumber,
      });
      setScreeningRooms([...screeningRooms, res.data]);
    } catch (err) {
      alert("Błąd przy dodawaniu sali");
    }
  };

  React.useEffect(() => {
    void requestScreeningRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.divcontainer}>
      <NewScreeningRoomForm
        handleSubmit={addScreeningRoom}
        setName={setName}
        setSeatsInRow={setSeatsInRow}
        setRowNumber={setRowNumber}
      />
      <ScreeningRoomTable screeningRooms={screeningRooms} />
    </div>
  );
};

export default ScreeningRoom;
