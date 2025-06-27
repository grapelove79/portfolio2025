import React, { useEffect } from "react";
import Header from "../components/Header";
import Skip from "../components/Skip";
import IntroSection from "../components/IntroSection";
import Intro from "../components/Intro";
import Skill from "../components/Skill";
import Career from '../components/Career';
import Port from "../components/Port";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Main from "../components/Main";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

const HomeView = () => {

  useEffect(() => {
    const isIos = () => {
      return /iP(ad|hone|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

    };

    if (!isIos()) {
      ScrollTrigger.normalizeScroll(true); // iOS 아닌 경우에만 활성화
    }

    return () => {
      ScrollTrigger.normalizeScroll(false); //cleanup
    }
  }, []);

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