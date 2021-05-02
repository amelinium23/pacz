import React from "react";
import { Route, Switch } from "react-router-dom";
import FilmScreen from "./containers/FilmScreen.jsx";
import Drawer from "./containers/Drawer.jsx";
import { makeStyles } from "@material-ui/core/styles";
import ScreeningScreen from "./containers/ScreeningScreen.jsx";
import ScreeningRoom from "./components/ScreeningRooms.jsx";
import TicketList from "./components/TicketList.jsx";
import NewTicket from "./containers/NewTicket.jsx";

const useStyles = makeStyles({
  container: {
    display: "flex",
  },
});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Drawer />
      <Switch>
        <Route exact from="/" render={(props) => <TicketList {...props} />} />
        <Route
          exact
          from="/newTicket"
          render={(props) => <NewTicket {...props} />}
        />
        <Route
          exact
          from="/screenings"
          render={(props) => <ScreeningScreen {...props} />}
        />
        <Route
          exact
          from="/films"
          render={(props) => <FilmScreen {...props} />}
        />
        <Route
          exact
          from="/screeningRooms"
          render={(props) => <ScreeningRoom {...props} />}
        />
        <Route exact from="/films" path="/films/add">
          <FilmScreen />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
