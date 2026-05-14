import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
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

	const scrollToTop = (e) => {
		if (location.pathname === '/') {
			if (e) e.preventDefault();
			window.scrollTo({ top: 0, behavior: 'smooth' });
			setMenuOpen(false);
		}
	};

	const scrollToSection = (id) => {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: 'smooth' });
		setMenuOpen(false);
	};

	return (
		<nav className="navbar">
			<div className="navbar-inner">
				<div className="navbar-left">
					<Link
						to="/"
						className={`navbar-logo ${showLogo ? 'visible' : ''}`}
						data-text="vm."
						onClick={scrollToTop}
					>
						vm.
					</Link>
				</div>

				<ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
					{location.pathname === '/' && (
						<>
							<li>
								<button
									className="nav-link"
									onClick={scrollToTop}
								>
									home
								</button>
							</li>
							<li>
								<button className="nav-link" onClick={() => scrollToSection('about')}>
									about
								</button>
							</li>
							<li>
								<button className="nav-link" onClick={() => scrollToSection('now')}>
									now
								</button>
							</li>
							<li>
								<button className="nav-link" onClick={() => scrollToSection('projects')}>
									projects
								</button>
							</li>
							<li>
								<button className="nav-link" onClick={() => scrollToSection('contact')}>
									contact
								</button>
							</li>
						</>
					)}
					{location.pathname !== '/' && (
						<li>
							<Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
								home
							</Link>
						</li>
					)}
					{NAV_ITEMS.map((item) => {
						if (item.path === '/') return null;
						return (
							<li key={item.path}>
								<Link
									to={item.path}
									className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
									onClick={() => setMenuOpen(false)}
								>
									{item.label.toLowerCase()}
								</Link>
							</li>
						);
					})}
				</ul>

				<div className="navbar-right">
					<button
						className="navbar-toggle"
						onClick={() => setMenuOpen(!menuOpen)}
						aria-label="Toggle menu"
					>
						{menuOpen ? <FaTimes /> : <FaBars />}
					</button>
				</div>
			</div>
		</nav>
	);
}
