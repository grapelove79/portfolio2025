import React, { useEffect, useRef, useState } from "react";
import { headerNav } from "../constants";
import useAppStore from "../hooks/useAppStore";
import useIsMobile from "../hooks/useIsMobile";

/**
 * Header Component
 *
 * 스크롤 방향 감지 → down 시 hide, up 시 show
 * IntersectionObserver로 배너 감지 → 배너가 뷰포트 안이면 show
 * 스크롤 최상단이면 무조건 show
 * 모바일 메뉴 오픈 시 body scroll lock
 */

const Header = ({ threshold = 5 }) => {
  // 모바일 메뉴 on/off 상태
  const [on, setOn] = useState(false);

  // 현재 스크롤 방향 ('up' | 'down')
  const [scrollDirection, setScrollDirection] = useState("up");

  // header DOM 참조
  const headerRef = useRef(null);

  // 배너 영역 참조 (배너 DOM 전달받거나 여기서 직접 할당)
  const bannerRef = useRef(null);

  // 마지막 스크롤 위치 기억 (렌더링과 무관)
  const lastScrollYRef = useRef(0);

  // 모바일 여부 hook
  const isMobile = useIsMobile();

  // 글로벌 상태 (Header show/hide)
  const { isHeaderHidden, setHeaderHidden, isScrollDisabled } = useAppStore();

  /**
   * 모바일 메뉴가 열리면 body 스크롤 방지 클래스 추가/제거
   */
  useEffect(() => {
    document.body.classList.toggle("stop-scroll", on);
  }, [on]);

  /**
   * 메뉴 외부 클릭 시 모바일 메뉴 닫기
   */
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

  /**
   * 스크롤 방향 감지 + 최상단 시 무조건 show
   */
  useEffect(() => {
    let ticking = false; // requestAnimationFrame 중복 방지

    const handleScroll = () => {
      if (isScrollDisabled) return; // ScrollTrigger 등에서 스크롤 비활성화 시 무시
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        const currentScroll = window.scrollY || window.pageYOffset;

        // 스크롤바 최상단이면 무조건 Header 표시
        if (currentScroll <= 0) {
          setHeaderHidden(false);
          ticking = false;
          return;
        }

        const diff = currentScroll - lastScrollYRef.current;

        // 미세 스크롤 변화는 무시
        if (Math.abs(diff) < threshold) {
          ticking = false;
          return;
        }

        // 방향 계산 (down이면 숨김, up이면 표시)
        const direction = diff > 0 ? "down" : "up";

        if (scrollDirection !== direction) {
          setScrollDirection(direction);
          setHeaderHidden(direction === "down");
        }

        lastScrollYRef.current = currentScroll;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrollDisabled, scrollDirection, setHeaderHidden, threshold]);

  /**
   * IntersectionObserver: 배너가 보이면 show, 안 보이면 hide
   * (단, 스크롤 최상단이면 무조건 show)
   */
  useEffect(() => {
    const banner = bannerRef?.current;
    if (!banner) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (window.scrollY <= 0) {
          setHeaderHidden(false);
        } else {
          setHeaderHidden(!entry.isIntersecting);
        }
      },
      { threshold: 0 }
    );

    observer.observe(banner);
    return () => observer.disconnect();
  }, [setHeaderHidden]);

  /**
   * 현재 스크롤 방향을 body data-scroll 속성에 반영 (디자인 활용 가능)
   */
  useEffect(() => {
    document.body.setAttribute("data-scroll", scrollDirection);
  }, [scrollDirection]);

  /**
   * 메뉴 항목 클릭 시 모바일 메뉴 닫기
   */
  const handleNavClick = () => setOn(false);

  /**
   * 모바일 메뉴 토글
   */
  const toggleMenu = () => {
    if (isMobile) setOn((prev) => !prev);
  };

  /**
   * header CSS class 동적 구성
   */
  const headerClassName = [
    isHeaderHidden ? "hide" : "",
    isMobile && on ? "on" : "",
  ].join(" ").trim();

  return (
    <header
      id="header"
      ref={headerRef}
      className={headerClassName}
      role="banner"
    >
      <div className="header__inner">
        {/* Logo */}
        <h1 className="header__logo">
          <a href="/">Youngsun</a>
        </h1>

        {/* GNB */}
        <nav
          className="header__nav"
          role="navigation"
          aria-label="메인메뉴"
        >
          <ul className="nav__wrap">
            {headerNav.map((nav, idx) => (
              <li key={idx}>
                <a href={nav.url} onClick={handleNavClick}>
                  {nav.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Toggle */}
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
