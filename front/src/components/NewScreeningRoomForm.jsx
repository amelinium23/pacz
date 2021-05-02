import { useState } from "react";
import {
  Input,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  makeStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles({
  input: {
    width: "580px",
  },

  button: {
    alignItems: "center",
    alignContent: "center",
    marginTop: "2%",
    width: "200px",
    border: "1px solid black",
    backgroundColor: "white",
  },
  submit: {
    marginTop: "3%",
    width: "100%",
    border: "1px solid black",
  },
});

const NewScreeningRoomForm = ({
  handleSubmit,
  setName,
  setSeatsInRow,
  setRowNumber,
}) => {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Accordion expanded={isExpanded} style={{ margin: "auto", width: "50%" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-controls="panel1a-content"
        id="panel1a-header"
        style={{ margin: "10px 10px 0 0px" }}
      >
        <Typography>Dodaj salę</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <form
          id="addScreeningRoom"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            setIsExpanded(!isExpanded);
          }}
        >
          <Input
            className={classes.input}
            name="name"
            placeholder="Wpisz nazwę sali"
            onChange={(e) => setName(e.target.value)}
            required
          />{" "}
          <br />
          <Input
            className={classes.input}
            name="seatsInRow"
            type="numeric"
            placeholder="Wpisz liczbę miejsc w rzędzie"
            onChange={(e) => setSeatsInRow(e.target.value)}
            required
          />{" "}
          <br />
          <Input
            className={classes.input}
            name="rowNumber"
            type="numeric"
            placeholder="Wpisz liczbę rzędów"
            onChange={(e) => setRowNumber(e.target.value)}
            required
          />{" "}
          <br />
          <Button
            className={classes.submit}
            type="submit"
            color="primary"
            fullWidth
          >
            Zatwierdź
          </Button>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default NewScreeningRoomForm;
