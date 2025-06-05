import React, { useLayoutEffect, useRef } from "react";
import { skillText } from "../constants";
import skill01 from "../assets/img/ico_html.svg";
import skill02 from "../assets/img/ico_css.svg";
import skill03 from "../assets/img/ico_js.svg";
import skill04 from "../assets/img/ico_jquery.svg";
import skill05 from "../assets/img/ico_sass.svg";
import skill06 from "../assets/img/ico_vs.svg";
import skill07 from "../assets/img/ico_git.svg";
import skill08 from "../assets/img/ico_github.svg";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Skill = () => {
  const skillRef = useRef(null);
  const listRefs = useRef([]); // 여러 li 요소를 담는 배열

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      listRefs.current.forEach((el) => {
        if (!el) return;

        const triggerBox = el.querySelector(".trigger__box");

        ScrollTrigger.create({
          trigger: triggerBox,
          start: "top 80%",
          invalidateOnRefresh: true,
          markers: true,
          // onEnter: () => {
          //   el.classList.add("active");
          // },
          // onLeaveBack: () => {
          //   el.classList.remove("active"); // 이걸 유지해야 할까?
          // },
          onEnter: () => {
            gsap.to(el.querySelector(".img__box"), {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out"
            });
          },
          onLeaveBack: () => {
            gsap.to(el.querySelector(".img__box"), {
              y: 99,
              opacity: 0,
              duration: 0.6,
              ease: "power2.out"
            });
          }
        });
      });
    }, skillRef);

    return () => ctx.revert();
  }, []);


  const skillIcons = [skill01, skill02, skill03, skill04, skill05, skill06, skill07, skill08];


  return (
    <section id="skill" >
      <div className="skill__inner">
        <h2 className="skill__title">Skills <em>나의 도전</em></h2>
        <div className="skill__desc">
          {skillText.map((skill, key) => (
            <div key={key}>
              <span>{key + 1}.</span>
              <h3>{skill.title}</h3>
              <p>{skill.desc}</p>
            </div>
          ))}
          <ul className="skill__list" ref={skillRef}>
            {skillIcons.map((icon, index) => (
              <li key={index} ref={el => listRefs.current[index] = el}>
                <span className="trigger__box"></span>
                <span className="img__box"><img className="skill__img" src={icon} alt="skill icon" /></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Skill;
//---------------------------
// port 참고
   // The way We work
$(window).on("resize", function(){
  _workW = $(".work-list-wrap").innerWidth();      // 가로 스크롤 대상의 전체 너비
  _innerW = $(".section .title-wrap").innerWidth(); // 기준이 되는 내부 섹션의 너비
  ScrollTrigger.refresh();                          // ScrollTrigger 재계산 (스크롤 높이 등)
}).resize(); // 페이지 로드시 즉시 실행

      gsap.to(".work-list-wrap", {
        scrollTrigger: {
          trigger: ".work-fixed",  // 스크롤 트리거 기준 요소
          start:() => "top top",    // 트리거가 화면 상단에 닿을 때 시작
          end:() => "bottom+=150% bottom", // 콘텐츠가 화면 하단에서 150% 더 아래까지 갈 때 끝. 하단에 위치한 배가 잘려보이지 않기 위해 어쩔 수 없이 %로 계산
          // markers: true,
          pin: true,    // `.work-fixed`를 고정 (핀 효과)
          scrub: 1,     // 부드러운 스크러빙 효과
          invalidateOnRefresh: true,     // 새로고침 시 계산 다시
          // 현재 스크롤 진행률에 따라 x축으로 `.work-list-wrap`을 이동
          onUpdate:function(self){
            gsap.to($(".work-list-wrap"), 0.2, {x:self.progress.toFixed(3) * (-(($(window).innerWidth() - _innerW)) - (_workW - $(window).innerWidth()))})
          }
        },
      });


//---------------------------


    hanatour.utils.menuLnb(2,'2-1');
    // hanatour.utils.confirmpopup(".service_layer_popup", ".service_popup_open", true);

    let MediaQueryMatch = gsap.matchMedia();
    var kvSwiper = undefined;

    // kv motion
    var interleaveOffset = 0.5,
        Speed = 1000,
        autoPlaySpeed = 3000,
        activeIdx = 0;

    var margin, marginTop, startVal;
    function bgMarginTop(){
        if($(window).width() < 1024){
            // 태블릿 간격
            margin = 42;
        } else if ($(window).width() < 768){
            // 모바일 간격
            margin = 32;
        } else{
            // PC 간격
            margin = 52;
        }
        marginTop = margin;
        $('.kv_inner').css({"margin-top":marginTop,"visibility":"visible"});

        //start 위치값 구하기
        if($(window).width() > 1023){
            startVal = (($('.kv_inner').offset().top - margin) / $(window).height()) * 100;	
            sec_visual.vars.scrollTrigger.start = 'top '+ startVal +'%';
        }else{
            startVal = (($('.kv_inner').offset().top - (margin + 10)) / $(window).height()) * 100;	
        }
    }
    $(document).ready(function(){
        bgMarginTop();
    });
    $(window).on("load resize", function(){
        bgMarginTop();

    });

    var flag = true;
    var stopFlag = true;
    var swiperOptions = {
        init: false,
        speed: Speed,
        slidesPerView: 1,
        direction: 'horizontal',
        parallax: true,
        mousewheel: true,
        mousewheelControl: true,
        observer: true,
        obsreveParents: true,
        watchOverflow : true,
        on: {
            progress: function() {
                if($(window).width() > 1024 && !isTouchDevice ) {
                    for (var i = 0; i < kvSwiper.slides.length; i++) {
                        var slideProgress = kvSwiper.slides[i].progress,
                        innerOffset = kvSwiper.width * interleaveOffset,
                        innerTranslate = slideProgress * innerOffset;
                        $('.kv_container').find('.swiper-slide').eq(i).find('.bg_inner').css({"transform":"translate3d(" + innerTranslate + "px, 0, 0)"});
                    }
                } 
                else {
                    $('.kv_container').find('.swiper-slide').eq(i).find('.bg_inner').css({"transform":"translate3d(0, 0, 0)"});
                }
            },
            touchStart: function() {
                for (var i = 0; i < kvSwiper.slides.length; i++) {
                    kvSwiper.slides[i].style.transition = "";
                }
            },
            setTransition: function(speed) {
                for (var i = 0; i < kvSwiper.slides.length; i++) {
                    $('.kv_container').find('.swiper-slide').eq(i).css({"transition":"all "+ speed +"ms"+ " ease 0s"});
                    $('.kv_container').find('.swiper-slide').eq(i).find('.bg_inner').css({"transition":"all "+ speed +"ms"+ " ease 0s"});
                }
            },
            reachEnd: function() {
                setTimeout(function () {
                    kvSwiper.params.touchReleaseOnEdges = true;
                    kvSwiper.params.mousewheel.releaseOnEdges = true;
                }, 50);
            },
            reachBeginning: function() {
                setTimeout(function () {
                    kvSwiper.params.touchReleaseOnEdges = true;
                    kvSwiper.params.mousewheel.releaseOnEdges = true;
                }, 50);
            },
            slideChange: function() {
                activeIdx = this.realIndex;
            },
            slideChangeTransitionStart: function(){
                activeIdx = this.realIndex;

                if(activeIdx != 0 || activeIdx != $('.kv_container').find(".swiper-slide").length - 1){
                    stopFlag = false;
                }
            },
            slideChangeTransitionEnd: function(){
                activeIdx = this.realIndex;

                if(activeIdx == 0 || activeIdx == $('.kv_container').find(".swiper-slide").length - 1){
                    stopFlag = true;
                }
            }
        },
    };

    function kvSwiperEvent() {
        if(windowWidth < 1024 && isTouchDevice && kvSwiper !== undefined) {
            // tablet, m
            kvSwiper.destroy();
            kvSwiper = undefined;
            lenis.start();

        } else if(windowWidth >= 1024 && !isTouchDevice && kvSwiper == undefined) {
           // pc
           kvSwiper = new Swiper(".kv_container", swiperOptions);
           kvSwiper.autoplay.stop();
        }
    }
    kvSwiperEvent();

    $(window).on('resize', function() {
        kvSwiperEvent();
    })

    
    ScrollTrigger.observe({
        target: '.kv_container',
        type: "wheel,touch",
        onUp:function(){
            if(windowWidth > 1023 && !isTouchDevice){
                if(stopFlag && activeIdx == 0){
                    if(lenis){
                        lenis.start();
                    }
                    setTimeout(function(){
                        $('.slide_dim').removeClass('on');
                    },200);
                }
            }
        },
        onDown:function(){
            if(windowWidth > 1023 && !isTouchDevice){
                if(stopFlag && activeIdx == $('.kv_container').find(".swiper-slide").length - 1){
                    if(lenis){
                        lenis.start();
                    }
                    setTimeout(function(){
                        $('.slide_dim').removeClass('on');
                    },200);
                }
            }
        },
    })

    var scrollStop = { //스크롤 stop
        true: function(){
            if(lenis){
                lenis.stop();
            }
            stopFlag = true;
            setTimeout(function(){
                $('.slide_dim').addClass('on');
            },200);
        },
        false: function(){
            if(lenis){
                lenis.start();
            }
            stopFlag = false;
            setTimeout(function(){
                $('.slide_dim').removeClass('on');
            },200);
        }
    };

    ScrollTrigger.matchMedia({
        "(min-width: 1025px) and (pointer: fine)": function() {
            pinMotion = gsap.timeline({
                scrollTrigger: {
                    id: 'pin',
                    trigger: '.kv_container',
                    pin:true,
                    start:'top top',
                    end:'70% top',
                    scrub: 0.5,
                    invalidateOnRefresh:true,
                    onEnter: function() {
                        scrollStop.true();
                    },
                    onEnterBack:function(){
                        scrollStop.true();
                    },
                    onLeave:function(){
                        scrollStop.false();
                    },
                    onLeaveBack:function(){
                        scrollStop.false();
                    },
                    onUpdate:function(self){
                        var degree = self.progress * 100;
                        var progress = Math.floor(degree);
                        if(self.direction == -1){
                            // up
                            if(stopFlag && activeIdx != 0){
                                scrollStop.true();
                            }
                        }
                        else if(self.direction == 1){
                            // down
                            if(stopFlag && activeIdx != $('.kv_container').find(".swiper-slide").length - 1){
                                scrollStop.true();
                            }
                        }
                    }
                }
            })
            gsap.set([".kv_container"],{clearProps:"all"});
        }
    })
    
    var sec_visual = gsap.timeline({
        scrollTrigger: {
            id: 'visual',
            trigger: '.sec_visual .kv_container',
            end: 'bottom bottom',
            toggleActions: "play reset play reset",
            scrub:1,
            invalidateOnRefresh:true,
            onLeave: function() {
                if($(window).width() > 1024 && !isTouchDevice ) {
                    kvSwiper.allowTouchMove = true;
                    kvSwiper.init();
                }
            },
            onLeaveBack: function() {
                if($(window).width() > 1024 && !isTouchDevice ) {
                    kvSwiper.allowTouchMove = false;
                }
            },
        }
    })
    
    function timelineMotion(height) {
        sec_visual
            .to('.sec_visual .bg_inner', {width: '100%', height: height})
            .to('.sec_visual .bg', {borderRadius: 0, duration: 0.3})
            .to('.sec_visual .bg_txt', {className:'bg_txt active' })

        return sec_visual;
    }

    MediaQueryMatch.add('(min-width: 1023px) and (pointer: fine)', () => {
        sec_visual.scrollTrigger.vars.start = "top 20%";
        
        timelineMotion('100vh');
    })
    MediaQueryMatch.add('(min-width: 768px) and (max-width: 1366px) and (pointer: coarse), (min-width: 768px) and (max-width: 1024px)', () => {
        sec_visual.scrollTrigger.vars.start = "top 20%";
        sec_visual.scrollTrigger.vars.end = "20% 80%";
        
        timelineMotion('80vh');
    })
    MediaQueryMatch.add('(max-width: 767px)', () => {
        sec_visual.scrollTrigger.vars.start = "top 30%";
        sec_visual.scrollTrigger.vars.end = "20% 80%";

        timelineMotion('100%');
    })


    sec01Trigger =   gsap.timeline({
        scrollTrigger: {
            id: 'sec01',
            trigger: '.sec01',
            start: 'top top',
            end: 'bottom bottom',
            scrub:1,
            invalidateOnRefresh:true,
            onEnter: function() {
                if($(window).width() > 1024 && !isTouchDevice ) {
                    kvSwiper.allowTouchMove = false;
                }
            },
            onLeaveBack: function() {
                if($(window).width() > 1024 && !isTouchDevice ) {
                    kvSwiper.allowTouchMove = true;
                }
            },
        } 
    })
   

    // sec01 
    // 여행서비스 브랜드 
    var brandList = gsap.utils.toArray('.brand_lists li');
    brandList.forEach((elem, i) => {
        var brandTl = gsap.timeline({
            scrollTrigger: {
                trigger: $(elem).find('.trigger_box'),
                start: 'top 80%',
                invalidateOnRefresh: true,
                onEnter: () => {
                    $(elem).addClass('active');
                }
            }
        })
    })


    
    var $serviceLayerPopup = $('.container_popup'),
        $popupItem = $serviceLayerPopup.find('.popup'),
        scrollOffset;

    var popupDataList = [

        
        {   
            brandIdx: 1,
            brandTxt: '여행의 본질에 집중하다.',
            brandTitle: '하나팩2.0',
            brandSubTxt: '고객의 다양한 피드백을 반영하여 패키지여행의 아쉬움은 덜어내고, 여행의 본질에 집중할 수 있는 패키지여행입니다.',
            brandContentList: [
                
                {
                    tit: '1. 기존 패키지의 불편함을 개선하여 온전히 여행에만 집중할 수 있는 패키지 여행입니다.',
                    text: '단체여행객을 위한 쇼핑센터 일정은 제외하고 가이드&기사 경비는 상품가에 포함하였습니다. 더불어 선택관광은 합리적인 가격으로 인하하였습니다.<br><br>'
                },
                
                {
                    tit: '2. 여행지일정은 여유롭게, 시내 중심 호텔 숙박, 핫플레이스, 현지 맛집을 포함하여 여행의 본질에 집중할 수 있게 구성하였습니다.',
                    text: ''
                },
                
            ],
        },
        
        {   
            brandIdx: 2,
            brandTxt: '오직 우리만을 위한 프라이빗&맞춤여행',
            brandTitle: '우리끼리',
            brandSubTxt: '',
            brandContentList: [
                
                {
                    tit: '하나투어는 패키지여행의 장점과 자유여행의 장점을 더해 가족끼리, 친구끼리 누구나 &lsquo;우리끼리&rsquo; 여행할 수 있는 단독 여행 상품을 제공하고 있습니다. 단독 가이드&차량으로 프라이빗한 여행을 즐길 수 있습니다.',
                    text: ''
                },
                
            ],
        },
        
        {   
            brandIdx: 3,
            brandTxt: '하나투어가 드리는 최고의 럭셔리 맞춤여행 브랜드',
            brandTitle: '제우스',
            brandSubTxt: '상위 1% 고객을 타깃으로 하는 하나투어의 &lsquo;하이엔드&rsquo; 여행 브랜드입니다',
            brandContentList: [
                
                {
                    tit: '전 일정 오더메이드를 통해, 고객의 취향에 맞는 차별화된 나만의 여행을 만들 수 있고, 전담 컨시어지 서비스를 통해 여행의 시작부터 끝까지 전문적이고 세심한 서비스를 제공합니다.',
                    text: ''
                },
                
            ],
        },
        
        {   
            brandIdx: 4,
            brandTxt: '',
            brandTitle: '개런티 프로그램',
            brandSubTxt: '약속한 여행이 지켜질 수 있도록 하나투어가 약속한 여행을 100% 보장할 수 있도록, <br>고객님의 여행을 소중하게 생각 하는 하나투어의 진심을 담았습니다.',
            brandContentList: [
                
                {
                    tit: '개런티 프로그램은 여행의 처음부터 끝까지 고객님의 소중한 여행을 보장하기 위한 프로그램입니다.',
                    text: '1. 변경/오류 없는 정확한 여행일정표 제공(관광진흥법에 의거한 필수 고지 안내)<br>2. 상담 시 빠짐없이 정확한 상품 안내(여행약관 교부, 여행계약서 체결)<br>3. 여행 일정표에 준수한 여행 제공.<br>더불어 하나팩 2.0(프리미엄, 스탠다드), 가이드 동반 해외 골프 상품 대상으로 일정표에 없는 비용 발생 시 100% 보상해드립니다.'
                },
                
            ],
        },
        
        {   
            brandIdx: 5,
            brandTxt: '하나투어에서만 만나볼 수 있는 꿈을 담은 특별한 여행',
            brandTitle: '하나 Original',
            brandSubTxt: '여행자의 꿈을 담은 특별한 여행 상품입니다.',
            brandContentList: [
                
                {
                    tit: '이색적인 경험을 즐기거나, 궁전 또는 코끼리 방갈로 등 특별한 곳에 머무는 여행, 취향이 비슷한 사람들이 모여 떠나는 여행, 환경친화적인 체험 여행 등을 제공하고 있습니다.',
                    text: ''
                },
                
            ],
        },
        
        {   
            brandIdx: 6,
            brandTxt: '내가 원하는 상품으로 자유롭게 구성할 수 있는 하나투어',
            brandTitle: '하나투어 자유여행',
            brandSubTxt: '하나투어는 개별여행객들에게 다양한 노선과 경쟁력 있는 가격으로 항공 / 호텔 / 결합 상품 등을 판매하고 있습니다.',
            brandContentList: [
                
                {
                    tit: '1. 항공',
                    text: '전 세계 105개 항공사에 공급받는 660만 좌석을 바탕으로, 연간 356만 석을 판매하고 있습니다. (*2019년 기준)'
                },
                
                {
                    tit: '2. 호텔',
                    text: '전 세계 40만 개 호텔 인벤토리를 확보하고 있으며, 연간 315,309박을 판매하고 있습니다. (*2019년 기준)<br><br>'
                },
                
                {
                    tit: '3. 결합상품',
                    text: '하나투어의 경쟁력 있는 상품 요소들을 모아, 고객이 선택할 수 있도록 결합상품을 구성/판매하고 있습니다. <br>항공+호텔을 결합한 &lsquo;내맘대로&rsquo;, 숙박+현지투어를 포함한 &lsquo;현지투어 플러스&lsquo;, 숙박 미포함 일일 투어 등 다양한 형태의 자유여행 상품을 제공하고 있습니다. '
                },
                
            ],
        },
        
    ]


    
    $(document).on('click', '.brand_lists li', function(e) {
        $this = $(this);
        var brandListIdx = $this.data('idx');
        var brandData;
        var liTag = '';

        popupDataList.forEach((item, idx) => {
            var arrItemIdx = item.brandIdx;

            if(brandListIdx === arrItemIdx) {
                brandData = item;
            }
        })

        $('.service_layer_popup').addClass('active');
        hanatour.utils.enterkey($('.service_layer_popup'));
        if(windowWidth > 1023 && !isTouchDevice){
            lenis.stop();
        }

        scrollOffset = $(window).scrollTop();
        $("html,body").addClass("overflow");
        

        brandData.brandContentList.forEach((elem, idx) => {
            var pTag;
            var strongTag;
          
            strongTag = elem.tit ? `<strong>${elem.tit}</strong>` : '';
            pTag = elem.text ? `<p>${elem.text}</p>` : '';

            liTag += 
                `<li>
                    ${strongTag}
                    ${pTag}
                </li>`
        })

        $popupItem.empty();
        var _html = 
            `<div class="inner">
                <!-- content here -->
                <div class="popup_tit">
                    <span>${brandData.brandTxt}</span>
                    <strong>${brandData.brandTitle}</strong>
                    <p class="brand_text">${brandData.brandSubTxt}</p>
                </div>
                <div class="contents_box">
                    <ol>
                        ${liTag}
                    </ol>
                </div>
            </div>`
        $popupItem.append(_html);
    })


    $('.service_layer_popup').find('.popup_close_btn').on("click", function (e) {
        e.preventDefault();
        $('.service_layer_popup').scrollTop(0);
        $('.service_layer_popup').removeClass("active");
        if(windowWidth > 1023 && !isTouchDevice){
            lenis.start();
        }
        $("html,body").removeClass("overflow");
        $(window).scrollTop(scrollOffset);
        
    });

    $("body").on("click", function (e) {
        if(e.target.className.includes('container_popup')){
            $('.service_layer_popup').find('.popup_close_btn').trigger('click');
        }
    });


    // sec02 banner slide
    var bannerSlideFlag = true;

    if($('.sec02 .service_slider').find('.swiper-slide').length <= 1) {
        bannerSlideFlag = false;
    }

    var sec02Swiper = new Swiper('.sec02 .swiper-container', {
        slidesPerView: 'auto',
        loop: bannerSlideFlag,
        speed: 1000,
        watchOverflow : true, // 슬라이드가 1개 일 때 pager 숨김 여부 설정
        allowTouchMove: bannerSlideFlag, // false시에 스와이핑이 되지 않으며 버튼으로만 슬라이드 조작이 가능
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },
        spaceBetween: 25,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    })

    hanatour.utils.secCommonBannerTrigger('.sec02 .service_slider', sec02Swiper);

