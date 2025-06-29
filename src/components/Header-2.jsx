import React, { useEffect, useRef } from "react";

const HeaderScrollHandler = () => {
  const thisScrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const isScrollTop = window.scrollY;
      const header = document.querySelector("header");

      if (isScrollTop > thisScrollRef.current) {
        // Scroll down
        if (isScrollTop > 0 && header) {
          if (isScrollTop > 100) {
            if (!header.classList.contains("fix")) {
              header.classList.add("hide");
              header.classList.remove("show");
            }
          }
          document.querySelector(".sticky-title")?.classList.add("active");
        }
      } else if (isScrollTop < thisScrollRef.current) {
        // Scroll up
        header?.classList.remove("hide");
        header?.classList.add("show");
        document.querySelector(".sticky-title")?.classList.remove("active");
      }

      if (isScrollTop === 0) {
        header?.classList.remove("show");
      }

      thisScrollRef.current = isScrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 실행

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let pc = window.innerWidth >= 1024 ? 1 : 0;
    let mobile = pc === 0 ? 1 : 0;
    let isResize = false;

    const handleResize = () => {
      const header = document.querySelector("header");
      const isDesktop = window.innerWidth >= 1024;

      if (isDesktop) {
        if (pc === 0) {
          pc = 1;
          isResize = true;
        }

        if (pc === 1 && isResize) {
          header?.classList.remove("on");
          document.body.classList.remove("stop-scroll");

          pc += 1;
          mobile = 0;
        }
      } else {
        if (mobile === 0) {
          mobile = 1;
          isResize = true;
        }

        if (mobile === 1 && isResize) {
          header?.classList.remove("active");
          pc = 0;
          mobile += 1;
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
};

export default HeaderScrollHandler;




// 최종 원본 6/25
import React, { useEffect, useRef, useState } from "react";
import { headerNav } from "../constants";
import useAppStore from "../hooks/useAppStore";
import useScrollBlock from "../hooks/useScrollBlock";
import useIsMobile from "../hooks/useIsMobile";  // useIsMobile 훅 import

const Header = () => {
  const isMobile = useIsMobile();
  const lastScrollYRef = useRef(0); // 이전 스크롤 위치 저장용 ref
  const headerRef = useRef(null);
  const [on, setOn] = useState(false); // 모바일 메뉴 열림 상태
  const [scrollDirection, setScrollDirection] = useState("up"); // 스크롤 방향 상태(up/down)
  const { isHeaderHidden, setHeaderHidden, isScrollDisabled } = useAppStore();
  const isScrollBlocked = useScrollBlock();

  // 모바일 메뉴 토글 함수
  const toggleMenu = () => {
    if (!isMobile) return;
    setOn(prev => !prev);
  };

  // 메뉴 열림 상태에 따라 body에 스크롤 차단 클래스 추가/제거
  useEffect(() => {
    console.log("on 상태 변경:", on);
    if (on) {
      document.body.classList.add("stop-scroll--menu"); // 메뉴 열림 시 스크롤 차단
    } else {
      document.body.classList.remove("stop-scroll--menu");
    }
  }, [on]);

  // 메뉴 외부 클릭 시 메뉴 닫기 처리
  useEffect(() => {
    const handleClickOutside = (e) => {
      const menu = document.querySelector(".header__nav");
      const toggle = document.querySelector("#headerToggle");

      if (
        on && // 메뉴가 열려있고
        menu &&
        toggle &&
        !menu.contains(e.target) && // 클릭 대상이 메뉴 내부가 아니고
        !toggle.contains(e.target) // 토글 버튼도 아닐 때
      ) {
        setOn(false); // 메뉴 닫기
        console.log("외부 클릭으로 메뉴 닫힘");
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [on]);

  // 스크롤 방향 감지 및 헤더 숨김/표시 처리
  useEffect(() => {
    // body data-scroll 속성에 현재 스크롤 방향 설정 (CSS에서 활용 가능)
    document.body.setAttribute("data-scroll", scrollDirection);

    const handleScroll = () => {
      if (isScrollDisabled || isScrollBlocked()) return; // 스크롤 차단 상태면 무시

      const currentScroll = window.scrollY;
      // 현재 스크롤 위치가 이전보다 크면 "down", 작거나 같으면 "up"
      const direction =
        currentScroll > lastScrollYRef.current && currentScroll > 0 ? "down" : "up";

      if (direction !== scrollDirection) {
        setScrollDirection(direction); // 상태 변경
        console.log("setScrollDirection(direction)", direction, direction === "down")
        setHeaderHidden(direction === "down"); // 스크롤 다운 시 헤더 숨김, 업 시 표시
        document.body.setAttribute("data-scroll", direction); // ✅ 속성 업데이트
      }

      lastScrollYRef.current = currentScroll; // 현재 위치 저장
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrollDisabled, isHeaderHidden, setHeaderHidden, scrollDirection, isScrollBlocked]);

  // 모바일 메뉴 클릭 시 닫기
  const handleNavClick = () => {
    setOn(false);
  };

  // 헤더 클래스 이름 조합
  const headerClassName = [
    isHeaderHidden ? "hide" : "show", // 헤더 숨김 상태면 hide 클래스 추가
    isMobile && on ? "on" : "",   // 모바일이고 메뉴 열림 상태면 on 클래스 추가
  ].join(" ").trim();

  return (
    <header id="header" ref={headerRef} className={headerClassName} role="banner">
      <div className="header__inner">
        <h1 className="header__logo">
          <a href="/">Youngsun</a>
        </h1>
        <nav className="header__nav" role="navigation" aria-label="메인메뉴">
          <ul className="nav__wrap">
            {headerNav.map((nav, key) => (
              <li key={key}>
                <a href={nav.url} onClick={handleNavClick}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div
          className="header__nav__mobile"
          id="headerToggle"
          aria-controls="primary-menu"
          aria-expanded={on ? "true" : "false"}
          role="button"
          tabIndex="0"
          onClick={toggleMenu}
          onKeyDown={(e) => {
            // 키보드 접근성 - Enter 또는 Space 키로 메뉴 토글
            if (e.key === "Enter" || e.key === " ") {
              toggleMenu();
            }
          }}
        >
          <span></span>
        </div>
      </div>
    </header>
  );
};

export default Header;


// ----- jQuery
$window.on('scroll', function (e) {
  e.preventDefault();
  var scrollT = $(this).scrollTop();

  // scroll상태 체크
  if (scrollT > currentT) {
    $body.attr('data-scroll', 'down');
  } else if (scrollT < currentT) {
    $body.attr('data-scroll', 'up');
  }
  if (scrollT > 0) {
    if ($body.attr('data-scroll') === 'down') {
      $headerInner.trigger("mouseleave");
      $(this).closest('.search_box').addClass('active');
      $searchWrap.removeClass('on');
      $searchBtn.removeClass('on');
      $searchClose.removeClass('on');
      $header.find('.search_box').removeClass('on');
    }
  } else {
    $wrap.removeClass("header_motion_break");
  }
})

// ----- ES6

let currentT = 0;

window.addEventListener('scroll', (e) => {
  const scrollT = window.scrollY;
  const body = document.body;
  const header = document.querySelector('header');
  const headerInner = header?.querySelector('.header__inner');
  const wrap = document.querySelector('#wrap'); // ID나 클래스명 확인 필요
  const searchBox = document.querySelector('.search_box');
  const searchWrap = document.querySelector('.search_wrap');
  const searchBtn = document.querySelector('.search_btn');
  const searchClose = document.querySelector('.search_close');

  // scroll 상태 체크
  if (scrollT > currentT) {
    body.setAttribute('data-scroll', 'down');
  } else if (scrollT < currentT) {
    body.setAttribute('data-scroll', 'up');
  }

  if (scrollT > 0) {
    if (body.getAttribute('data-scroll') === 'down') {
      // headerInner mouseleave 트리거 (유사한 동작을 명시적으로 처리해야 함)
      headerInner?.dispatchEvent(new Event('mouseleave'));

      searchBox?.classList.add('active');
      searchWrap?.classList.remove('on');
      searchBtn?.classList.remove('on');
      searchClose?.classList.remove('on');
      header?.querySelector('.search_box')?.classList.remove('on');
    }
  } else {
    wrap?.classList.remove('header_motion_break');
  }

  currentT = scrollT;
});



//------ React
useEffect(() => {
  const handleScroll = () => {
    const currentScroll = window.scrollY;
    const direction = currentScroll > thisScrollRef.current ? "down" : "up";

    if (direction !== scrollDirection) {
      setScrollDirection(direction);
    }

    thisScrollRef.current = currentScroll;
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [scrollDirection]);

// scrollDirection 값이 바뀔 때 body에 반영
useEffect(() => {
  document.body.setAttribute("data-scroll", scrollDirection);
}, [scrollDirection]);


//------  React 컴포넌트
/* 
function ScrollDirectionHandler() { ... } 또는 const ScrollDirectionHandler = () => { ... }
→ 이것은 React 컴포넌트입니다.

다만 이 컴포넌트는 UI를 렌더링하지 않고 **사이드 이펙트(부수 효과)**만 처리하는 "비시각적 컴포넌트" 역할을 합니다.


- React 컴포넌트	
JSX를 반환하거나 UI 없이 상태나 사이드 이펙트를 다룰 수 있음 (useEffect, useState 등 사용 가능)

- 훅 함수 (custom hook)	
useScrollDirection()처럼 use로 시작하는 함수, 컴포넌트 내부에서만 호출 가능

- 콜백 함수	
어떤 이벤트나 함수 안에서 전달되는 일반적인 함수 (onClick={() => ...} 등) 
*/


import React, { useEffect, useRef, useState } from "react";

const ScrollDirectionHandler = () => {
  // 스크롤 방향을 상태로 관리 ("up" 또는 "down")
  const [scrollDirection, setScrollDirection] = useState("up");

  // 이전 스크롤 위치를 저장할 ref (렌더링과 무관)
  const prevScrollYRef = useRef(0);

  useEffect(() => {
    // 스크롤 이벤트 핸들러 함수
    const handleScroll = () => {
      const currentScrollY = window.scrollY; // 현재 스크롤 위치
      const prevScrollY = prevScrollYRef.current; // 이전 스크롤 위치

      // 스크롤 방향 계산
      const direction = currentScrollY > prevScrollY ? "down" : "up";

      // 방향이 바뀌었을 경우에만 상태 업데이트 (이전 방향과 다를 때만 업데이트하여 불필요한 렌더링 방지)
      if (direction !== scrollDirection) {
        setScrollDirection(direction);
      }

      // 현재 스크롤 값을 ref에 저장 (다음 이벤트 대비)
      prevScrollYRef.current = currentScrollY;
    };

    // 스크롤 이벤트 등록
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트 언마운트 시 이벤트 제거 (메모리 누수 방지)
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollDirection]); // scrollDirection이 바뀔 때마다 이 useEffect 재실행

  useEffect(() => {
    // scrollDirection 상태가 바뀔 때 <body>에 속성 설정 
    // (DOM 조작으로 <body data-scroll="..."> 설정)
    document.body.setAttribute("data-scroll", scrollDirection);
  }, [scrollDirection]);

  return null; // 이 컴포넌트는 화면에 아무것도 렌더링하지 않음
};

export default ScrollDirectionHandler;

function App() {
  return (
    <>
      <Header />
      <ScrollDirectionHandler /> {/* 이 컴포넌트는 렌더링 없이 스크롤 방향만 추적 */}
      <Main />
    </>
  );
}



//------------


useEffect(() => {

  const handleScroll = () => {



    const headerEl = headerRef.current;

    const isMenuOpen =
      headerEl?.classList.contains("on") &&
      document.querySelector(".header__nav__mobile")?.getAttribute("aria-expanded") === "true" &&
      document.body.classList.contains("stop-scroll");


    console.log("headerRef.current", headerEl)
    console.log("이전 스크롤 위치 저장 thisScrollRef.current", thisScrollRef.current, "isMenuOpen", isMenuOpen)
    console.log(`웹 브라우저 창 위쪽 면과 모니터 사이의 간격: ${window.screenTop}/${window.screenY}`);
    console.log('세로 스크롤에 의해 가려진 위쪽 영역 높이 window.pageYOffset : ' + window.pageYOffset);
    console.log('가로 스크롤에 의해 가려진 왼쪽 영역 너비 window.pageXOffset: ' + window.pageXOffset);



    // 메뉴 열림 or 최상단이면 헤더를 반드시 보여줌
    if (isMenuOpen || currentScroll === 0) {
      if (isHeaderHidden) setHeaderHidden(false);
      thisScrollRef.current = currentScroll;
      return;
    }

    // fix 클래스가 없고 특정 위치 이상이면 헤더를 반드시 보여줌
    // if (currentScroll > 100 && headerEl && !headerEl.classList.contains("fix")) {
    //   if (isHeaderHidden) setHeaderHidden(false);
    //   thisScrollRef.current = currentScroll;
    //   return;
    // }

    // const direction = currentScroll > thisScrollRef.current && currentScroll > 0 ? "down" : "up";


    document.body.setAttribute("data-scroll", scrollDirection); // 초기값 설정
    // 스크롤 방향이 바뀐 경우에만 상태 업데이트
    if (direction !== scrollDirection) {
      setScrollDirection(direction);


      // const shouldHide = direction === "down";
      // if (isHeaderHidden !== shouldHide) {
      //   setHeaderHidden(shouldHide);
      // }
      setHeaderHidden(direction === "down");
    }

    thisScrollRef.current = currentScroll;
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, [isScrollDisabled, isHeaderHidden, scrollDirection, setHeaderHidden]);