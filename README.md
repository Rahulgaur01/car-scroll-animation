# Scroll-Driven Hero Section Animation

A scroll-driven hero section inspired by the Itzfizz reference, built with Next.js, Tailwind CSS and GSAP ScrollTrigger.

## 🔗 Links
- **Live Demo:** https://car-scroll-animation.vercel.app
- **Repository:** https://github.com/Rahulgaur01/car-scroll-animation

## 🛠 Tech Stack
- Next.js (App Router)
- Tailwind CSS
- GSAP + ScrollTrigger
- Vanilla CSS for custom animations

## ✨ Features
- **Staggered intro animation** — headline letters reveal one-by-one on load
- **Scroll-scrubbed timeline** — animation tied to scroll progress, not time
- **Transform-only motion** — only `transform` and `opacity` animated for 60fps
- **Eased interpolation** — `scrub: 1.1` for natural, fluid motion
- **Reduced-motion support** — respects `prefers-reduced-motion`

## 🚀 Run Locally
\`\`\`bash
npm install
npm run dev
\`\`\`

Open http://localhost:3000

## 📁 Structure
\`\`\`
app/
  ├── page.jsx          # Home route
  └── globals.css       # Global + custom CSS
components/
  └── Hero.jsx          # Scroll-driven hero component
public/
  └── car.png           # Hero visual
\`\`\`
