import { Input } from "@material-ui/core";
import { Route } from "react-router-dom";
import React from "react";

export default function AddFilm() {
  return (
    <Route path="/films/add">
      <form id="addFilm" method="post" action="http://localhost:8080/films/">
        <Input
          name="title"
          placeholder="Wpisz tytuł"
          style={{
            width: "200px",
          }}
          required
        />{" "}
        <br />
        <Input
          placeholder="Wpisz długość w minutach"
          style={{
            width: "200px",
          }}
          type="number"
          name="length"
          required
        />
        <br />
        <input type="submit" value="Zatwierdź" />
      </form>
    </Route>
  );
}
