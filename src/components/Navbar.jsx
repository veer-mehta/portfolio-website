import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';

const NAV_ITEMS = [
	{ label: 'Home', path: '/' },
	{ label: 'Blog', path: '/blog' },
];

export default function Navbar() {
	const location = useLocation();
	const [menuOpen, setMenuOpen] = useState(false);
	const [showLogo, setShowLogo] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const heroName = document.querySelector('.hero-name');
			if (heroName) {
				const rect = heroName.getBoundingClientRect();
				setShowLogo(rect.bottom < 0);
			} else {
				setShowLogo(true);
			}
		};

		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, [location.pathname]);

	const scrollToSection = (id) => {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: 'smooth' });
		setMenuOpen(false);
	};

	return (
		<nav className="navbar">
			<div className="navbar-inner">
				<Link to="/" className={`navbar-logo pixel-font glitch-text ${showLogo ? 'visible' : ''}`} data-text="vm.">
					vm.
				</Link>

				<button
					className="navbar-toggle"
					onClick={() => setMenuOpen(!menuOpen)}
					aria-label="Toggle menu"
				>
					{menuOpen ? '[x]' : '[=]'}
				</button>

				<b>

					<ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
						{location.pathname === '/' && (
							<>
								<li>
									<button className="nav-link" onClick={() => scrollToSection('about')}>
										About
									</button>
								</li>
								<li>
									<button className="nav-link" onClick={() => scrollToSection('projects')}>
										Projects
									</button>
								</li>
								<li>
									<button className="nav-link" onClick={() => scrollToSection('contact')}>
										Contact
									</button>
								</li>
							</>
						)}
						{NAV_ITEMS.map((item) => (
							<li key={item.path}>
								<Link
									to={item.path}
									className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
									onClick={() => setMenuOpen(false)}
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</b>
			</div>
		</nav>
	);
}
