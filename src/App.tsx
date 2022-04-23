import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import FlagDisplay from "./FlagDisplay";
import Privacy from "./Privacy";


class App extends Component {
  render()
  {
    return (
      <Routes>
        <Route path="/" element={<FlagDisplay />} />
        <Route path="privacy" element={ <Privacy/> } />
      </Routes>
    );
  }
 
}

export default App; 