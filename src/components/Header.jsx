import React, { useEffect, useRef, useState } from "react";
import { headerNav } from "../constants";
import useAppStore from "../hooks/useAppStore";
import useIsMobile from "../hooks/useIsMobile";


/**
* 스크롤 방향을 감지합니다.
* - 일정 threshold(px)를 넘는 스크롤 이동이 발생할 때만 방향을 업데이트합니다.
* @param {number} threshold - 방향 감지를 위한 최소 스크롤 변화값 (기본값: 5px)
* @returns {string} scrollDirection - 현재 스크롤 방향 ('up' 또는 'down')
* @returns {string} requestAnimationFrame 으로 스크롤 이벤트 당 최대 1번만 DOM 접근 → 강제 Reflow 방지.
*/

const Header = ({ threshold = 5 }) => {
  const [on, setOn] = useState(false); // 모바일 메뉴 상태
  const [scrollDirection, setScrollDirection] = useState("up"); // 스크롤 방향 상태 관리 ("up" 또는 "down")
  const headerRef = useRef(null);  // header DOM 참조
  const { isHeaderHidden, setHeaderHidden, isScrollDisabled } = useAppStore();
  const isMobile = useIsMobile();
  //const prevScrollYRef = useRef(0); // 이전 스크롤 위치 저장할 ref (렌더링과 무관)
  //const lastScroll = useRef(window.scrollY); // 이전 스크롤 위치 저장 (렌더링과 무관)
  const lastScrollYRef = useRef(0); // 이전 스크롤 위치 저장용 ref

  // 메뉴 토글
  const toggleMenu = () => {
    if (!isMobile) return;
    setOn(prev => !prev);
  };

  // 모바일 메뉴 열릴 때 body 스크롤 방지 클래스 추가/제거
  useEffect(() => {
    const body = document.body;
    on ? body.classList.add("stop-scroll") : body.classList.remove("stop-scroll");
  }, [on]);

  // 외부 클릭 시 모바일 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      const menu = document.querySelector(".header__nav");
      const toggle = document.querySelector("#headerToggle");

      if (
        on &&
        menu &&
        toggle &&
        !menu.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        setOn(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [on]);


  // 스크롤 방향 감지 및 헤더 show/hide 처리
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      // if (isScrollDisabled) return; // GSAP ScrollTrigger 내에서는 감지 OFF
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        const currentScroll = window.scrollY;
        const diff = currentScroll - lastScrollYRef.current; // 이전과 현재 차이 계산

        // 스크롤 변화량이 threshold보다 작으면 방향 판단하지 않음 (작은 흔들림 무시)
        if (Math.abs(diff) < threshold) return;

        // 현재 방향 판단 (양수면 down, 음수면 up)
        const direction = diff > 0 ? "down" : "up";
        // const direction = currentScroll > prevScrollYRef.current ? "down" : "up";

        // 방향이 이전 상태와 다를 때만 상태 업데이트
        /* 방법1 
          불필요한 리렌더링을 방지합니다.
          scrollDirection이 바뀌지 않으면 setHeaderHidden도 실행되지 않음.
          특히 연속된 scroll 이벤트에서 최소한의 setState만 발생시켜 퍼포먼스에 유리합니다.
        */
        // setScrollDirection((prev) => {
        //   // 현재 방향이 이전 방향과 다를 때만 상태 업데이트
        //   if (prev !== direction) {
        //     setHeaderHidden(direction === "down"); // 스크롤 방향이 down이면 헤더 숨김
        //     return direction; // scrollDirection 상태를 업데이트
        //   }
        //   return prev; // 이전 방향과 같으면 상태 변경 없이 그대로 유지
        // });

        // 방법 2: 방향이 이전 상태와 다를 때만 상태 업데이트
        if (scrollDirection !== direction) {
          setScrollDirection(direction); // 스크롤 방향 상태 업데이트
          setHeaderHidden(direction === "down"); // 스크롤 방향이 down이면 헤더 숨김
        }

        // 현재 위치를 이전 스크롤 위치로 저장
        lastScrollYRef.current = currentScroll;
        // prevScrollYRef.current = currentScroll;
      })

      ticking = false;
    };

    // 스크롤 이벤트 등록 (passive: true → 성능 최적화)
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrollDisabled, scrollDirection, setHeaderHidden, threshold]); // threshold가 바뀌면 다시 실행됨

  // scrollDirection 값이 바뀔 때 body에 반영
  useEffect(() => {
    document.body.setAttribute("data-scroll", scrollDirection)
  }, [scrollDirection]);

  // 모바일 메뉴 클릭 시 메뉴 닫기
  const handleNavClick = () => setOn(false);

  // 헤더 클래스명 구성
  const headerClassName = [
    isHeaderHidden ? "hide" : "",
    isMobile && on ? "on" : "",
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
                <a
                  href={nav.url}
                  onClick={handleNavClick}
                >
                  {nav.title}
                </a>
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
            if (e.key === "Enter" || e.key === " ") toggleMenu();
          }}
        >
          <span></span>
        </div>
      </div>
    </header>
  );
};

export default Header;