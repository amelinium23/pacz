import React from "react";
import {
  Drawer as MUIDrawer,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles({
  drawer: {
    width: "4%",
  },
});

const Drawer = ({ history }) => {
  const classes = useStyles();
  const itemsList = [
    {
      text: "Lista biletów",
      onClick: () => history.push("/"),
    },
    {
      text: "Sprzedaż biletów",
      onClick: () => history.push("/newTicket"),
    },
    {
      text: "Seanse",
      onClick: () => history.push("/screenings"),
    },
    {
      text: "Filmy",
      onClick: () => history.push("/films"),
    },
    {
      text: "Sale",
      onClick: () => history.push("/screeningRooms"),
    },
  ];
  return (
    <MUIDrawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {itemsList.map(({ text, onClick }) => (
          <ListItem button key={text} onClick={onClick}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </MUIDrawer>
  );
};

export default withRouter(Drawer);
