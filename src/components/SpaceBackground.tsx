'use client';

// Lightweight celestial diamond sparkle star
const CelestialSparkle = ({
  top,
  left,
  size = 'w-2.5 h-2.5',
  delay = '0s',
  color = 'text-white/70',
}: {
  top: string;
  left: string;
  size?: string;
  delay?: string;
  color?: string;
}) => (
  <div
    className={`absolute ${size} ${color} pointer-events-none animate-celestial-sparkle`}
    style={{ top, left, animationDelay: delay }}
  >
    <svg viewBox="0 0 16 16" className="w-full h-full" fill="currentColor">
      <path d="M8 0C8 4.418 4.418 8 0 8C4.418 8 8 11.582 8 16C8 11.582 11.582 8 16 8C11.582 8 8 4.418 8 0Z" />
    </svg>
  </div>
);

export default function SpaceBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#070d1e]"
      style={{
        contain: 'strict',
      }}
    >
      {/* 1. Ultra-lightweight Static Star Dust Pattern using CSS Radial Gradients (0 DOM nodes, 0 frame repaints) */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 15% 12%, rgba(255, 255, 255, 0.8), transparent),
            radial-gradient(1.5px 1.5px at 35% 24%, rgba(147, 197, 253, 0.85), transparent),
            radial-gradient(1px 1px at 55% 8%, rgba(255, 255, 255, 0.6), transparent),
            radial-gradient(1.5px 1.5px at 75% 18%, rgba(199, 210, 254, 0.9), transparent),
            radial-gradient(1px 1px at 90% 32%, rgba(255, 255, 255, 0.7), transparent),
            radial-gradient(1.5px 1.5px at 25% 48%, rgba(255, 255, 255, 0.75), transparent),
            radial-gradient(1px 1px at 65% 58%, rgba(165, 243, 252, 0.8), transparent),
            radial-gradient(1.5px 1.5px at 85% 72%, rgba(255, 255, 255, 0.8), transparent),
            radial-gradient(1px 1px at 45% 82%, rgba(224, 231, 255, 0.7), transparent),
            radial-gradient(1.5px 1.5px at 15% 92%, rgba(255, 255, 255, 0.75), transparent)
          `,
          backgroundSize: '100% 100%',
        }}
      />

      {/* 2. Soft Ambient Vignette Aura (Hardware accelerated single layer) */}
      <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-indigo-950/20 blur-[120px]" />
      <div className="absolute top-[40%] -right-[15%] w-[700px] h-[700px] rounded-full bg-blue-950/20 blur-[140px]" />

      {/* 3. Subtle Celestial Accent Sparkles (Minimal DOM footprint, zero layer thrashing) */}
      <CelestialSparkle top="10%" left="82%" size="w-3 h-3" delay="0s" color="text-white/80" />
      <CelestialSparkle top="28%" left="12%" size="w-2.5 h-2.5" delay="1.8s" color="text-cyan-200/70" />
      <CelestialSparkle top="60%" left="88%" size="w-2.5 h-2.5" delay="2.6s" color="text-indigo-200/75" />
      <CelestialSparkle top="82%" left="22%" size="w-3 h-3" delay="1.2s" color="text-white/80" />
    </div>
  );
}
