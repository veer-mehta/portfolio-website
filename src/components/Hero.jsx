import { useState, useEffect, useCallback, useRef } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt } from "react-icons/fa";
import GameOfLife from "./GameOfLife";
import "./Hero.css";

const GLYPHS = "abcdefghijklmnopqrstuvwxyz0123456789";
const DEFAULT_TEXT = "ahmedabad / remote";

function buildStatsString(stats) {
	if (!stats) return "conway's game of life";
	return `conway's game of life / gen ${stats.generation} / pop ${stats.population} / density ${stats.density}%`;
}

export default function Hero() {
	const [loaded, setLoaded] = useState(false);
	const [emailCopied, setEmailCopied] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [pillText, setPillText] = useState(DEFAULT_TEXT);

	const lifeStats = useRef(null);
	const pillTextRef = useRef(DEFAULT_TEXT);
	const animIntervalRef = useRef(null);
	const liveIntervalRef = useRef(null);

	useEffect(() => {
		const timer = setTimeout(() => setLoaded(true), 500);
		return () => clearTimeout(timer);
	}, []);

	const runScramble = useCallback((targetText, onComplete) => {
		clearInterval(animIntervalRef.current);
		clearInterval(liveIntervalRef.current);

		const fromText = pillTextRef.current;
		const maxLen = Math.max(fromText.length, targetText.length);
		const FRAME_INTERVAL = 24;
		const resizeFrames = 18;
		const totalFrames = 38;

		const glyphBuffer = Array.from({ length: maxLen }, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);
		let frame = 0;

		animIntervalRef.current = setInterval(() => {
			frame++;
			let output = "";

			if (frame <= resizeFrames) {
				// Phase 1: Resize pill to target dimensions while scrambling all characters
				const progress = frame / resizeFrames;
				const currentLen = Math.round(fromText.length + (targetText.length - fromText.length) * progress);

				for (let i = 0; i < currentLen; i++) {
					if (Math.random() < 0.28) {
						glyphBuffer[i] = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
					}
					output += glyphBuffer[i];
				}
			} else if (frame < totalFrames) {
				// Phase 2: Pill reached target dimensions; all characters scramble together
				for (let i = 0; i < targetText.length; i++) {
					if (targetText[i] === " ") {
						output += " ";
					} else {
						if (Math.random() < 0.28) {
							glyphBuffer[i] = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
						}
						output += glyphBuffer[i];
					}
				}
			} else {
				// Phase 3: Final frame - load all characters simultaneously
				clearInterval(animIntervalRef.current);
				setPillText(targetText);
				pillTextRef.current = targetText;
				if (onComplete) onComplete();
				return;
			}

			setPillText(output);
			pillTextRef.current = output;
		}, FRAME_INTERVAL);
	}, []);

	const handleMouseEnter = () => {
		setIsHovered(true);
		const target = buildStatsString(lifeStats.current);
		runScramble(target, () => {
			liveIntervalRef.current = setInterval(() => {
				if (lifeStats.current) {
					const updated = buildStatsString(lifeStats.current);
					setPillText(updated);
					pillTextRef.current = updated;
				}
			}, 300);
		});
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
		runScramble(DEFAULT_TEXT);
	};

	const handleCopyEmail = (e) => {
		e.preventDefault();
		navigator.clipboard.writeText('hello@veermehta.dev');
		setEmailCopied(true);
		setTimeout(() => setEmailCopied(false), 2000);
	};

	const handleStats = useCallback((stats) => {
		lifeStats.current = stats;
	}, []);

	useEffect(() => {
		return () => {
			clearInterval(animIntervalRef.current);
			clearInterval(liveIntervalRef.current);
		};
	}, []);

	return (
		<>
			<section className="hero" id="hero-section">
				<GameOfLife onStats={handleStats} />
				<div className="hero-container">
					<div className={`hero-content ${loaded ? "show" : ""}`}>
						<div 
							className="hero-eyebrow"
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
						>
							<span className={`hero-eyebrow-pill ${isHovered ? "active" : ""}`}>
								{pillText}
							</span>
						</div>
						<h1 className="hero-name">
							Veer Mehta
						</h1>
						<p className="hero-summary">
							I spend most of my free time building games, configuring and learning Linux, and tinkering with my home server & software systems.
							Most of my projects start from simple curiosity and evolve into tools I can build, break, and optimize.
						</p>
						<div className="hero-console" aria-label="Quick profile">
							<div className="console-cell">
								<span>interests</span>
								<strong>backend, linux, systems dev</strong>
							</div>
							<div className="console-cell">
								<span>stack</span>
								<strong>react / node / python / pgsql</strong>
							</div>
							<div className="console-cell">
								<span>learning</span>
								<strong>golang, opengl</strong>
							</div>
						</div>
						<div className="hero-actions">
							<a
								href="https://github.com/veer-mehta"
								target="_blank"
								rel="noopener noreferrer"
								className="hero-action primary"
							>
								<FaGithub /> github
							</a>
							<a
								href="https://linkedin.com/in/viirmehta"
								target="_blank"
								rel="noopener noreferrer"
								className="hero-action"
							>
								<FaLinkedin /> linkedin
							</a>
							<a 
								href="#email" 
								onClick={handleCopyEmail} 
								className="hero-action"
							>
								<FaEnvelope /> {emailCopied ? 'copied!' : 'email'}
							</a>
							<a href="/VeerMehtaResume.pdf" download className="hero-action">
								<FaFileAlt /> resume
							</a>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
