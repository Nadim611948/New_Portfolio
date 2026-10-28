'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Download,
  Code2,
  Server,
  Database,
  Cloud,
  CreditCard,
  ChevronUp,
  X,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  Zap,
  Award,
  Menu,
  Terminal,
  User,
  Layers,
  Cpu,
  Send,
  FileText,
  Maximize2
} from 'lucide-react';

// ----------------------------------------------------
// 1. INTERACTIVE CANVAS BACKGROUND ANIMATION
// ----------------------------------------------------
const CanvasBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const mouse = { x: -1000, y: -1000, radius: 150 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const particleCount = Math.min(Math.floor((width * height) / 12000), 80);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 1.5 + 1,
      baseAlpha: Math.random() * 0.3 + 0.15,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        const dxMouse = p1.x - mouse.x;
        const dyMouse = p1.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < mouse.radius) {
          const angle = Math.atan2(dyMouse, dxMouse);
          const force = (mouse.radius - distMouse) / mouse.radius;
          p1.x += Math.cos(angle) * force * 3;
          p1.y += Math.sin(angle) * force * 3;
        }

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p1.baseAlpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
    />
  );
};

// ----------------------------------------------------
// 2. PARALLAX MOUSE HOVER 3D TILT CARD COMPONENT
// ----------------------------------------------------
const TiltCard = ({ children, className = "", scaleOnHover = 1.02 }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-200 ease-out preserve-3d ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${rotate.x !== 0 ? scaleOnHover : 1}, ${rotate.x !== 0 ? scaleOnHover : 1}, 1)`,
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
          opacity: glare.opacity,
        }}
      />
      {children}
    </div>
  );
};


// ----------------------------------------------------
// PLACEHOLDER IMAGES (used automatically if a remote image fails to load)
// ----------------------------------------------------
const toDataUri = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const AVATAR_PLACEHOLDER = toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#27272a"/><stop offset="1" stop-color="#09090b"/>
    </linearGradient>
  </defs>
  <rect width="800" height="1000" fill="url(#g)"/>
  <circle cx="400" cy="380" r="130" fill="#3f3f46"/>
  <path d="M130 1000c0-190 120-330 270-330s270 140 270 330z" fill="#3f3f46"/>
  <text x="400" y="880" text-anchor="middle" font-family="Arial, sans-serif" font-size="64" font-weight="700" fill="#e4e4e7">NM</text>
</svg>`);

const projectPlaceholder = (title) => toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 560">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#27272a"/><stop offset="1" stop-color="#09090b"/>
    </linearGradient>
  </defs>
  <rect width="1000" height="560" fill="url(#g)"/>
  <rect x="80" y="80" width="840" height="400" rx="24" fill="none" stroke="#52525b" stroke-width="3" stroke-dasharray="14 12"/>
  <text x="500" y="295" text-anchor="middle" font-family="Arial, sans-serif" font-size="56" font-weight="700" fill="#e4e4e7">${title}</text>
  <text x="500" y="345" text-anchor="middle" font-family="Arial, sans-serif" font-size="26" fill="#a1a1aa">Project preview</text>
</svg>`);

const onImgError = (fallbacks) => (e) => {
  const list = Array.isArray(fallbacks) ? fallbacks : [fallbacks];
  const img = e.currentTarget;
  const i = Number(img.dataset.fbIndex || 0);
  if (i >= list.length) return;
  img.dataset.fbIndex = String(i + 1);
  img.src = list[i];
};

// ----------------------------------------------------
// MOUSE-FOLLOW GLOW + SCROLL PROGRESS BAR
// ----------------------------------------------------
const CursorGlow = () => {
  const glowRef = useRef(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    let x = tx, y = ty, raf;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      el.style.opacity = '1';
    };
    const onLeave = () => { el.style.opacity = '0'; };

    const loop = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `translate3d(${x - 250}px, ${y - 250}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 pointer-events-none"
      style={{
        width: 500,
        height: 500,
        zIndex: 5,
        opacity: 0,
        transition: 'opacity 0.4s ease',
        background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 65%)',
        willChange: 'transform',
      }}
    />
  );
};


// ----------------------------------------------------
// SLOW, INERTIAL SMOOTH SCROLL (mouse wheel + nav links)
// ----------------------------------------------------
let smoothScrollTo = (y) => window.scrollTo({ top: y, behavior: 'smooth' });

const SmoothScroll = () => {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touch = window.matchMedia('(pointer: coarse)').matches;
    if (reduce || touch) return;

    const EASE = 0.075;   // lower = slower, floatier scroll
    const SPEED = 0.8;    // wheel distance multiplier

    let current = window.scrollY;
    let target = current;
    let raf = null;

    const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const clamp = (v) => Math.min(Math.max(v, 0), maxScroll());

    const tick = () => {
      current += (target - current) * EASE;
      if (Math.abs(target - current) < 0.4) {
        current = target;
        window.scrollTo(0, current);
        raf = null;
        return;
      }
      window.scrollTo(0, current);
      raf = requestAnimationFrame(tick);
    };
    const start = () => { if (!raf) raf = requestAnimationFrame(tick); };

    const onWheel = (e) => {
      if (e.ctrlKey) return; // pinch / zoom
      // let inner scroll areas (modals, terminal log) scroll normally
      let el = e.target;
      while (el && el !== document.body && el !== document.documentElement) {
        const oy = getComputedStyle(el).overflowY;
        if ((oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight + 1) return;
        el = el.parentElement;
      }
      e.preventDefault();
      const delta = e.deltaMode === 1 ? e.deltaY * 32 : e.deltaY;
      target = clamp(target + delta * SPEED);
      start();
    };

    // keep in sync when the page is scrolled some other way (scrollbar drag, keyboard)
    const onScroll = () => {
      if (!raf) { current = window.scrollY; target = current; }
    };

    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href').slice(1);
      const node = id ? document.getElementById(id) : null;
      if (id && !node) return;
      e.preventDefault();
      target = clamp(node ? node.getBoundingClientRect().top + window.scrollY - 70 : 0);
      start();
    };

    smoothScrollTo = (y) => { target = clamp(y); start(); };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(raf);
      smoothScrollTo = (y) => window.scrollTo({ top: y, behavior: 'smooth' });
    };
  }, []);

  return null;
};

const ScrollProgress = () => {
  const barRef = useRef(null);

  useEffect(() => {
    let raf;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const pct = max > 0 ? window.scrollY / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${pct})`;
      doc.style.setProperty('--sy', String(Math.min(window.scrollY, 700)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 bg-white"
      style={{ height: 2, zIndex: 60, transform: 'scaleX(0)', transformOrigin: 'left', willChange: 'transform' }}
    />
  );
};

const Reveal = ({ children, delay = 0, className = "", from = "up" }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { setShown(true); return; }
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    const t = setTimeout(() => setShown(true), 3000);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);

  const hidden = from === 'left' ? 'translateX(-40px)' : from === 'right' ? 'translateX(40px)' : 'translateY(36px)';
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : hidden,
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const TechIcon = ({ name, className = "w-5 h-5" }) => {
  switch (name) {
    case 'react':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      );
    case 'next':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm4.5 17.5l-6.8-9.8v9.8H8V6.5h2.2l6.8 9.8V6.5h1.7v11z"/>
        </svg>
      );
    case 'node':
      return <Server className={className} />;
    case 'mongo':
      return <Database className={className} />;
    case 'tailwind':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
        </svg>
      );
    case 'js':
      return <Code2 className={className} />;
    case 'firebase':
      return <Cloud className={className} />;
    case 'stripe':
      return <CreditCard className={className} />;
    default:
      return <Cpu className={className} />;
  }
};


// ----------------------------------------------------
// GLOBAL STYLES: smooth scroll, scroll-reveal, marquee
// ----------------------------------------------------
const GlobalStyles = () => (
  <style>{`
    .hero-grid, .contact-grid, .two-col, .three-col { display: grid; grid-template-columns: minmax(0, 1fr); gap: 2.5rem; }
    .two-col { gap: 1rem; }
    .three-col { gap: 1rem; }
    .proj-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 2rem; }
    @media (min-width: 768px) { .proj-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (min-width: 1024px) { .proj-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
    .hero-grid { align-items: center; }
    .contact-grid { align-items: start; gap: 2rem; }
    @media (min-width: 640px) {
      .two-col { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .three-col { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    }
    @media (min-width: 768px) {
      .hero-grid { grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); }
      .contact-grid { grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 2.5rem; }
    }
    /* Theme colors written as plain CSS so they render even where Tailwind arbitrary / opacity classes are not compiled */
    .bg-\[\#08080a\] { background-color: #08080a !important; }
    .bg-\[\#08080a\]\/90 { background-color: rgba(8,8,10,0.9) !important; }
    .bg-black\/80 { background-color: rgba(0,0,0,0.8) !important; }
    .bg-black\/85 { background-color: rgba(0,0,0,0.85) !important; }
    .bg-green-500\/80 { background-color: rgba(34,197,94,0.8) !important; }
    .bg-red-500\/80 { background-color: rgba(239,68,68,0.8) !important; }
    .bg-yellow-500\/80 { background-color: rgba(234,179,8,0.8) !important; }
    .bg-zinc-800\/80 { background-color: rgba(39,39,42,0.8) !important; }
    .bg-zinc-900\/40 { background-color: rgba(24,24,27,0.4) !important; }
    .bg-zinc-900\/50 { background-color: rgba(24,24,27,0.5) !important; }
    .bg-zinc-900\/60 { background-color: rgba(24,24,27,0.6) !important; }
    .bg-zinc-900\/80 { background-color: rgba(24,24,27,0.8) !important; }
    .bg-zinc-950\/40 { background-color: rgba(9,9,11,0.4) !important; }
    .bg-zinc-950\/60 { background-color: rgba(9,9,11,0.6) !important; }
    .border-white\/10 { border-color: rgba(255,255,255,0.1) !important; }
    .border-zinc-700\/50 { border-color: rgba(63,63,70,0.5) !important; }
    .border-zinc-700\/80 { border-color: rgba(63,63,70,0.8) !important; }
    .border-zinc-800\/60 { border-color: rgba(39,39,42,0.6) !important; }
    .border-zinc-800\/80 { border-color: rgba(39,39,42,0.8) !important; }
    .border-zinc-800\/90 { border-color: rgba(39,39,42,0.9) !important; }
    .shadow-white\/5 { --tw-shadow-color: rgba(255,255,255,0.05); }
    .from-black\/80.bg-gradient-to-t { background-image: linear-gradient(to top, rgba(0,0,0,0.8), transparent) !important; }
    .aspect-\[4\/5\] { aspect-ratio: 4 / 5; }
    .leading-\[1\.1\] { line-height: 1.1; }
    .max-h-\[90vh\] { max-height: 90vh; }
    .min-h-\[85vh\] { min-height: 85vh; }
    .text-\[10px\] { font-size: 10px; line-height: 14px; }
    .text-\[11px\] { font-size: 11px; line-height: 16px; }
    .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
    .preserve-3d { transform-style: preserve-3d; }
    body { background-color: #08080a; }

    section[id] { scroll-margin-top: 80px; }

    .reveal {
      opacity: 0;
      transform: translateY(40px);
      transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
      transition-delay: var(--reveal-delay, 0ms);
      will-change: opacity, transform;
    }
    .reveal-left { transform: translateX(-48px); }
    .reveal-right { transform: translateX(48px); }
    .reveal.reveal-in { opacity: 1; transform: none; }
    @keyframes heroLeft { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: none; } }
    @keyframes heroRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: none; } }
    .hero-in-left { animation: heroLeft 0.9s cubic-bezier(0.22, 1, 0.36, 1) both; }
    .hero-in-right { animation: heroRight 0.9s 0.15s cubic-bezier(0.22, 1, 0.36, 1) both; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .fade-up { animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both; }

    @keyframes marqueeLeft {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
    @keyframes marqueeRight {
      from { transform: translateX(-50%); }
      to { transform: translateX(0); }
    }
    .marquee-mask {
      -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
      mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
    }
    .marquee-track { display: flex; width: max-content; }
    .marquee-left { animation: marqueeLeft 40s linear infinite; }
    .marquee-right { animation: marqueeRight 40s linear infinite; }
    .marquee-mask:hover .marquee-track { animation-play-state: paused; }

    @media (prefers-reduced-motion: reduce) {
      .reveal { opacity: 1; transform: none; transition: none; }
      .fade-up, .hero-in-left, .hero-in-right, .marquee-left, .marquee-right { animation: none; }
    }
  `}</style>
);

// Two-line skill icon marquee: top row right -> left, bottom row left -> right
const SkillMarquee = ({ items }) => {
  const mid = Math.ceil(items.length / 2);
  const rows = [
    { list: items.slice(0, mid), dir: 'marquee-left' },
    { list: items.slice(mid), dir: 'marquee-right' },
  ];

  return (
    <div className="space-y-4 mb-10">
      {rows.map((row, rIdx) => (
        <div key={rIdx} className="marquee-mask overflow-hidden">
          <div className={`marquee-track ${row.dir}`}>
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 gap-4 pr-4" aria-hidden={copy === 1}>
                {row.list.map((skill, i) => (
                  <div
                    key={`${copy}-${i}`}
                    className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 text-zinc-200 whitespace-nowrap hover:border-zinc-500 hover:text-white transition-colors"
                  >
                    <span className="w-9 h-9 rounded-xl bg-zinc-800 flex items-center justify-center text-white">
                      <TechIcon name={skill.icon} className="w-5 h-5" />
                    </span>
                    <span className="text-sm font-semibold">{skill.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  const [activeAboutTab, setActiveAboutTab] = useState('story');
  const [activeSkillTab, setActiveSkillTab] = useState('all');
  const [activeProjectTab, setActiveProjectTab] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState([
    { type: 'sys', text: 'MD Nadim Mostofa Interactive CLI v2.4 initialized.' },
    { type: 'sys', text: 'Type "help" to list available commands.' }
  ]);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll-reveal for sections
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('reveal-in'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => observer.observe(el));
    // safety net: never leave content hidden
    const fallback = setTimeout(() => els.forEach((el) => el.classList.add('reveal-in')), 2500);
    return () => { observer.disconnect(); clearTimeout(fallback); };
  }, []);

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    const newLogs = [...terminalLogs, { type: 'cmd', text: `> ${terminalInput}` }];

    switch (cmd) {
      case 'help':
        newLogs.push({ type: 'res', text: 'Commands: bio, skills, projects, contact, clear' });
        break;
      case 'bio':
        newLogs.push({ type: 'res', text: 'MD Nadim Mostofa — MERN & Next.js Developer based in Rangpur, Bangladesh.' });
        break;
      case 'skills':
        newLogs.push({ type: 'res', text: 'Stack: React.js, Next.js, Node.js, Express.js, MongoDB, Tailwind CSS, REST APIs' });
        break;
      case 'projects':
        newLogs.push({ type: 'res', text: 'Selected Works: JobNest, Travel Guru, The Daily, Survey Pro, Cyclist Club, Beauty Parlor' });
        break;
      case 'contact':
        newLogs.push({ type: 'res', text: 'Email: nadimmostafa334@gmail.com | Phone: +880 1756790052' });
        break;
      case 'clear':
        setTerminalLogs([]);
        setTerminalInput('');
        return;
      default:
        newLogs.push({ type: 'res', text: `Command not recognized: "${cmd}". Type "help" for options.` });
    }

    setTerminalLogs(newLogs);
    setTerminalInput('');
  };

  const skillCategories = [
    { id: 'all', label: 'All Skills' },
    { id: 'frontend', label: 'Front-End' },
    { id: 'backend', label: 'Back-End & APIs' },
    { id: 'data', label: 'Data & Auth' },
    { id: 'devops', label: 'Deployment & Tools' }
  ];

  const skills = [
    { name: 'React.js', category: 'frontend', level: 92, tag: 'Advanced', icon: 'react' },
    { name: 'Next.js', category: 'frontend', level: 86, tag: 'Intermediate', icon: 'next' },
    { name: 'JavaScript (ES6+)', category: 'frontend', level: 90, tag: 'Advanced', icon: 'js' },
    { name: 'Tailwind CSS', category: 'frontend', level: 95, tag: 'Advanced', icon: 'tailwind' },
    { name: 'HTML5 / CSS3', category: 'frontend', level: 95, tag: 'Advanced', icon: 'js' },
    { name: 'TanStack Query', category: 'frontend', level: 84, tag: 'Intermediate', icon: 'react' },
    { name: 'Axios API Client', category: 'frontend', level: 88, tag: 'Advanced', icon: 'react' },
    { name: 'Node.js', category: 'backend', level: 85, tag: 'Intermediate', icon: 'node' },
    { name: 'Express.js', category: 'backend', level: 86, tag: 'Intermediate', icon: 'node' },
    { name: 'RESTful APIs', category: 'backend', level: 90, tag: 'Advanced', icon: 'node' },
    { name: 'Context API', category: 'backend', level: 88, tag: 'Advanced', icon: 'react' },
    { name: 'MongoDB', category: 'data', level: 85, tag: 'Intermediate', icon: 'mongo' },
    { name: 'Firebase', category: 'data', level: 82, tag: 'Intermediate', icon: 'firebase' },
    { name: 'JWT Auth', category: 'data', level: 86, tag: 'Intermediate', icon: 'mongo' },
    { name: 'Git / GitHub', category: 'devops', level: 90, tag: 'Advanced', icon: 'js' },
    { name: 'Vercel / Netlify', category: 'devops', level: 92, tag: 'Advanced', icon: 'next' },
    { name: 'Stripe Payment', category: 'devops', level: 82, tag: 'Intermediate', icon: 'stripe' },
    { name: 'SSLCommerz', category: 'devops', level: 82, tag: 'Intermediate', icon: 'stripe' },
  ];

  const filteredSkills = activeSkillTab === 'all' 
    ? skills 
    : skills.filter(s => s.category === activeSkillTab);

  const projects = [
    {
      id: 'jobnest',
      title: 'JobNest',
      subtitle: 'Job Portal Platform',
      category: 'mern',
      tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind'],
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1000&auto=format&fit=crop',
      description: 'A full-stack career platform facilitating seamless job discovery, employer management, real-time application tracking, and profile bookmarks.',
      features: [
        'Search & filter jobs by title, location, category, and employment type',
        'Applicant dashboard with saved jobs and real-time status tracking',
        'Employer portal for publishing listings and applicant reviews',
        'Role-based permissions for system administration'
      ],
      liveUrl: 'https://job-portal-5d53a.web.app/',
      githubUrl: 'https://github.com/Nadimmo/Job-Portal-Client-side-'
    },
    {
      id: 'travel-guru',
      title: 'Travel Guru',
      subtitle: 'Travel Booking & Package Management',
      category: 'booking',
      tags: ['MERN Stack', 'Stripe', 'JWT', 'Tailwind'],
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1000&auto=format&fit=crop',
      description: 'Interactive travel discovery and package reservation system complete with real-time payment processing and dynamic trip itineraries.',
      features: [
        'Explore curated tour packages with destination maps and schedules',
        'Integrated Stripe payment gateway for instant secure checkout',
        'JWT-authenticated personal booking portal and receipt logs',
        'Admin dashboard for package creation and booking management'
      ],
      liveUrl: 'https://travel-guru-a638f.web.app/',
      githubUrl: 'https://github.com/Nadimmo/M9-Travel-Guru'
    },
    {
      id: 'the-daily',
      title: 'The Daily',
      subtitle: 'Modern Media & Publishing Platform',
      category: 'react',
      tags: ['React', 'Express', 'MongoDB', 'Node.js'],
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000&auto=format&fit=crop',
      description: 'A sleek editorial publication platform enabling writers to publish stories, discover fresh ideas, and engage with readers.',
      features: [
        'Rich-text article editor and category tagging',
        'Interactive community comments and bookmarking system',
        'Dark/Light reader modes optimized for reading comfort',
        'Responsive layout across desktop, tablet, and mobile'
      ],
      liveUrl: 'https://blogging-platform-5850d.web.app/',
      githubUrl: 'https://github.com/Nadimmo/Blogging-Platform-Client-side-'
    },
    {
      id: 'survey-pro',
      title: 'Survey Pro',
      subtitle: 'Analytics & Survey Management',
      category: 'mern',
      tags: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
      description: 'Turn feedback into actionable intelligence. Create custom surveys, collect responses, and visualize live statistical charts.',
      features: [
        'Multi-level user dashboard (Participant, Surveyor, Admin)',
        'Custom survey builder supporting varied query types',
        'Real-time response charts and visual statistics',
        'Data exports to CSV and response analytics'
      ],
      liveUrl: 'https://assignment-12-6f33b.web.app/',
      githubUrl: 'https://github.com/Nadimmo/M9-Assignment-12-ClientSide'
    },
    {
      id: 'cyclist-club',
      title: 'Cyclist Club',
      subtitle: 'Community & Event Scheduling',
      category: 'react',
      tags: ['React', 'Express', 'MongoDB', 'Tailwind'],
      image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=1000&auto=format&fit=crop',
      description: 'Bringing riders together. Schedule group rides, track community events, assign rider roles, and post club announcements.',
      features: [
        'Event scheduling with route maps and RSVP tracking',
        'Member directory with custom role badges',
        'Club news feed and interactive discussion boards',
        'Mobile-optimized touch layout for on-the-go cyclists'
      ],
      liveUrl: 'https://cyclist-club.web.app/',
      githubUrl: 'https://github.com/Nadimmo/Cyclist-Club-Client-Side'
    },
    {
      id: 'beauty-parlor',
      title: 'Beauty Parlor',
      subtitle: 'Service Booking & Appointment Hub',
      category: 'booking',
      tags: ['React', 'Node.js', 'SSLCommerz', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000&auto=format&fit=crop',
      description: 'An online service booking experience allowing customers to schedule beauty treatments, submit payments, and leave reviews.',
      features: [
        'Live time-slot appointment scheduling',
        'Dual payment integration with SSLCommerz and Stripe',
        'Verified customer rating and review system',
        'Admin schedule calendar and revenue tracker'
      ],
      liveUrl: 'https://beauty-parlour-ten.vercel.app/',
      githubUrl: 'https://github.com/Nadimmo/Beauty-Parlar-Client-side-'
    }
  ];

  const filteredProjects = activeProjectTab === 'all'
    ? projects
    : projects.filter(p => p.category === activeProjectTab || p.tags.some(t => t.toLowerCase().includes(activeProjectTab)));

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 4000);
    }
  };

  return (
    <div style={{ backgroundColor: "#08080a", color: "#f4f4f5" }} className="min-h-screen bg-[#08080a] text-zinc-100 font-sans antialiased selection:bg-zinc-800 selection:text-white relative overflow-x-hidden">
      
      <GlobalStyles />

      {/* Dynamic Background Animation */}
      <CanvasBackground />
      <CursorGlow />
      <SmoothScroll />
      <ScrollProgress />

      {/* HEADER / NAVIGATION */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#08080a]/90 backdrop-blur-md border-b border-zinc-800/80 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group focus:outline-none">
            <span className="w-9 h-9 rounded-xl bg-white text-black font-extrabold flex items-center justify-center text-sm shadow-md transition-transform group-hover:scale-105">
              <img src="https://i.ibb.co.com/MkVtbRN1/photo-2026-02-15-15-53-32.jpg" alt="MD NADIM MOSTOFA" className="w-full h-full object-cover rounded-xl" />
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-white group-hover:text-zinc-300 transition-colors leading-none">
                MD NADIM MOSTOFA
              </span>
              <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">Full-Stack Dev</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#terminal" className="hover:text-white transition-colors">CLI Terminal</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsResumeOpen(true)} 
              className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white transition-all bg-zinc-900/60"
            >
              <FileText className="w-3.5 h-3.5" /> Resume
            </button>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 transition-all shadow-sm"
            >
              Let's Talk <ArrowRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-zinc-800 bg-[#08080a] px-6 py-4 space-y-3">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-zinc-300 hover:text-white py-1">About</a>
            <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-zinc-300 hover:text-white py-1">Skills</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-zinc-300 hover:text-white py-1">Projects</a>
            <a href="#terminal" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-zinc-300 hover:text-white py-1">CLI Terminal</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-zinc-300 hover:text-white py-1">Contact</a>
            <button onClick={() => { setMobileMenuOpen(false); setIsResumeOpen(true); }} className="w-full text-left text-sm font-medium text-zinc-300 hover:text-white py-1 flex items-center gap-2">
              <FileText className="w-4 h-4" /> View Resume
            </button>
          </div>
        )}
      </header>

      {/* MAIN CONTENT WRAPPER */}
      <main className="pt-24 relative z-10">
        
        {/* HERO SECTION */}
        <section
          className="min-h-[85vh] flex items-center py-12"
          style={{ "--mx": 0, "--my": 0 } as React.CSSProperties}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
            e.currentTarget.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.setProperty('--mx', '0');
            e.currentTarget.style.setProperty('--my', '0');
          }}
        >
          <div className="max-w-6xl mx-auto px-6 w-full hero-grid">
            
            <div className="space-y-6 text-left hero-in-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Open to Opportunities & Full-Stack Projects
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                  Hey there, I'm <br />
                  <span className="text-zinc-400">MD Nadim Mostofa.</span>
                </h1>
                <p className="text-lg sm:text-xl font-medium text-zinc-300 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-white shrink-0" />
                  <span>A Creative Problem Solver — Building modern digital experiences</span>
                </p>
              </div>

              <p className="text-zinc-400 text-base leading-relaxed max-w-xl">
                A passionate web developer crafting modern, fast, and user-friendly web applications using the <strong>MERN stack & Next.js</strong>. Focused on clean code, responsive design, and practical impact.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a 
                  href="#projects" 
                  className="px-6 py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-lg shadow-white/5"
                >
                  Explore Selected Work <ArrowRight className="w-4 h-4" />
                </a>
                <button 
                  onClick={() => setIsResumeOpen(true)}
                  className="px-6 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-white font-semibold text-sm transition-all flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-zinc-400" /> Download Resume
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-800/80">
                <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                  <div className="text-2xl font-bold text-white">20+</div>
                  <div className="text-xs text-zinc-400 font-medium mt-0.5">Projects Built</div>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                  <div className="text-2xl font-bold text-white">18+</div>
                  <div className="text-xs text-zinc-400 font-medium mt-0.5">Tech Tools</div>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-xs text-zinc-400 font-medium mt-0.5">Dedication</div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a href="https://github.com/Nadimmo" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors">
                  <Github className="w-4 h-4" />
                </a>
                <a href="https://www.linkedin.com/in/md-nadim-mostofa-931a48247" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="mailto:nadimmostafa334@gmail.com" className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </a>
                <span className="text-xs text-zinc-400 font-mono ml-2">📍 RANGPUR, BANGLADESH</span>
              </div>
            </div>

            <div className="flex justify-center md:justify-end hero-in-right">
              <div className="relative w-full max-w-md">
                {/* mouse-parallax depth layers behind the photo */}
                <div
                  className="absolute rounded-3xl border border-zinc-700/80 pointer-events-none"
                  style={{ inset: -18, transform: 'translate(calc(var(--mx) * 34px), calc(var(--my) * 34px))', transition: 'transform 0.25s ease-out' }}
                />
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{ width: 220, height: 220, top: -50, right: -50, background: 'radial-gradient(circle, rgba(255,255,255,0.14), rgba(255,255,255,0) 70%)', transform: 'translate(calc(var(--mx) * -50px), calc(var(--my) * -50px))', transition: 'transform 0.25s ease-out' }}
                />
                <div style={{ transform: 'translate(calc(var(--mx) * -14px), calc(var(--my) * -14px + var(--sy, 0) * -0.06px))', transition: 'transform 0.25s ease-out' }}>
              <TiltCard className="w-full">
                <div className="relative rounded-2xl bg-zinc-900 border border-zinc-700/80 p-3 shadow-2xl overflow-hidden group">
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
                    <img 
                      src="https://i.ibb.co.com/MkVtbRN1/photo-2026-02-15-15-53-32.jpg" 
                      alt="MD Nadim Mostofa Headshot" 
                      referrerPolicy="no-referrer"
                      onError={onImgError(['https://i.ibb.co/LzdSndc/photo-2026-02-15-15-53-32.jpg', AVATAR_PLACEHOLDER])}
                      className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-105 transition-all duration-500"
                    />

                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white flex items-center gap-1.5">
                      <TechIcon name="react" className="w-3.5 h-3.5" /> MERN & Next.js
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/85 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                        <span className="font-semibold text-white">MD Nadim Mostofa</span>
                      </div>
                      <span className="text-zinc-400 font-mono text-[11px]">📍 Rangpur, BD</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ABOUT ME SECTION */}
        <section id="about" className="py-20 border-t border-zinc-800/60 bg-zinc-950/40">
          <div className="max-w-6xl mx-auto px-6 reveal">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
              01 / ABOUT ME
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 tracking-tight">
              Curiosity meets code.
            </h2>

            <div className="flex flex-wrap gap-2 mb-8 border-b border-zinc-800 pb-4">
              {[
                { id: 'story', label: 'My Story', icon: User },
                { id: 'education', label: 'Education & Foundations', icon: GraduationCap },
                { id: 'journey', label: 'Learning Journey', icon: BookOpen },
                { id: 'philosophy', label: 'Engineering Philosophy', icon: ShieldCheck }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveAboutTab(tab.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                      activeAboutTab === tab.id
                        ? 'bg-white text-black'
                        : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" /> {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 gap-8 items-start">
              {activeAboutTab === 'story' && (
                <div className="space-y-6 text-zinc-400 text-base leading-relaxed">
                  <p className="text-lg text-zinc-200 font-medium">
                    More than writing code — I care about the people and possibilities behind every project.
                  </p>
                  <p>
                    Hi! I'm <strong className="text-white">MD Nadim Mostofa</strong>, a passionate MERN Stack Developer based in <strong>Rangpur, Bangladesh</strong>. I enjoy turning complex ideas into simple, intuitive web applications.
                  </p>
                  <p>
                    From crafting my first React component to building full-stack applications with Node.js APIs and MongoDB databases, I’m always learning, experimenting, and refining my engineering skills.
                  </p>
                  <div className="pt-4 border-t border-zinc-800 flex flex-wrap gap-4 text-xs font-mono text-zinc-400">
                    <span><strong>Based In:</strong> Rangpur City, Bangladesh</span>
                    <span>·</span>
                    <span><strong>Languages:</strong> Bangla (Native) · English (Professional) · Hindi</span>
                  </div>
                </div>
              )}

              {activeAboutTab === 'education' && (
                <div className="space-y-4">
                  <TiltCard>
                    <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-white">Diploma in Computer Science & Technology</h3>
                        <span className="text-xs font-mono px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 w-fit">2026</span>
                      </div>
                      <p className="text-sm text-zinc-400 font-medium">Kurigram Polytechnic Institute</p>
                      <p className="text-xs text-zinc-400 mt-2">Comprehensive curriculum covering computer networks, data structures, algorithms, database systems, and software engineering logic.</p>
                    </div>
                  </TiltCard>

                  {/* <TiltCard>
                    <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-white">SSC, Civil Drafting with CAD</h3>
                        <span className="text-xs font-mono px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 w-fit">GPA 4.75 · 2019–2020</span>
                      </div>
                      <p className="text-sm text-zinc-400 font-medium">Rangpur Technical School & College</p>
                      <p className="text-xs text-zinc-400 mt-2">Precision drafting, design structure, and planning logic.</p>
                    </div>
                  </TiltCard> */}
                </div>
              )}

              {activeAboutTab === 'journey' && (
                <div className="">
                  <TiltCard>
                    <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-white text-black font-extrabold flex items-center justify-center text-sm">
                          PH
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">Programming Hero — MERN Stack Batch 9</h3>
                          <p className="text-xs text-zinc-400">Full-Stack Development Training</p>
                        </div>
                      </div>
                      <p className="text-sm text-zinc-300 leading-relaxed">
                        Built full-stack applications with React, Express, Node.js, MongoDB, Firebase authentication, JWT authorization, and payment gateways.
                      </p>
                    </div>
                  </TiltCard>
                  <TiltCard>
                    <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-white text-black font-extrabold flex items-center justify-center text-sm">
                          EI
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">European IT Institute</h3>
                          <p className="text-xs text-zinc-400">Industrial Training</p>
                        </div>
                      </div>
                      <p className="text-sm text-zinc-300 leading-relaxed">
                        Built JavaScript applications with modern libraries like React.js
                      </p>
                    </div>
                  </TiltCard>
                </div>
              )}

              {activeAboutTab === 'philosophy' && (
                <div className="three-col">
                  <TiltCard>
                    <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 h-full">
                      <Zap className="w-6 h-6 text-white mb-3" />
                      <h3 className="font-bold text-white text-sm mb-1">Clean Architecture</h3>
                      <p className="text-xs text-zinc-400">Writing maintainable, modular, and performant code.</p>
                    </div>
                  </TiltCard>

                  <TiltCard>
                    <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 h-full">
                      <Layers className="w-6 h-6 text-white mb-3" />
                      <h3 className="font-bold text-white text-sm mb-1">User Experience</h3>
                      <p className="text-xs text-zinc-400">Designing responsive, intuitive, and accessible user interfaces.</p>
                    </div>
                  </TiltCard>

                  <TiltCard>
                    <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 h-full">
                      <Award className="w-6 h-6 text-white mb-3" />
                      <h3 className="font-bold text-white text-sm mb-1">Continuous Growth</h3>
                      <p className="text-xs text-zinc-400">Consistently mastering modern stack tools like Next.js App Router and TypeScript.</p>
                    </div>
                  </TiltCard>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-20 border-t border-zinc-800/60">
          <div className="max-w-6xl mx-auto px-6 reveal">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                  02 / MY EVERYDAY TOOLKIT
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  The tools behind the ideas.
                </h2>
              </div>

            </div>

            <SkillMarquee items={skills} />

          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-20 border-t border-zinc-800/60 bg-zinc-950/40">
          <div className="max-w-6xl mx-auto px-6 reveal">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                  03 / SELECTED WORK
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  Ideas brought to life.
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Projects' },
                  { id: 'mern', label: 'MERN Stack' },
                  { id: 'react', label: 'React' },
                  { id: 'booking', label: 'E-Commerce & Booking' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveProjectTab(tab.id)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      activeProjectTab === tab.id
                        ? 'bg-white text-black'
                        : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="proj-grid">
              {filteredProjects.map((proj, pIdx) => (
                <Reveal key={`${activeProjectTab}-${proj.id}`} className="h-full" delay={(pIdx % 3) * 120}>
                <TiltCard scaleOnHover={1.03}>
                  <article className="rounded-2xl bg-zinc-900/80 border border-zinc-800/90 overflow-hidden flex flex-col justify-between hover:border-zinc-500 transition-all group shadow-xl h-full">
                    <div>
                      <div className="relative aspect-video overflow-hidden bg-zinc-950 border-b border-zinc-800 group/img cursor-pointer" onClick={() => setSelectedProject(proj)}>
                        <img 
                          src={proj.image} 
                          alt={`${proj.title} Preview Mockup`} 
                          onError={onImgError(projectPlaceholder(proj.title))}
                          className="w-full h-full object-cover filter contrast-105 group-hover/img:scale-110 transition-transform duration-700 opacity-90 group-hover/img:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                        <span className="absolute top-3 left-3 text-[10px] font-mono px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-zinc-300 border border-white/10">
                          {proj.subtitle}
                        </span>
                        <div className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/80 text-white opacity-0 group-hover/img:opacity-100 transition-opacity">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-zinc-200 transition-colors">
                          {proj.title}
                        </h3>
                        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3">
                          {proj.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                          {proj.tags.map((tag, tIdx) => (
                            <span key={tIdx} className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-zinc-800/80 text-zinc-300 border border-zinc-700/50">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-zinc-950/60 border-t border-zinc-800/80 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedProject(proj)}
                        className="text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1.5"
                      >
                        View Details <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      
                      <div className="flex items-center gap-3">
                        <a 
                          href={proj.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-zinc-400 hover:text-white transition-colors p-1"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                        <a 
                          href={proj.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1 text-xs font-medium"
                        >
                          Live <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </article>
                </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* TERMINAL SECTION */}
        <section id="terminal" className="py-20 border-t border-zinc-800/60">
          <div className="max-w-4xl mx-auto px-6 reveal">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                <Terminal className="w-4 h-4 text-white" /> INTERACTIVE DEVELOPER CONSOLE
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Explore via CLI Terminal
              </h2>
            </div>

            <TiltCard>
              <div className="rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden shadow-2xl font-mono text-xs sm:text-sm">
                <div className="px-4 py-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
                  </div>
                  <span className="text-zinc-400 text-[11px]">nadim@portfolio-cli:~</span>
                  <span className="text-zinc-500 text-[10px]">zsh</span>
                </div>

                <div className="p-6 space-y-2.5 max-h-64 overflow-y-auto text-zinc-300">
                  {terminalLogs.map((log, idx) => (
                    <div key={idx} className={log.type === 'cmd' ? 'text-white font-semibold' : log.type === 'sys' ? 'text-zinc-400' : 'text-zinc-300'}>
                      {log.text}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleTerminalSubmit} className="p-4 bg-zinc-900/60 border-t border-zinc-800 flex items-center gap-2">
                  <span className="text-white font-bold">&gt;</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="Type 'bio', 'skills', 'projects', 'contact' or 'help'..."
                    className="w-full bg-transparent text-white focus:outline-none font-mono text-xs sm:text-sm"
                  />
                  <button type="submit" className="px-3 py-1 rounded bg-zinc-800 text-xs text-white hover:bg-zinc-700">
                    Run
                  </button>
                </form>
              </div>
            </TiltCard>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-20 border-t border-zinc-800/60 bg-zinc-950/40">
          <div className="max-w-6xl mx-auto px-6 reveal">
            <div className="contact-grid">
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400">
                  05 / SAY HELLO
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  Have something in mind?
                </h2>
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                  A project, an opportunity, or just a friendly hello — I’d love to hear from you. Let’s build something meaningful together.
                </p>

                <div className="grid grid-cols-1 gap-4 pt-4">
                  <a href="mailto:nadimmostafa334@gmail.com" className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-600 transition-all text-white text-sm font-medium">
                    <Mail className="w-5 h-5 text-zinc-400" />
                    <span>nadimmostafa334@gmail.com</span>
                  </a>

                  <a href="tel:+8801756790052" className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-600 transition-all text-white text-sm font-medium">
                    <Phone className="w-5 h-5 text-zinc-400" />
                    <span>+880 1756790052</span>
                  </a>

                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-zinc-300 text-sm font-medium">
                    <MapPin className="w-5 h-5 text-zinc-400" />
                    <span>Rangpur City, Bangladesh</span>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/40 border border-zinc-800 p-6 sm:p-8 rounded-2xl">
                {formSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-white text-black mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Message Sent Successfully!</h3>
                    <p className="text-zinc-400 text-sm max-w-sm mx-auto">
                      Thank you for reaching out, MD Nadim Mostofa will respond to your message shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="two-col">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">First Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John"
                          className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-white transition-colors"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-white transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Your Message</label>
                      <textarea
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about your project or opportunity..."
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-white transition-colors resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" /> Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="py-8 border-t border-zinc-800/80 bg-zinc-950 text-xs text-zinc-400 relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © 2026 MD Nadim Mostofa. Thoughtfully designed & carefully built.
          </div>

          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            <button 
              onClick={() => smoothScrollTo(0)} 
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>

      {/* PROJECT DETAILS MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="rounded-xl overflow-hidden aspect-video mb-6 border border-zinc-800">
              <img src={selectedProject.image} alt={selectedProject.title} onError={onImgError(projectPlaceholder(selectedProject.title))} className="w-full h-full object-cover" />
            </div>

            <span className="text-xs font-mono text-zinc-400 uppercase">{selectedProject.subtitle}</span>
            <h3 className="text-2xl font-bold text-white mb-3">{selectedProject.title}</h3>
            
            <p className="text-zinc-300 text-sm leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Key Features & Technical Breakdown</h4>
            <ul className="space-y-2 mb-6 text-sm text-zinc-300">
              {selectedProject.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mb-8">
              {selectedProject.tags.map((tag, idx) => (
                <span key={idx} className="text-xs font-mono px-3 py-1 rounded-lg bg-zinc-800 text-zinc-300">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-zinc-800">
              <a 
                href={selectedProject.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-1 py-3.5 rounded-xl bg-white text-black font-semibold text-center text-sm hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
              >
                Launch Live Demo <ExternalLink className="w-4 h-4" />
              </a>
              <a 
                href={selectedProject.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-5 py-3.5 rounded-xl bg-zinc-800 text-white font-semibold text-sm hover:bg-zinc-700 transition-colors flex items-center gap-2"
              >
                <Github className="w-4 h-4" /> Source
              </a>
            </div>
          </div>
        </div>
      )}

      {/* RESUME VIEW / DOWNLOAD MODAL */}
      {isResumeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl">
            <button 
              onClick={() => setIsResumeOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-bold">
                CV
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">MD Nadim Mostofa — Resume Overview</h3>
                <p className="text-xs text-zinc-400">Full-Stack MERN & Next.js Web Developer</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-zinc-300 bg-zinc-950 p-4 rounded-xl border border-zinc-800 font-mono mb-6">
              <p>👤 <strong>Full Name:</strong> MD Nadim Mostofa</p>
              <p>📍 <strong>Location:</strong> Rangpur City, Bangladesh</p>
              <p>✉️ <strong>Email:</strong> nadimmostafa334@gmail.com</p>
              <p>📞 <strong>Phone:</strong> +880 1756790052</p>
              <p>🎓 <strong>Education:</strong> Diploma in CST (Kurigram Polytechnic, 2026)</p>
              <p>🚀 <strong>Training:</strong> Programming Hero MERN Stack Batch 9</p>
              <p>💻 <strong>Core Stack:</strong> React.js, Next.js, Node.js, Express.js, MongoDB, Tailwind CSS</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const textContent = `MD NADIM MOSTOFA - FULL-STACK DEVELOPER\nEmail: nadimmostafa334@gmail.com\nPhone: +880 1756790052\nLocation: Rangpur, Bangladesh\nStack: React, Next.js, Node.js, Express.js, MongoDB, Tailwind CSS`;
                  const blob = new Blob([textContent], { type: 'text/plain' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'MD_Nadim_Mostofa_CV.txt';
                  a.click();
                  window.URL.revokeObjectURL(url);
                }}
                className="flex-1 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Resume TXT
              </button>
              <button 
                onClick={() => setIsResumeOpen(false)}
                className="px-5 py-3 rounded-xl bg-zinc-800 text-white font-semibold text-sm hover:bg-zinc-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}