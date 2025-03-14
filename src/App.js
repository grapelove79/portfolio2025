import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="./" element={<HomeView />}/>
        <Route path="./about" element={<AboutView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;