import { useEffect, useState } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const userAgent = typeof window !== "undefined" ? navigator.userAgent : "";
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      setIsMobile(mobile || ('ontouchstart' in window || window.innerWidth <= 1024));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
}

export default useIsMobile;




// import { useEffect, useState } from "react";

// const useIsMobile = () => {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkIsMobile = () => {
//       const width = window.innerWidth;
//       const userAgent = typeof window !== "undefined" ? navigator.userAgent.toLowerCase() : "";
//       const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
//       const mobileUA = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent);

//       // width가 1024 이하이고 터치 지원되면 모바일 간주
//       setIsMobile(mobileUA || (isTouch || width <= 1024));
//     };

//     checkIsMobile(); // mount 시 바로 체크
//     window.addEventListener("resize", checkIsMobile);

//     return () => window.removeEventListener("resize", checkIsMobile);
//   }, []);

//   return isMobile;
// };

// export default useIsMobile;