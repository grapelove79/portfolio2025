import React, { useState } from "react";
import { headerNav } from "../constants";

const Header = () => {
  const [show, setShow] = useState(false);

  const toggleMenu = () => {
    // useState가 기본값이 false이기 때문에 
    // prevShow가 false 이면 => prevShow를 반대(!)로 true 로 해주고, 
    // prevShow가 true 이면 => prevShow를 반대(!)로 false 로 해줘라!
    setShow((prevShow) => !prevShow)
  }

  return (
    <header id="header" role="banner">
      <div className="header__inner">
        <div className="header__logo">
          <h1>
            <a href="/">portfolio</a>
          </h1>
        </div>
        {/* show의 값이 true 면 show 가 붙고 아니면 아무것도 없게 "" 처리  */}
        <nav 
        className={`header__nav ${show ? "show" : ""}`} 
        role="navigation" 
        aria-label="메인메뉴"
        > 
          <ul>
            {headerNav.map((nav, key) => (
              <li key={key}>
                  <a href={nav.url}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div 
          className="header__nav__mobile" 
          id="headerToggle"
          aria-controls="primary-menu"
          aria-expanded={show ? "ture" : "false"}
          role="button"
          tabIndex="0"
          onClick={toggleMenu}
        >
          <span></span>
        </div>
      </div>
    </header>
  )
}

export default Header;