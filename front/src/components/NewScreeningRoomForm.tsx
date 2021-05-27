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
    // margin: "1.25% 1.25% 1% 1.25%",
    marginTop: "1.25%",
    marginBottom: "1.25%",
    marginRight: "1%",
    marginLeft: "1%",
    width: "865px",
  },
  button: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    width: "200px",
    margin: "1.5% auto 1% auto",
    backgroundColor: "white",
    borderRadius: "10px",
    border: "1px solid #3f50b5",
    boxShadow: "6px 2px 4px 2px rgba(154,154,154,0.64)",
  },
});

interface IProps {
  handleSubmit: () => void;
  setName: (newName: string) => void;
  setSeatsInRow: (newAmount: number) => void;
  setRowNumber: (newAmount: number) => void;
}

const NewScreeningRoomForm = ({
  handleSubmit,
  setName,
  setSeatsInRow,
  setRowNumber,
}: IProps): JSX.Element => {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Accordion
      expanded={isExpanded}
      style={{
        margin: "1.5% auto 1.5% auto",
        width: "50%",
        boxShadow: "6px 2px 4px 2px rgba(154,154,154,0.64)",
      }}
    >
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
            onChange={(e) => setSeatsInRow(parseInt(e.target.value) || 0)}
            required
          />{" "}
          <br />
          <Input
            className={classes.input}
            name="rowNumber"
            type="numeric"
            placeholder="Wpisz liczbę rzędów"
            onChange={(e) => setRowNumber(parseInt(e.target.value) || 0)}
            required
          />{" "}
          <br />
          <Button
            className={classes.button}
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
