import { Route, Switch } from "react-router-dom";
import FilmScreen from "./containers/FilmScreen";
import Drawer from "./containers/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import ScreeningScreen from "./containers/ScreeningScreen";
import ScreeningRoom from "./containers/ScreeningRooms";
import TicketList from "./containers/TicketList";
import NewTicket from "./containers/NewTicket";
import "./films.css";

const useStyles = makeStyles({
  container: {
    display: "flex",
  },
});

const App = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Drawer />
      <Switch>
        <Route exact path="/">
          <TicketList />
        </Route>
        <Route exact path="/newTicket">
          <NewTicket />
        </Route>
        <Route exact path="/screenings">
          <ScreeningScreen />
        </Route>
        <Route exact path="/films">
          <FilmScreen />
        </Route>
        <Route exact path="/screeningRooms">
          <ScreeningRoom />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
