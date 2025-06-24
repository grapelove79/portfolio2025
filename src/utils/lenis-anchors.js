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

const enableLenisAnchors = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const hash = anchor.getAttribute("href");
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target); // Lenis를 통한 부드러운 이동
      }
    });
  });
};

export { lenis, enableLenisAnchors };
