import React, { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';

function ResponsiveText({ text, as: Element = 'p', ...restProps }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = debounce(() => {
      setIsMobile(window.innerWidth <= 600);
    }, 200);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      handleResize.cancel();
    };
  }, []);

  const lines = isMobile ? [text] : text.split('\n');

  return (
    <>
      {lines.map((line, index) => (
        <Element key={index} {...restProps}>{line}</Element>
      ))}
    </>
  );
}

export default ResponsiveText;