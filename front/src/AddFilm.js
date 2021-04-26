import { Accordion, Input } from "@material-ui/core";
import React from "react";

export default function AddFilm() {
  return (
    <div>
      <Accordion>
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
      </Accordion>
    </div>
  );
}
