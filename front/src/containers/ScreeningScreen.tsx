import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import NewScreeningForm from "./NewScreeningForm";
import ScreeningTable from "../components/ScreeningTable";
import { Screening } from "../utils/APIResponseTypes";

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
    backgroundColor: "white",
    borderRadius: "10px",
    border: "1px solid #3f50b5",
    boxShadow: "6px 2px 4px 2px rgba(154,154,154,0.64)",
  },
});

const ScreeningScreen = (): JSX.Element => {
  const classes = useStyles();
  const [screenings, setScreenings] = React.useState([] as Screening[]);
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
    void requestScreening();
  }, []);

  return (
    <div className={classes.root}>
      <Button
        className={classes.button}
        color="default"
        onClick={() => setFormOpen(!formOpen)}
      >
        Zaplanuj seans
      </Button>
      <ScreeningTable screenings={screenings} />
      <NewScreeningForm
        open={formOpen}
        setOpen={setFormOpen}
        newScreeningHandler={(newScreening: Screening) =>
          setScreenings([...screenings, newScreening])
        }
      />
    </div>
  );
};

export default ScreeningScreen;
