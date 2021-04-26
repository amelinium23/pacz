import React from "react";
import { Route, Switch } from "react-router-dom";
import ScreeningRoom from "./ScreeningRoom";
import FilmScreen from "./components/FilmScreen.jsx";
import Drawer from "./components/Drawer.jsx";
import { makeStyles } from "@material-ui/core/styles";
import Screening from "./components/Screening.jsx";

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
        <Route exact from="/" render={(props) => <FilmScreen {...props} />} />
        <Route
          exact
          from="/screenings"
          render={(props) => <Screening {...props} />}
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
