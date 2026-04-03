import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    gsap.fromTo(nav,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.5 }
    );
  }, []);

  const scrollTo = (id: string) => {
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 350);
  };

  const onSheetOpen = () => {
    const links = linksRef.current?.children;
    if (!links) return;
    gsap.fromTo(
      links,
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.08, duration: 0.45, ease: 'power3.out', delay: 0.25 }
    );
  };

  const NAV_ITEMS = ['work', 'services', 'about', 'contact'];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between"
      style={{ background: 'linear-gradient(to bottom, hsl(222 25% 4% / 0.95) 0%, transparent 100%)', backdropFilter: 'blur(2px)' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-[hsl(var(--primary))]" style={{ boxShadow: '0 0 20px hsl(185 100% 50% / 0.5)' }} />
        <span className="text-sm font-semibold tracking-widest uppercase text-[hsl(var(--foreground))]">Sara Osama</span>
      </div>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-8">
        {NAV_ITEMS.map((item) => (
          <button key={item} onClick={() => scrollTo(item)} className="nav-link">
            {item}
          </button>
        ))}
      </div>

      {/* Desktop CTA */}
      <button
        onClick={() => scrollTo('contact')}
        className="btn-primary text-xs py-2 px-5 !hidden md:!inline-flex"
      >
        <span>Book a Class</span>
      </button>

      {/* Mobile sheet */}
      <Sheet onOpenChange={(open) => { if (open) onSheetOpen(); }}>
        <SheetTrigger asChild>
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="border-l border-[hsl(var(--border))] bg-[hsl(var(--background))] p-0"
        >
          {/* Header */}
          <div className="flex items-center gap-2 px-6 py-6 border-b border-[hsl(var(--border))]">
            <div className="w-6 h-6 rounded-full bg-[hsl(var(--primary))]" style={{ boxShadow: '0 0 14px hsl(185 100% 50% / 0.5)' }} />
            <span className="text-sm font-semibold tracking-widest uppercase">Sara Osama</span>
          </div>

          {/* Links */}
          <div ref={linksRef} className="flex flex-col gap-1 px-4 py-6 flex-1">
            {NAV_ITEMS.map((item, i) => (
              <SheetClose asChild key={item}>
                <button
                  onClick={() => scrollTo(item)}
                  className="group flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-[hsl(var(--primary)/0.08)] transition-colors text-left"
                >
                  <span className="text-[0.6rem] font-mono text-[hsl(var(--primary))] w-5">
                    0{i + 1}
                  </span>
                  <span className="text-base font-semibold tracking-widest uppercase text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--foreground))] transition-colors">
                    {item}
                  </span>
                </button>
              </SheetClose>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="px-6 py-6 border-t border-[hsl(var(--border))]">
            <SheetClose asChild>
              <button
                onClick={() => scrollTo('contact')}
                className="btn-primary w-full justify-center text-xs py-3"
              >
                <span>Book a Class</span>
              </button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
