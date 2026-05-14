import { useRef, useEffect } from 'react';

const CELL_SIZE = 10;
const CELL_ALPHA = 0.15;

function createGrid(cols, rows) {
  const grid = [];
  for (let i = 0; i < cols * rows; i++) {
    grid[i] = Math.random() < 0.3 ? 1.0 : 0.0;
  }
  return grid;
}

function idx(x, y, cols) {
  return y * cols + x;
}

function stepLife(grid, cols, rows) {
  const next = new Float32Array(cols * rows);
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let count = 0;
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue;
          const nx = (x + dx + cols) % cols;
          const ny = (y + dy + rows) % rows;
          if (grid[idx(nx, ny, cols)] > 0.5) count++;
        }
      }
      const alive = grid[idx(x, y, cols)] > 0.5;
      next[idx(x, y, cols)] = (alive && (count === 2 || count === 3)) || (!alive && count === 3) ? 1.0 : 0.0;
    }
  }
  return next;
}

function cssRgbToCanvasRgb(value) {
  return value.trim().split(/\s+/).join(', ');
}

export default function GameOfLife() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cellColor = cssRgbToCanvasRgb(getComputedStyle(document.documentElement).getPropertyValue('--green-rgb'));

    let cols, rows, current, display, animId;
    let lastStep = 0;
    const STEP_INTERVAL = 300;
    const LERP_SPEED = 0.04;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      cols = Math.floor(canvas.width / CELL_SIZE);
      rows = Math.floor(canvas.height / CELL_SIZE);
      current = createGrid(cols, rows);
      display = Float32Array.from(current);
    };

    resize();
    window.addEventListener('resize', resize);

    const handlePointerMove = (e) => {
      if (!current || !display) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      // If outside canvas bounds, ignore
      if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;

      const gridX = Math.floor(x / CELL_SIZE);
      const gridY = Math.floor(y / CELL_SIZE);
      
      // Spawn a random cluster around the cursor
      for (let dx = -2; dx <= 2; dx++) {
        for (let dy = -2; dy <= 2; dy++) {
          if (Math.random() > 0.4) continue;
          const nx = (gridX + dx + cols) % cols;
          const ny = (gridY + dy + rows) % rows;
          const index = idx(nx, ny, cols);
          if (index >= 0 && index < current.length) {
            current[index] = 1.0;
            display[index] = 1.0; // Instantly visible
          }
        }
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    const render = (timestamp) => {
      if (timestamp - lastStep > STEP_INTERVAL) {
        lastStep = timestamp;
        current = stepLife(current, cols, rows);
      }

      // lerp display toward current for smooth transitions
      for (let i = 0; i < display.length; i++) {
        display[i] += (current[i] - display[i]) * LERP_SPEED;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const val = display[idx(x, y, cols)];
          if (val > 0.01) {
            ctx.fillStyle = `rgba(${cellColor}, ${val * CELL_ALPHA})`;
            ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
