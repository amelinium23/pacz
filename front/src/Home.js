import React from "react";
import { Button } from "@material-ui/core";
import "./Home.css";

export default function Home() {
  return (
    <div id="Home" class="Home">
      <header class="title">
        <p class="title">Aplikacja do zarządzania kinem</p>
      </header>
      <Button
        id="reserve"
        style={{
          border: "2px solid #2E2E2E",
          fontSize: "14px",
          fontFamily: "Roboto",
        }}
      >
        Zarezerwuj miejsca
      </Button>
      <Button
        id="repertuar"
        style={{
          border: "2px solid #2E2E2E",
          fontSize: "14px",
          fontFamily: "Roboto",
        }}
      >
        Edytuj Repertuar
      </Button>
    </div>
  );
}
