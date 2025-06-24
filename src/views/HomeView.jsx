import React from "react";
import Header from "../components/Header00";
import Skip from "../components/Skip";
import IntroSection from "../components/IntroSection";
import Intro from "../components/Intro";
import Skill from "../components/Skill";
import Career from '../components/Career';
import Port from "../components/Port";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Main from "../components/Main";

const HomeView = () => {
  return (
    <>
      <Skip />
      <Header />
      <Main>
        <IntroSection /> {/* 영상 시퀀스 */}
        <Intro />        {/* 기존 인트로 */}
        <Skill />
        <Career />
        <Port />
        <Contact />
      </Main>
      <Footer />
    </>
  );
};

export default HomeView;