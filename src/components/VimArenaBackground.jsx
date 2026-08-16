import { useRef, useEffect } from 'react';

const WORDS = [
	'function', 'return', 'const', 'let', 'type', 'class', 'import', 'export',
	'interface', 'array', 'string', 'number', 'boolean', 'object', 'async',
	'await', 'promise', 'error', 'debug', 'stack', 'loop', 'while', 'break',
	'switch', 'default', 'filter', 'reduce', 'map', 'find', 'sort', 'slice',
	'parse', 'format', 'render', 'update', 'delete', 'insert', 'search',
	'replace', 'buffer', 'cursor', 'motion', 'normal', 'visual', 'insert',
	'yank', 'paste', 'macro', 'register', 'pattern', 'regex', 'match',
	'token', 'syntax', 'scope', 'block', 'inline', 'offset', 'index',
	'value', 'target', 'source', 'result', 'output', 'input', 'config',
	'system', 'engine', 'plugin', 'module', 'widget', 'signal', 'event',
	'queue', 'cache', 'flush', 'drain', 'spawn', 'merge', 'diff', 'patch',
	'clone', 'proxy', 'guard', 'route', 'state', 'store', 'action', 'slice',
	'arena', 'tower', 'enemy', 'spawn', 'range', 'damage', 'combat', 'kill',
];

const ENEMY_CHARS = ['/', '#', '@', '!', '*'];
const FONT_SIZE = 24;
const ROW_HEIGHT = 28;
const FONT_FAMILY = '"Press Start 2P", monospace';

function pick(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

export default function VimArenaBackground() {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');

		let width = 0;
		let height = 0;
		let charWidth = 24;
		let textLines = [];
		let enemies = [];
		let spawnTimer = 0;
		let lastTime = performance.now();
		let animId;

		const generateLines = () => {
			if (width === 0 || height === 0) return;
			ctx.font = `${FONT_SIZE}px ${FONT_FAMILY}`;
			const metrics = ctx.measureText('M');
			charWidth = metrics.width || 24;

			const visibleRows = Math.ceil(height / ROW_HEIGHT) + 4;
			const lines = [];

			for (let r = 0; r < visibleRows; r++) {
				const lineWords = [];
				let currentWidth = 0;
				while (currentWidth < width + 300) {
					const word = pick(WORDS);
					lineWords.push(word);
					const testString = lineWords.join(' ');
					currentWidth = ctx.measureText(testString).width;
				}
				lines.push(lineWords.join(' '));
			}
			textLines = lines;
		};

		const resize = () => {
			width = window.innerWidth;
			height = window.innerHeight;
			canvas.width = width;
			canvas.height = height;

			generateLines();
		};

		resize();
		window.addEventListener('resize', resize);

		if (document.fonts) {
			document.fonts.ready.then(() => {
				resize();
			});
		}

		const spawnEnemy = () => {
			const margin = 40;
			let x = 0, y = 0, tx = 0, ty = 0;
			const edge = Math.floor(Math.random() * 4);

			if (edge === 0) { // left -> right
				x = -margin;
				y = Math.random() * height;
				tx = width + margin;
				ty = y + (Math.random() - 0.5) * 200;
			} else if (edge === 1) { // right -> left
				x = width + margin;
				y = Math.random() * height;
				tx = -margin;
				ty = y + (Math.random() - 0.5) * 200;
			} else if (edge === 2) { // top -> bottom
				x = Math.random() * width;
				y = -margin;
				tx = x + (Math.random() - 0.5) * 200;
				ty = height + margin;
			} else { // bottom -> top
				x = Math.random() * width;
				y = height + margin;
				tx = x + (Math.random() - 0.5) * 200;
				ty = -margin;
			}

			const speed = 110 + Math.random() * 140;
			const char = pick(ENEMY_CHARS);
			const hasLabel = Math.random() < 0.35;
			const label = hasLabel ? String.fromCharCode(97 + Math.floor(Math.random() * 26)) : null;

			enemies.push({
				x,
				y,
				targetX: tx,
				targetY: ty,
				bodyX: x,
				bodyY: y,
				speed,
				char,
				label,
			});
		};

		const render = (time) => {
			const delta = Math.min(time - lastTime, 100);
			lastTime = time;
			const dt = delta / 1000;

			// Update enemy spawn
			spawnTimer -= delta;
			if (spawnTimer <= 0) {
				spawnTimer = 700 + Math.random() * 900;
				spawnEnemy();
			}

			// Clear background
			ctx.fillStyle = '#050505';
			ctx.fillRect(0, 0, width, height);

			// Draw background editor code text matching vim-arena 24px layout
			ctx.font = `${FONT_SIZE}px ${FONT_FAMILY}`;
			ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
			ctx.textBaseline = 'top';
			ctx.textAlign = 'left';

			for (let r = 0; r < textLines.length; r++) {
				ctx.fillText(textLines[r], 0, r * ROW_HEIGHT);
			}

			// Update & draw enemies
			for (let i = enemies.length - 1; i >= 0; i--) {
				const e = enemies[i];

				// Move towards target
				const dx = e.targetX - e.x;
				const dy = e.targetY - e.y;
				const dist = Math.hypot(dx, dy);

				if (dist > 10) {
					e.x += (dx / dist) * e.speed * dt;
					e.y += (dy / dist) * e.speed * dt;
				}

				// Twitchy grid lerp for authentic buggy movement
				const col = Math.floor(e.x / charWidth);
				const row = Math.floor(e.y / ROW_HEIGHT);
				const targetGX = col * charWidth + charWidth / 2;
				const targetGY = row * ROW_HEIGHT + ROW_HEIGHT / 2;

				const lerpFactor = 1 - Math.pow(0.00000001, dt);
				e.bodyX += (targetGX - e.bodyX) * lerpFactor;
				e.bodyY += (targetGY - e.bodyY) * lerpFactor;

				// Remove if offscreen
				if (
					e.x < -120 || e.x > width + 120 ||
					e.y < -120 || e.y > height + 120
				) {
					enemies.splice(i, 1);
					continue;
				}

				// Draw enemy red box & character
				const boxSize = 24;
				ctx.fillStyle = '#b32d2d';
				ctx.fillRect(e.bodyX - boxSize / 2, e.bodyY - boxSize / 2, boxSize, boxSize);

				ctx.font = '14px "Press Start 2P", monospace';
				ctx.fillStyle = '#ffffff';
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText(e.char, e.bodyX, e.bodyY);

				// Draw floating yellow label if present
				if (e.label) {
					const labelY = e.bodyY - 20;
					ctx.fillStyle = '#000000';
					ctx.fillRect(e.bodyX - 9, labelY - 8, 18, 16);

					ctx.font = '10px "Press Start 2P", monospace';
					ctx.fillStyle = '#ffff00';
					ctx.fillText(e.label, e.bodyX, labelY);
				}
			}

			animId = requestAnimationFrame(render);
		};

		animId = requestAnimationFrame(render);

		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener('resize', resize);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			style={{
				width: '100%',
				height: '100%',
				display: 'block',
				backgroundColor: '#050505',
			}}
		/>
	);
}
