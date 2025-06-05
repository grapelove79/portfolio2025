import React from "react";
import profile from "../assets/img/profile.png";
import { introText } from "../constants";

const Intro = () => {
  return (
    // <div class="sec sec02">
    //             <div class="row_wrap">
    //                 <div class="row">
    //                     <div class="col-8 offset-2">
    //                         <div class="tit_box active" data-motionactive="">
    //                             <h3>
    //                                 <strong>Shape</strong>
    //                                 <strong>Everyday Dreams</strong>
    //                             </h3>
    //                         </div>
    //                         <ul class="list">
    //                             <li data-motionactive="" class="active">
    //                                 <div class="txt_box">
    //                                     <i><img src="https://image.hanatourcompany.com/company/resources/kr/images/company/our-commitment/sec02_icon01.svg" alt=""></i>
    //                                     <strong>우리는 <span>여행</span>을 만듭니다.</strong>
    //                                     <p>
    //                                         익숙하지만 색다를 이야기를 <br>
    //                                         낯설지만 공감하는 이야기를<br>
    //                                         모든 이들의 여행의 꿈을 실현해 드립니다.<br>
    //                                         우리는 그렇게 여행을 만듭니다.<br>
    //                                     </p>
    //                                 </div>
    //                             </li>
    //                             <li data-motionactive="" class="active">
    //                                 <div class="txt_box">
    //                                     <i><img src="https://image.hanatourcompany.com/company/resources/kr/images/company/our-commitment/sec02_icon02.svg" alt=""></i>
    //                                     <strong>우리는 <span>문화</span>를 만듭니다.</strong>
    //                                     <p>
    //                                         여행을 통해 새로운 경험을 쌓고 교류하며<br> 
    //                                         세계를 이해하고 공감할 수 있는 문화를 만듭니다.
    //                                     </p>
    //                                 </div>
    //                             </li>
    //                             <li data-motionactive="" class="active">
    //                                 <div class="txt_box">
    //                                     <i><img src="https://image.hanatourcompany.com/company/resources/kr/images/company/our-commitment/sec02_icon03.svg" alt=""></i>
    //                                     <strong>우리는 <span>행복</span>을 만듭니다.</strong>
    //                                     <p>
    //                                         고객에게 여행을 통한 행복을 선사하고,<br>
    //                                         우리는 고객의 행복을 느끼며<br>
    //                                         또 다른 꿈과 행복을 만듭니다.
    //                                     </p>
    //                                 </div>
    //                             </li>
    //                         </ul>
    //                     </div>
    //                 </div>
    //             </div>
    //             <div class="wave_box wave_box1 active" data-motionactive="">
    //                 <svg width="100%" height="400" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs></defs><path id="wave1" d="M 0 40.9237 C 541.5 26.049 541.5 26.049 1083 33.4863 L 1083 8156.34 L 0 8156.34 Z" fill="transparent"></path></svg>
    //                 <div class="dot_box">
    //                     <span class="dot dot1 mint"></span>
    //                     <span class="dot dot2 purple"></span>
    //                     <span class="dot dot3 purple"></span>
    //                     <span class="dot dot4 mint"></span>
    //                 </div>
    //             </div>
    //             <div class="wave_box wave_box2">
    //                 <svg width="100%" height="400" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs></defs><path id="wave2" d="M 0 21.2743 C 541.5 5.6957 541.5 5.6957 1083 13.4851 L 1083 8156.34 L 0 8156.34 Z" fill="transparent"></path></svg>
    //             </div>
    //         </div>
    <section id="intro">
      <div className="intro__inner">
        <div className="title__box">
          <h2 className="intro__title">
            <strong> {introText.title[0]}</strong>
            <strong> {introText.title[1]}</strong>

          </h2>
        </div>


        {/* <div className="intro__lines" aria-hidden="true">
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div> */}
        <div className="intro__text">
          <h3 className="title">{introText.subtitle}</h3>
          <div className="text">
            <div>{introText.desc[0]}</div>
            <div>{introText.desc[1]}</div>
          </div>
          <div className="img">
            <img src={profile} alt="어바웃" />
          </div>
        </div>
        {/* <div className="intro__lines bottom" aria-hidden="true">
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div> */}
      </div>
    </section>
  )
}

export default Intro;