import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px" },
    );

    els.forEach((el) => {
      // If already visible in viewport on first load → show immediately, no flash
      const rect = el.getBoundingClientRect();
      const inView =
        rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) {
        // Skip the reveal animation for above-the-fold content
        el.classList.add("reveal-in");
      } else {
        el.classList.add("reveal");
        io.observe(el);
      }
    });

    return () => io.disconnect();
  }, []);
}
