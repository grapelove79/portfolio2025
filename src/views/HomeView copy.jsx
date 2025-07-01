import React, { useState } from "react";
import Cursor from "../components/Cursor";
import Header from "../components/Header";
import Skip from "../components/Skip";
import Intro from "../components/Intro";
import Skill from "../components/Skill";
import Site from "../components/Site";
import Port from "../components/Port";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Main from "../components/Main";

const HomeView = () => {
  const [hover, hoverChange] = useState(false);

  return (
    <>
      <Cursor hover={hover} />
      <Skip />
      <Header hoverChange={hoverChange}/>
      <Main hoverChange={hoverChange}>
        <Intro />
        <Skill />
        <Site />
        <Port />
        <Contact />
      </Main>
      <Footer hoverChange={hoverChange}/>
    </>
  )
}

export default HomeView;