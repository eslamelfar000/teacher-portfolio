import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import processData from "./processData.json";

gsap.registerPlugin(ScrollTrigger);

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const midLayerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Deepest background parallax
      gsap.to(bgLayerRef.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      // Mid layer — opposite direction
      gsap.to(midLayerRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Heading parallax
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );

      // Cards: each one starts at its own offset and slides into place
      cardRefs.current.forEach((card, i) => {
        const step = processData[i];
        if (!card || !step) return;

        // Reveal
        gsap.fromTo(
          card,
          { y: 80 + step.offsetY, opacity: 0, scale: 0.96 },
          {
            y: step.offsetY,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            delay: i * 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
          },
        );

        // Parallax at individual depths as you scroll through
        const parallaxAmount = 20 + i * 10;
        gsap.to(card, {
          y: processData[i].offsetY - parallaxAmount,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5 + i * 0.2,
          },
        });
      });

      // Connector line animates in
      gsap.fromTo(
        ".process-connector",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power3.inOut",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 pb-52 overflow-hidden"
      style={{ background: "hsl(222 25% 4%)" }}
    >
      {/* Deep background layer */}
      <div
        ref={bgLayerRef}
        className="absolute inset-0 -inset-y-[30%] pointer-events-none"
      >
        {/* Large ambient gradient blobs */}
        <div
          className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(185 40% 8% / 0.9) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(340 30% 8% / 0.9) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Large number watermark */}
        <p
          className="absolute bottom-0 right-8 display-text leading-none select-none"
          style={{
            fontSize: "clamp(12rem, 30vw, 24rem)",
            fontWeight: 700,
            color: "hsl(var(--foreground) / 0.015)",
            lineHeight: 1,
          }}
        >
          04
        </p>
      </div>

      {/* Mid layer — floating shapes */}
      <div ref={midLayerRef} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-16 right-[12%] w-48 h-48 border border-[hsl(var(--primary)/0.08)] rotate-12"
          style={{ borderRadius: "4px" }}
        />
        <div className="absolute bottom-16 left-[8%] w-36 h-36 border border-[hsl(var(--accent)/0.08)] rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 max-w-7xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} style={{ opacity: 0 }} className="mb-20">
          <p className="section-label mb-4">My Method</p>
          <h2
            className="display-text"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 700 }}
          >
            Your learning
            <br />
            <span className="gradient-text">journey</span>
          </h2>
        </div>

        {/* Connector line */}
        <div className="hidden md:block mb-0 relative h-px mb-[-1px] z-20">
          <div
            className="process-connector h-px"
            style={{
              background:
                "linear-gradient(to right, hsl(185 100% 55% / 0.3), hsl(340 85% 62% / 0.3), hsl(270 60% 60% / 0.3), hsl(150 60% 45% / 0.3))",
              transformOrigin: "left center",
            }}
          />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
          {processData.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="process-card p-6 border border-[hsl(var(--border))] group-hover:border-[hsl(var(--primary)/0.3)] transition-all duration-300"
              style={{ opacity: 0, borderRadius: "4px" }}
            >
              {/* Number */}
              <div
                style={{
                  color: step.color,
                  textShadow: `0 0 20px ${step.color}40`,
                }}
                className="font-mono text-xs tracking-widest block mb-6"
              >
                {step.number}
              </div>

              {/* Icon */}
              <div
                className="text-4xl mb-6 font-serif transition-transform duration-500 group-hover:scale-110"
                style={{ color: step.color }}
              >
                {step.icon}
              </div>

              {/* Title */}
              <h3
                className="text-xl font-semibold mb-4 transition-colors duration-300"
                style={{ fontFamily: "var(--app-font-serif)" }}
              >
                <span className="group-hover:text-[hsl(var(--primary))] transition-colors duration-300">
                  {step.title}
                </span>
              </h3>

              {/* Description */}
              <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                {step.description}
              </p>

              {/* Corner dot */}
              <div
                className="absolute bottom-6 right-6 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: step.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
