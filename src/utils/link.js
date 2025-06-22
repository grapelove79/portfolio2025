const link = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      /* 모바일에서 link.js의 scrollIntoView 작동 안 하도록 조건 분기
      : 모바일(1024px 이하)에서 스크롤하다가 갑자기 #intro로 점프하는 현상 발생.
      link.js는 페이지 내 모든 a[href^="#"]를 가로채서 scrollIntoView()로 이동시킴.
      이 코드가 의도치 않게 자동으로 스크롤을 유발할 수 있음. */
      if (window.innerWidth <= 1024) return;

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
};

export default link;