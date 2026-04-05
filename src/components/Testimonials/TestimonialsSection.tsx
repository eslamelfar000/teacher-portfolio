import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Maximize2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import testimonialsData from "./testimonialsData.json";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = testimonialsData;

function TestimonialCard({
  item,
  index,
}: {
  item: (typeof TESTIMONIALS)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal on scroll
      gsap.fromTo(
        cardRef.current,
        { y: 60, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          delay: index * 0.15,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <>
      <div
        ref={cardRef}
        className="relative p-2 border border-[hsl(var(--border))] group rounded-2xl bg-[hsl(222_25%_5%)] shadow-2xl overflow-hidden cursor-pointer"
        style={{ opacity: 0, willChange: "transform" }}
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-[hsl(185_100%_55%)] transition-colors duration-500 rounded-2xl pointer-events-none" />

        {/* Overlay icon that appears on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center pointer-events-none">
          <div className="bg-[hsl(185_100%_55%)] p-3 rounded-full shadow-lg">
            <Maximize2 className="w-5 h-5 text-white" />
          </div>
        </div>

        <img
          src={item.image}
          alt="WhatsApp screenshot review"
          className="w-full h-auto object-contain rounded-xl"
          style={{ aspectRatio: "9/9" }}
        />
      </div>

      {/* Dialog for full-size image */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] w-full p-0 border-0 bg-transparent">
          <div className="relative h-full overflow-y-auto bg-[#0D0F11] p-4 rounded-2xl">
            <img
              src={item.image}
              alt="WhatsApp screenshot review-fullsize"
              className="w-full h-full rounded-2xl object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bgFarRef = useRef<HTMLDivElement>(null);
  const bgNearRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;

      if (track && section) {
        const totalWidth =
          track.scrollWidth - section.offsetWidth + window.innerWidth * 0.01;
        gsap.to(track, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${totalWidth + 500}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        });
      }

      // Far background drifts up slowly
      gsap.to(bgFarRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      // Near bg layer moves faster — creates depth
      gsap.to(bgNearRef.current, {
        yPercent: -35,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
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
      className="testimonials-section relative py-32 overflow-hidden flex flex-col justify-center"
      style={{ minHeight: "100vh" }}
    >
      {/* FAR background layer */}
      <div
        ref={bgFarRef}
        className="absolute inset-0 -inset-y-[25%] pointer-events-none"
      >
        {/* Ambient blobs */}
        <div
          className="absolute top-1/3 left-1/4 w-[600px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, hsl(185 40% 8% / 0.9) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        {/* Dashed circle decoration */}
        <svg
          className="absolute top-8 right-[5%] opacity-[0.04]"
          width="300"
          height="300"
          viewBox="0 0 300 300"
        >
          <circle
            cx="150"
            cy="150"
            r="130"
            stroke="white"
            strokeWidth="1"
            strokeDasharray="6 10"
            fill="none"
          />
          <circle
            cx="150"
            cy="150"
            r="90"
            stroke="white"
            strokeWidth="0.5"
            strokeDasharray="3 14"
            fill="none"
          />
        </svg>
      </div>

      {/* NEAR background layer — large text watermark */}
      <div
        ref={bgNearRef}
        className="absolute inset-0 -inset-y-[20%] pointer-events-none flex items-center overflow-hidden"
      >
        <p
          className="display-text w-full text-center select-none"
          style={{
            fontSize: "clamp(8rem, 22vw, 20rem)",
            fontWeight: 700,
            color: "hsl(var(--foreground) / 0.02)",
            whiteSpace: "nowrap",
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          SUCCESS
        </p>
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 max-w-7xl mx-auto">
        <div ref={headingRef} style={{ opacity: 0 }} className="mb-20">
          <p className="section-label mb-4">Student Stories</p>
          <div className="flex items-end justify-between gap-8">
            <h2
              className="display-text"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 700 }}
            >
              Words from
              <br />
              <span className="gradient-text">those I taught</span>
            </h2>
            <p className="text-sm text-[hsl(var(--muted-foreground))] max-w-xs hidden md:block leading-relaxed">
              I measure my success by the progress of my students and the
              confidence they build.
            </p>
          </div>
        </div>

        {/* Swiper wrapper */}
        <div className="w-full mt-12 overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-6 w-max items-start"
            style={{ paddingRight: "40vw" }}
          >
            {TESTIMONIALS.map((item, i) => (
              <div
                key={i}
                className="shrink-0 w-[75vw] sm:w-[320px] md:w-[350px]"
              >
                <TestimonialCard item={item} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom flourish */}
        <div className="flex items-center justify-center gap-4 mt-20">
          <div className="h-px flex-1 max-w-[200px] bg-[hsl(var(--border))]" />
          <span className="text-xs text-[hsl(var(--muted-foreground))] tracking-widest uppercase">
            Trusted by hundreds of students worldwide
          </span>
          <div className="h-px flex-1 max-w-[200px] bg-[hsl(var(--border))]" />
        </div>
      </div>
    </section>
  );
}
