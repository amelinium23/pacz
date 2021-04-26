import { useState, useEffect } from "react";
import { Button, Card } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./films.css";

export default function Film() {
  const [films, setFilms] = useState([]);

  async function requestsFilms() {
    const res = await fetch(`http://localhost:8080/films`);
    const json = await res.json();
    console.log(json);
    setFilms(json);
  }

  useEffect(() => {
    requestsFilms();
  }, [films]);

  return (
    <div class="main">
      <header>
        <Link
          to="/films/add"
          style={{
            textDecoration: "none",
            marginBottom: "10px",
            marginTop: "10px",
            padding: "10px",
          }}
        >
          <Button
            style={{
              alignSelf: "center",
              marginLeft: "20px",
              marginBottom: "10px",
              backgroundColor: "white",
              border: "1px solid black",
            }}
          >
            Dodaj film
          </Button>
        </Link>
      </header>
      {films.map((i) => (
        <Card
          style={{
            width: "400px",
            textAlign: "center",
            padding: "10px",
            border: "1px solid black",
          }}
        >
          <p>Tytuł: {i.title}</p>
          <p>Długość filmu: {i.length} min</p>
          <Button
            style={{
              alignSelf: "center",
              backgroundColor: "white",
              border: "1px solid black",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            Edytuj
          </Button>
          <Button
            style={{
              alignSelf: "center",
              backgroundColor: "white",
              border: "1px solid black",
              marginLeft: "4%",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            Usuń
          </Button>
        </Card>
      ))}
    </div>
  );
}
