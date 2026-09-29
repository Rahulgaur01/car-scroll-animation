'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HEADLINE = ['WELCOME', 'ITZFIZZ'];
const STATS = [
  { value: '97%',  label: 'Frame-time stability' },
  { value: '3.4x', label: 'Scroll engagement' },
  { value: '0.9s', label: 'Time to first motion' },
  { value: '100%', label: 'Transform-only motion' },
];

export default function Hero() {
  const rootRef    = useRef(null);
  const pinRef     = useRef(null);
  const visualRef  = useRef(null);
  const copyRef    = useRef(null);
  const statsRef   = useRef(null);
  const topbarRef  = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(root, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const chars = q('.hero-char');
      const stats = q('.stat');

      /* Intro */
      gsap.timeline({
        defaults: { ease: 'power4.out' },
        delay: 0.15,
        onComplete: () => ScrollTrigger.refresh(),
      })
        .to(root, { opacity: 1, duration: 0.6, ease: 'none' }, 0)
        .from(topbarRef.current, { y: -18, autoAlpha: 0, duration: 1 }, 0)
        .from(q('.hero-kicker'), { y: 16, autoAlpha: 0, duration: 0.9 }, 0.15)
        .from(chars, { yPercent: 130, duration: 1.2, stagger: 0.035 }, 0.2)
        .from(q('.hero-visual-inner'), { scale: 0.88, yPercent: 12, autoAlpha: 0, duration: 1.6, ease: 'power3.out' }, 0.4)
        .from(stats, { y: 26, autoAlpha: 0, duration: 1, stagger: 0.12 }, 0.85);

      /* Scroll-scrubbed */
      gsap.timeline({
        defaults: { ease: 'none', immediateRender: false },
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.1,
          invalidateOnRefresh: true,
        },
      })
        .fromTo(q('.hero-glow'), { scale: 0.9, opacity: 0.55 }, { scale: 1.85, opacity: 0.95, duration: 1 }, 0)
        .fromTo(q('.hero-grid'), { yPercent: 0, opacity: 0.35 }, { yPercent: 12, opacity: 0.1, duration: 1 }, 0)
        .fromTo(visualRef.current, { yPercent: 0, scale: 1, rotate: 0 }, { yPercent: -42, scale: 1.24, rotate: -2.5, duration: 1 }, 0)
        .fromTo(copyRef.current, { yPercent: 0, autoAlpha: 1 }, { yPercent: -60, autoAlpha: 0, duration: 0.5 }, 0)
        .fromTo(topbarRef.current, { yPercent: 0, autoAlpha: 1 }, { yPercent: -50, autoAlpha: 0, duration: 0.32 }, 0)
        .fromTo(statsRef.current, { yPercent: 0, autoAlpha: 1 }, { yPercent: 80, autoAlpha: 0, duration: 0.42 }, 0.08);
    }, rootRef);

    return () => ctx.revert();   // cleanup — StrictMode me double-run se bachata hai
  }, []);

  return (
    <section ref={pinRef} className="relative h-[300svh]">
      <div ref={rootRef} className="hero sticky top-0 h-[100svh] w-full overflow-hidden">

        <div className="hero-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="hero-glow h-[75vmin] w-[75vmin] rounded-full blur-[110px]" />
        </div>

        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div ref={visualRef} className="hero-visual w-[min(1000px,88vw)] will-change-transform">
            <div className="hero-visual-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/car.png"
                alt=""
                draggable="false"
                className="w-full select-none drop-shadow-[0_50px_70px_rgba(0,0,0,0.65)]"
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 flex h-full flex-col justify-between px-6 py-8 md:px-12 md:py-10">
          <header ref={topbarRef} className="hero-topbar flex items-center justify-between text-[10px] uppercase tracking-[0.32em] text-white/45 md:text-[11px]">
            <span className="font-semibold text-white/80">Itzfizz</span>
            <span className="hidden sm:inline">Scroll to explore</span>
            <span>© 2025</span>
          </header>

          <div ref={copyRef} className="hero-copy mx-auto max-w-5xl text-center will-change-transform">
            <p className="hero-kicker mb-4 text-[10px] uppercase tracking-[0.5em] text-white/40 md:mb-6 md:text-xs">
              Digital experience studio
            </p>
            <h1 className="hero-headline overflow-hidden font-extrabold uppercase leading-[0.95] tracking-[0.26em] [font-size:clamp(1.35rem,5.2vw,4.75rem)] [text-indent:0.26em]">
              {HEADLINE.map((word, wi) => (
                <span key={wi} className="hero-word inline-block whitespace-nowrap pr-[0.26em]">
                  {word.split('').map((ch, ci) => (
                    <span key={ci} className="hero-char inline-block will-change-transform">{ch}</span>
                  ))}
                </span>
              ))}
            </h1>
          </div>

          <div ref={statsRef} className="hero-stats grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/10 pt-6 md:grid-cols-4 md:pt-8">
            {STATS.map((s) => (
              <div key={s.label} className="stat will-change-transform">
                <p className="text-xl font-bold tracking-tight text-white md:text-3xl">{s.value}</p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-white/40 md:text-[10px]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}