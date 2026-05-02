import { useEffect, useState, useRef, useCallback } from 'react';
import './PacmanScrollbar.css';

const DOT_COUNT = 12;

export default function PacmanScrollbar() {
  const [scrollProp, setScrollProp] = useState(0);
  const [direction, setDirection] = useState('down');
  const [turnPos, setTurnPos] = useState(0);
  const [pacmanPos, setPacmanPos] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [respawnKeys, setRespawnKeys] = useState(() => new Array(DOT_COUNT).fill(0));
  const lastScrollRef = useRef(0);
  const dirRef = useRef('down');
  const wasEatenRef = useRef(new Array(DOT_COUNT).fill(false));
  const scrollTimerRef = useRef(null);
  const containerRef = useRef(null);

  const getDotPositions = useCallback(() => {
    const container = containerRef.current;
    if (!container) return [];
    const trackHeight = container.offsetHeight;
    return Array.from({ length: DOT_COUNT }, (_, i) =>
      ((i + 1) / (DOT_COUNT + 1)) * trackHeight
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      setIsScrolling(true);
      clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => setIsScrolling(false), 150);

      const prop = scrollTop / docHeight;
      const goingDown = scrollTop > lastScrollRef.current;
      const goingUp = scrollTop < lastScrollRef.current;

      if (goingDown && dirRef.current === 'up') {
        const container = containerRef.current;
        if (container) {
          const prevProp = lastScrollRef.current / docHeight;
          setTurnPos(prevProp * (container.offsetHeight - 16) + 8);
        }
        dirRef.current = 'down';
        setDirection('down');
      } else if (goingUp && dirRef.current === 'down') {
        const container = containerRef.current;
        if (container) {
          const prevProp = lastScrollRef.current / docHeight;
          setTurnPos(prevProp * (container.offsetHeight - 16) + 8);
        }
        dirRef.current = 'up';
        setDirection('up');
      }

      lastScrollRef.current = scrollTop;
      setScrollProp(prop);

      const container = containerRef.current;
      if (!container) return;
      const trackHeight = container.offsetHeight;
      const currentPacmanPos = prop * (trackHeight - 16) + 8;
      setPacmanPos(currentPacmanPos);

      const dotPositions = getDotPositions();
      const newRespawnKeys = [...wasEatenRef.current];
      let needsUpdate = false;

      dotPositions.forEach((dotY, i) => {
        const sweepMin = Math.min(turnPos, currentPacmanPos);
        const sweepMax = Math.max(turnPos, currentPacmanPos);
        const isEaten = dotY >= sweepMin && dotY <= sweepMax;

        if (wasEatenRef.current[i] && !isEaten) {
          needsUpdate = true;
          newRespawnKeys[i] = true;
        }
        wasEatenRef.current[i] = isEaten;
      });

      if (needsUpdate) {
        setRespawnKeys(prev => {
          const next = [...prev];
          dotPositions.forEach((_, i) => {
            if (newRespawnKeys[i] === true) {
              next[i] = prev[i] + 1;
            }
          });
          return next;
        });
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(scrollTimerRef.current);
    };
  }, [turnPos, getDotPositions]);

  const trackHeight = containerRef.current ? containerRef.current.offsetHeight : 1;

  return (
    <div className="pacman-scrollbar-container" ref={containerRef}>
      {Array.from({ length: DOT_COUNT }, (_, i) => {
        const topPct = ((i + 1) / (DOT_COUNT + 1)) * 100;
        const dotY = ((i + 1) / (DOT_COUNT + 1)) * trackHeight;

        const sweepMin = Math.min(turnPos, pacmanPos);
        const sweepMax = Math.max(turnPos, pacmanPos);
        const eaten = dotY >= sweepMin && dotY <= sweepMax;

        const distFromPacman = Math.abs(dotY - pacmanPos);
        const delay = (distFromPacman / trackHeight) * 0.6;

        return (
          <div
            key={`dot-${i}-${respawnKeys[i]}`}
            className={`pacman-dot ${eaten ? 'eaten' : 'visible'}`}
            style={{
              top: `${topPct}%`,
              animationDelay: eaten ? '0s' : `${delay}s`,
              animationFillMode: 'backwards',
            }}
          />
        );
      })}
      <div
        className={`pacman-thumb ${direction} ${isScrolling ? 'chomping' : 'idle'}`}
        style={{ transform: `translateY(calc(${scrollProp} * (60vh - 16px)))` }}
      >
        <div className="pacman-sprite"></div>
      </div>
    </div>
  );
}
