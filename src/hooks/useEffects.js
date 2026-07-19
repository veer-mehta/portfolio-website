import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Text scramble effect — characters decode from random symbols
 * into the real text, like a terminal cracking a cipher.
 */
export function useTextScramble(text, { trigger = true, speed = 30, chars = '01!@#$%&*_-+=<>?/\\|{}[]~^' } = {}) {
  const [display, setDisplay] = useState(text);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!trigger || hasRun.current) return;
    hasRun.current = true;

    let frame = 0;
    const totalFrames = text.length + 12;
    const queue = [];

    // Build a queue: each character gets a random "reveal at" frame
    for (let i = 0; i < text.length; i++) {
      const revealAt = Math.floor(Math.random() * (totalFrames * 0.6)) + i * 0.5;
      queue.push({ char: text[i], revealAt });
    }

    const interval = setInterval(() => {
      let output = '';
      let complete = 0;

      for (let i = 0; i < queue.length; i++) {
        const { char, revealAt } = queue[i];
        if (char === ' ') {
          output += ' ';
          complete++;
        } else if (frame >= revealAt) {
          output += char;
          complete++;
        } else {
          output += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      setDisplay(output);

      if (complete >= queue.length) {
        clearInterval(interval);
        setDisplay(text);
      }

      frame++;
    }, speed);

    return () => clearInterval(interval);
  }, [trigger, text, speed, chars]);

  return display;
}

/**
 * IntersectionObserver hook — fires once when element enters viewport.
 */
export function useInView(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: options.threshold ?? 0.15, ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

/**
 * 3D tilt effect — returns a ref and a style object.
 * Attach ref to container, spread style onto the tilting element.
 */
export function useTilt({ max = 6, speed = 400, scale = 1.02 } = {}) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -max;
    const rotateY = ((x - centerX) / centerX) * max;

    setStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: `transform ${speed / 4}ms ease-out`,
    });
  }, [max, speed, scale]);

  const handleLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: `transform ${speed}ms ease-out`,
    });
  }, [speed]);

  return { ref, style, handleMove, handleLeave };
}
