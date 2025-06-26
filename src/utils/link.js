const link = ({ lenis }) => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const hash = this.getAttribute("href");
      const targetElement = document.querySelector(hash);

      if (targetElement) {
        lenis.scrollTo(targetElement);
      }

      // if (targetElement) { 
      //     targetElement.scrollIntoView({ behavior: "smooth" });  //scrollIntoView브라우저 내장 API 간혹 충돌 가능
      // }
    });
  });
};

export default link;