import React from "react";
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Button } from "@material-ui/core";
import Film from "./Film";

function App() {
  return (
    // <div id="root">
    //   <Router>
    //     <Link to="/" style={{ textDecoration: "none" }}>
    //       <header class="title">
    //         <img
    //           src="https://pics.freeicons.io/uploads/icons/png/18388217231595452842-512.png"
    //           alt="logo"
    //           width="100px"
    //         />
    //       </header>
    //     </Link>
    //     <Switch>
    //       <Route path="/">
    //         <Link to="/" style={{ textDecoration: "none" }}>
    //           <ReserveButton />
    //         </Link>
    //       </Route>
    //     </Switch>
    //   </Router>
    // </div>
    // <Button
    //   id="repertuar"
    //   style={{
    //     border: "2px solid #2E2E2E",
    //     fontSize: "14px",
    //     fontFamily: "Roboto",
    //   }}
    // >
    //   Edytuj Repertuar
    // </Button>
    // <Button
    //   id="reserve"
    //   style={{
    //     border: "2px solid #2E2E2E",
    //     fontSize: "14px",
    //     fontFamily: "Roboto",
    //   }}
    // >
    //   Zarezerwuj miejsca
    // </Button>
    // <Screening number={1} />
    <div>
      <header id="header" class="title">
        Zarządzanie filmami <br />
        <Button
          style={{
            marginLeft: "10px",
            border: "2px solid #2E2E2E",
            backgroundColor: "white",
            marginTop: "10px",
          }}
        >
          Edytuj sale
        </Button>
        <Button
          style={{
            marginLeft: "10px",
            border: "2px solid #2E2E2E",
            backgroundColor: "white",
            marginTop: "10px",
          }}
        >
          Zarezerwuj miejsca
        </Button>
      </header>

      <Film />
    </div>
  );
}

export default App;
