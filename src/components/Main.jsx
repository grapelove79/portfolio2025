import React, { useRef } from "react";

const Main = ({ children }) => {
  const mainRef = useRef(null);

  return (
    <main id="main" role="main" ref={mainRef} >
        { children }
    </main>
  )
}

export default Main;