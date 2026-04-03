import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["English", "Teacher", "Sara", "Osama"];

interface HeroSectionProps {
  shouldAnimate?: boolean;
}

export default function HeroSection({
  shouldAnimate = false,
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollTextRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<HTMLSpanElement[]>([]);
  const bgRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Orbs parallax
      gsap.to(orbRef.current, {
        yPercent: -40,
        xPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(orb2Ref.current, {
        yPercent: -20,
        xPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Only play intro animation when shouldAnimate is true
      if (shouldAnimate) {
        const tl = gsap.timeline();

        // Animate image first
        tl.fromTo(
          imageRef.current,
          { scale: 0.8, opacity: 0, rotateY: -20 },
          {
            scale: 1,
            opacity: 1,
            rotateY: 0,
            duration: 1.4,
            ease: "power4.out",
          },
        );

        // Animate each word line
        wordRefs.current.forEach((word, i) => {
          tl.fromTo(
            word,
            { yPercent: 120, opacity: 0, rotateX: -15 },
            {
              yPercent: 0,
              opacity: 1,
              rotateX: 0,
              duration: 1.1,
              ease: "power4.out",
            },
            i === 0 ? "-=1" : i * 0.12,
          );
        });

        tl.fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          "-=0.5",
        );

        tl.fromTo(
          ".hero-cta",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1 },
          "-=0.4",
        );

        tl.fromTo(
          scrollTextRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          "-=0.3",
        );
      }

      // Image parallax on scroll
      gsap.to(imageRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Headline exits on scroll
      gsap.to(headlineRef.current, {
        yPercent: -15,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center center",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [shouldAnimate]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 py-20 "
      style={{ perspective: "1000px" }}
    >
      {/* Background gradient */}
      <div
        ref={bgRef}
        className="absolute inset-0 -inset-y-[20%]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, hsl(185 60% 8% / 0.8) 0%, hsl(222 25% 3%) 70%)",
        }}
      />

      {/* Orbs */}
      <div
        ref={orbRef}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(185 100% 50% / 0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(340 85% 62% / 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(hsl(185 100% 55% / 0.08) 1px, transparent 1px), linear-gradient(90deg, hsl(185 100% 55% / 0.08) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Main content - Creative Overlapping Layout */}
      <div className="relative z-10 px-4 max-w-7xl mx-auto w-full">
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0">
          
          {/* Teacher Image - Positioned creatively */}
          <div 
            ref={imageRef}
            className="relative w-full flex justify-center lg:absolute lg:right-10 lg:top-1/2 lg:-translate-y-1/2 lg:w-auto order-1 lg:order-2"
            style={{ opacity: 0 }}
          >
            <div className="relative group">
              {/* Animated background shapes */}
              <div className="absolute inset-0 md:-inset-6 lg:-inset-8 opacity-60">
                <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-[hsl(var(--primary)/0.3)] rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
                <div className="absolute bottom-0 left-0 w-32 h-32 md:w-40 md:h-40 bg-[hsl(340,85%,62%/0.2)] rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
              </div>

              {/* Decorative frame */}
              <div className="absolute -inset-3 bg-gradient-to-br from-[hsl(var(--primary))] via-[hsl(340,85%,62%)] to-[hsl(var(--primary))] rounded-[2rem] opacity-20 group-hover:opacity-30 transition-opacity duration-500 animate-spin-slow" />
              
              {/* Image container with creative shape */}
              <div className="relative w-64 h-80 sm:w-72 sm:h-96 md:w-96 md:h-[32rem] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-[hsl(var(--background))]">
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] via-transparent to-transparent opacity-40 z-10" />
                <img
                  src="/teacher-image.jpg"
                  alt="Sara Osama - English Teacher"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = "https://ui-avatars.com/api/?name=Sara+Osama&size=500&background=14b8a6&color=fff&bold=true&font-size=0.35";
                  }}
                />
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-16 h-16 md:w-20 md:h-20 border-4 border-[hsl(var(--primary)/0.5)] rounded-2xl rotate-12 group-hover:rotate-[20deg] transition-transform duration-500" />
              <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-[hsl(var(--primary)/0.2)] to-transparent rounded-full group-hover:scale-110 transition-transform duration-500" />
              
              {/* Stats badges - Hidden on small mobile */}
              <div className="hidden sm:block absolute -left-6 md:-left-8 top-1/4 bg-[hsl(var(--background))] border-2 border-[hsl(var(--primary))] rounded-2xl px-3 py-2 md:px-4 md:py-3 shadow-xl backdrop-blur-sm group-hover:-translate-x-2 transition-transform duration-300">
                <div className="text-xl md:text-2xl font-bold gradient-text">10+</div>
                <div className="text-[0.65rem] md:text-xs text-[hsl(var(--muted-foreground))]">Years Exp.</div>
              </div>
              
              <div className="hidden sm:block absolute -right-6 md:-right-8 bottom-1/3 bg-[hsl(var(--background))] border-2 border-[hsl(340,85%,62%)] rounded-2xl px-3 py-2 md:px-4 md:py-3 shadow-xl backdrop-blur-sm group-hover:translate-x-2 transition-transform duration-300">
                <div className="text-xl md:text-2xl font-bold" style={{ color: 'hsl(340,85%,62%)' }}>500+</div>
                <div className="text-[0.65rem] md:text-xs text-[hsl(var(--muted-foreground))]">Students</div>
              </div>

              {/* Available badge */}
              <div className="absolute -bottom-4 md:-bottom-6 left-1/2 -translate-x-1/2 bg-[hsl(var(--background))] border border-[hsl(var(--border))] rounded-full px-4 py-2 md:px-6 md:py-3 shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs md:text-sm font-semibold whitespace-nowrap">Available for Lessons</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text content - Overlapping with image */}
          <div 
            ref={headlineRef}
            className="relative z-20 text-center lg:text-left max-w-2xl order-2 lg:order-1 w-full"
          >
            <p className="section-label mb-6 hero-cta" style={{ opacity: 0 }}>
              English Educator & Specialist
            </p>

            <div className="overflow-hidden mb-4" style={{ perspective: "800px" }}>
              <h1
                className="display-text"
                style={{ fontSize: "clamp(2.5rem, 10vw, 8rem)", fontWeight: 700, lineHeight: 0.95 }}
              >
                {WORDS.map((word, i) => (
                  <span key={word} className="block overflow-hidden">
                    <span
                      ref={(el) => {
                        if (el) wordRefs.current[i] = el;
                      }}
                      className={i % 2 === 1 ? "gradient-text" : ""}
                      style={{ display: "block", opacity: 0 }}
                    >
                      {word}
                    </span>
                  </span>
                ))}
              </h1>
            </div>

            <p
              ref={subtitleRef}
              className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base md:text-lg max-w-md mx-auto lg:mx-0 lg:max-w-lg mt-6 leading-relaxed"
              style={{ opacity: 0 }}
            >
              Passionate about empowering students through engaging and effective English language instruction.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mt-10">
              <button
                className="btn-primary hero-cta group w-full sm:w-auto"
                style={{ opacity: 0 }}
                onClick={() =>
                  document
                    .getElementById("work")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <span>Explore Lessons</span>
                <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button
                className="btn-outline hero-cta w-full sm:w-auto"
                style={{ opacity: 0 }}
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <span>Get in Touch</span>
              </button>
            </div>

            {/* Decorative line */}
            <div className="hidden lg:block mt-12 hero-cta" style={{ opacity: 0 }}>
              <div className="flex items-center gap-4">
                <div className="h-px w-20 bg-gradient-to-r from-[hsl(var(--primary))] to-transparent" />
                <span className="text-xs text-[hsl(var(--muted-foreground))] tracking-widest">SCROLL TO EXPLORE</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollTextRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ opacity: 0 }}
      >
        <div className="flex flex-col items-center gap-1.5">
          <div className="scroll-indicator-dot w-1 h-1 rounded-full bg-[hsl(var(--primary))]" />
          <div
            className="scroll-indicator-dot w-1 h-1 rounded-full bg-[hsl(var(--primary)/0.5)]"
            style={{ animationDelay: "0.3s" }}
          />
          <div
            className="scroll-indicator-dot w-1 h-1 rounded-full bg-[hsl(var(--primary)/0.2)]"
            style={{ animationDelay: "0.6s" }}
          />
        </div>
        <span className="section-label" style={{ fontSize: "0.6rem" }}>
          Scroll
        </span>
      </div>

      {/* Year badge */}
      <div className="absolute top-24 right-8 text-[hsl(var(--muted-foreground))] text-xs tracking-widest hidden lg:block">
        <span
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          2026 — Present
        </span>
      </div>
    </section>
  );
}
