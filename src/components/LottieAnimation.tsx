'use client';

import { useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web';

interface LottieAnimationProps {
  animationPath: string;
  className?: string;
}

export default function LottieAnimation({ animationPath, className }: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationInstanceRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (animationInstanceRef.current) {
      animationInstanceRef.current.destroy();
    }

    const anim = lottie.loadAnimation({
      container,
      renderer: 'svg',
      loop: true,
      autoplay: false, // Don't autoplay immediately; wait until in viewport
      path: animationPath,
    });
    animationInstanceRef.current = anim;

    // IntersectionObserver to only play when user reaches / is in the section
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          anim.play();
        } else {
          anim.pause();
        }
      },
      {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.15,
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      anim.destroy();
      animationInstanceRef.current = null;
    };
  }, [animationPath]);

  return <div ref={containerRef} className={className} />;
}
