import { useEffect, useState } from "react";
import gsap from "gsap";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 300;
      setVisible(scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const element = document.documentElement || document.body;
    gsap.to(element, {
      scrollTop: 0,
      duration: 1.2,
      ease: "power4.out",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-40 flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
      }`}
      style={{
        background: "hsl(var(--primary))",
        boxShadow: "0 0 20px hsl(185 100% 50% / 0.4)",
      }}
      aria-label="Scroll to top"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[hsl(var(--primary-foreground))]"
      >
        <path
          d="M12 19V5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 12L12 5L19 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
