import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import NewScreeningForm from "./NewScreeningForm.jsx";
import ScreeningTable from "../components/ScreeningTable.jsx";

const useStyles = makeStyles({
  root: {
    width: "50%",
    margin: "auto",
  },
  button: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    width: "200px",
    margin: "10px auto",
    border: "1px solid black",
    backgroundColor: "white",
  },
});

const ScreeningScreen = () => {
  const classes = useStyles();
  const [screenings, setScreenings] = React.useState([]);
  const [formOpen, setFormOpen] = React.useState(false);

  async function requestScreening() {
    try {
      const res = await axios.get(`http://localhost:8080/screenings`);
      setScreenings(res.data);
    } catch (err) {
      alert("Błąd przy pobieraniu seansów");
    }
  }

  React.useEffect(() => {
    requestScreening();
  }, []);

  return (
    <div className={classes.root}>
      <Button
        className={classes.button}
        color="primary"
        onClick={() => setFormOpen(!formOpen)}
      >
        Zaplanuj seans
      </Button>
      <ScreeningTable screenings={screenings} />
      <NewScreeningForm
        open={formOpen}
        setOpen={setFormOpen}
        newScreeningHandler={(newScreening) =>
          setScreenings([...screenings, newScreening])
        }
      />
    </div>
  );
};

export default ScreeningScreen;
