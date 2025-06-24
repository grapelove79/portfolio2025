import Lenis from "@studio-freight/lenis";

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


// 내부 링크 클릭 시 Lenis scrollTo로 이동
// const enableLenisAnchors = () => {
//   document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
//     anchor.addEventListener("click", function (e) {
//       const hash = this.getAttribute("href");

//       const target = document.querySelector(hash);
//       if (target) {
//         e.preventDefault();
//         lenis.scrollTo(target); // Lenis로 부드럽게 이동
//       }
//     });
//   });
// };

// export { lenis, enableLenisAnchors };
export default lenis;
