# 💻 Emran Hossen | Full-Stack Web Developer Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-15%2B-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

Welcome to the repository of my personal portfolio website. This is a premium, high-performance, and visually stunning full-stack portfolio built to showcase my software engineering journey, technical skills, projects, and professional experience.

🔗 **Live Link:** [emran.work](https://emran.work) *(Or replace with your domain)*

---

## ✨ Features

- 🌓 **Dynamic Theme Switching:** Seamless transition between Light and Dark modes with persistent user preferences.
- ⚡ **Interactive Hero Section:** Typing effect showcasing multiple developer roles dynamically.
- 📂 **Filtered Projects Showcase:** Beautiful cards exhibiting complete projects, filterable by categories (Frontend, Backend, MERN, SaaS, etc.) with responsive overlays.
- 📈 **Live GitHub Statistics:** Dynamically renders live user metrics, top languages, and contributions grid.
- 📱 **Smooth Carousel Slider:** Custom touch-responsive slider for services offered with auto-scroll and hover physics.
- 📝 **Interactive Contact Form:** A clean, fully functional contact form to capture user inquiries.
- 🖨️ **Print-Friendly Resume:** Print layout optimization enabling visitors to print/save the resume layout cleanly.
- 📱 **Fully Responsive Layout:** Optimized for all screen sizes from mobile devices to ultra-wide displays.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router, Turbopack)
- **Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (using CSS-first `@theme` configuration) & Vanilla CSS
- **Icons:** Lucide React & Custom Brand SVGs
- **Build Tools:** PostCSS, ESLint

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── api/                   # Serverless API routes (e.g. GitHub metrics fetching)
│   ├── globals.css            # Global CSS variables, custom keyframes & print styles
│   ├── layout.tsx             # Root layout with HTML headers and SEO tags
│   └── page.tsx               # Main entry page assembling all sections
├── components/
│   ├── AboutMe.tsx            # Carousel-based Services & Stats component
│   ├── BrandIcons.tsx         # SVG icons wrapper for social platforms
│   ├── Contact.tsx            # Contact details and input form
│   ├── EducationExperience.tsx# Responsive timeline grid for career path
│   ├── Footer.tsx             # Branding and social navigation footer
│   ├── GitHubStats.tsx        # Github stats API integrator and viewer
│   ├── Hero.tsx               # Introductory terminal typing dashboard
│   ├── Navbar.tsx             # Responsive sticky navigation bar
│   ├── Projects.tsx           # Portfolio projects gallery with category filter
│   ├── Skills.tsx             # Animated progress bars for skills tracking
│   └── ThemeToggle.tsx        # Light/Dark mode state toggle button
└── public/                    # Static assets (images, favicon, resume PDF)
