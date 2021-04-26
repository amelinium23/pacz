import React from "react";
import { Route, Switch } from "react-router-dom";
import Film from "./Film.jsx";
import ScreeningRoom from "./ScreeningRoom";
import AddFilm from "./AddFilm";
import Drawer from "./components/Drawer.jsx";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flex: 3,
  },
});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Drawer />
      <Switch>
        <Route exact from="/" render={(props) => <Film {...props} />} />
        <Route
          exact
          from="/screenings"
          render={(props) => <Film {...props} />}
        />
        <Route exact from="/films" render={(props) => <Film {...props} />} />
        <Route
          exact
          from="/screeningRooms"
          render={(props) => <ScreeningRoom {...props} />}
        />
        <Route exact from="/films" path="/films/add">
          <AddFilm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
