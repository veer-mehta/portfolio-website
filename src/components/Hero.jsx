import { useState, useEffect } from 'react';
import GameOfLife from './GameOfLife';
import './Hero.css';

export default function Hero() {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setLoaded(true), 100);
		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			<section className="hero" id="hero-section">
				<GameOfLife />
				<div className={`hero-content ${loaded ? 'show' : ''}`}>
					<h1 className="hero-name pixel-font">
						<span className="glitch-text" data-text="VEER MEHTA">VEER MEHTA</span>
					</h1>
					<div className="hero-tagline">
						<span className="text-green">&gt;</span>
						<span className="tagline-text">
							btech cse student<span className="text-grey"> | </span>
							web3 & ai<span className="text-grey"> | </span>
							full-stack
						</span>
						<span className="cursor">_</span>
					</div>
				</div>
			</section>
			<div className="hero-disclaimer">* it's just the game of life with lerp</div>
		</>
	);
}
