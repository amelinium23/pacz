import React from "react";
import {
  Input,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableContainer,
  TableBody,
  Paper,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import ScreeningRoomContext from "./ScreeningRoomContext";

const useStyles = makeStyles({
  input: {
    width: "580px",
  },
  table: {
    width: "900px",
  },
  divcontainer: {
    width: "100%",
  },
  tablecontainer: {
    width: "50%",
    margin: "auto",
  },
  cell: {
    width: "300px",
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

export default function ScreeningRoom() {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [name, setName] = React.useState("");
  const [seatsInRow, setSeatsInRow] = React.useState(0);
  const [rowNumber, setRowNumber] = React.useState(0);
  const screeningRoomState = React.useState([]);
  const [screeningRooms, setScreeningRooms] = screeningRoomState;

  async function requestScreeningRooms() {
    const res = await axios.get(`http://localhost:8080/screeningRooms`);
    setScreeningRooms(res.data);
  }

  const addScreeningRoom = async () => {
    const res = await axios.post(`http://localhost:8080/screeningRooms`, {
      name: name,
      seatsInRow: seatsInRow,
      rowNumber: rowNumber,
    });
    setScreeningRooms([...screeningRooms, res.data]);
  };

  React.useEffect(() => {
    requestScreeningRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScreeningRoomContext.Provider value={screeningRoomState}>
      <div className={classes.divcontainer}>
        <Accordion
          expanded={isExpanded}
          style={{ margin: "auto", width: "50%" }}
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
                addScreeningRoom();
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
        <TableContainer className={classes.tablecontainer} component={Paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Nazwa</TableCell>
                <TableCell align="right">Liczba rzędów</TableCell>
                <TableCell align="right" style={{ width: "200px" }}>
                  Liczba miejsc w rzędzie
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {screeningRooms.map((i) => (
                <TableRow key={i.id}>
                  <TableCell className={classes.cell}>{i.name}</TableCell>
                  <TableCell className={classes.cell} align="right">
                    {i.rowNumber}
                  </TableCell>
                  <TableCell className={classes.cell} align="right">
                    {i.seatsInRow}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </ScreeningRoomContext.Provider>
  );
}
