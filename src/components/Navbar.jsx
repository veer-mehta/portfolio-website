import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

const MENU_ITEMS = [
	{ id: "home", label: "home", sectionId: "hero-section" },
	{ id: "projects", label: "projects", sectionId: "projects" },
	{ id: "skills", label: "skills", sectionId: "skills" },
	{ id: "about", label: "about", sectionId: "about" },
];

export default function Navbar({ onGameClick }) {
	const location = useLocation();
	const navigate = useNavigate();
	const [activeSection, setActiveSection] = useState("home");
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	// Close menu on route change and scroll to hash
	useEffect(() => {
		setMenuOpen(false);
		if (location.pathname === "/" && location.hash) {
			const id = location.hash.replace("#", "");
			const el = document.getElementById(id);
			if (el) {
				const timer = setTimeout(() => {
					el.scrollIntoView({ behavior: "smooth" });
				}, 150);
				return () => clearTimeout(timer);
			}
		}
	}, [location.pathname, location.hash]);

	// Track active section, logo visibility, and scroll state
	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 40);

			if (location.pathname === "/") {
				if (window.scrollY < 150) {
					setActiveSection("home");
					return;
				}

				const sections = ["projects", "skills", "about"];
				let currentSection = "home";

				for (const sectionId of sections) {
					const el = document.getElementById(sectionId);
					if (el) {
						const rect = el.getBoundingClientRect();
						if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
							currentSection = sectionId;
							break;
						}
					}
				}
				setActiveSection(currentSection);
			} else {
				if (location.pathname === "/projects") {
					setActiveSection("projects");
				} else {
					setActiveSection("");
				}
			}
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [location.pathname]);

	const handleNavClick = (item, e) => {
		e.preventDefault();
		setMenuOpen(false);
		if (location.pathname === "/") {
			if (item.id === "home") {
				window.scrollTo({ top: 0, behavior: "smooth" });
				navigate("/", { replace: true });
			} else {
				const el = document.getElementById(item.sectionId);
				if (el) {
					el.scrollIntoView({ behavior: "smooth" });
					window.history.pushState(null, "", `/#${item.sectionId}`);
					setActiveSection(item.id);
				}
			}
		} else {
			if (item.id === "home") {
				navigate("/");
			} else {
				navigate(`/#${item.sectionId}`);
			}
		}
	};

	const handleLogoClick = (e) => {
		e.preventDefault();
		setMenuOpen(false);
		if (location.pathname === "/") {
			window.scrollTo({ top: 0, behavior: "smooth" });
			navigate("/", { replace: true });
		} else {
			navigate("/");
		}
	};

	return (
		<nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
			<div className="navbar-inner">
				<Link
					to="/"
					className={`navbar-logo ${scrolled ? "visible" : ""}`}
					onClick={handleLogoClick}
				>
					vm.
				</Link>

				<button
					className={`navbar-toggle ${menuOpen ? "open" : ""}`}
					onClick={() => setMenuOpen(!menuOpen)}
					aria-label="Toggle menu"
					aria-expanded={menuOpen}
				>
					<span className="toggle-bar" />
					<span className="toggle-bar" />
				</button>

				<ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
					{MENU_ITEMS.map((item) => (
						<li key={item.id}>
							<a
								href={item.id === "home" ? "/" : `/#${item.sectionId}`}
								className={`nav-link ${activeSection === item.id ? "active" : ""}`}
								onClick={(e) => handleNavClick(item, e)}
							>
								{item.label}
							</a>
						</li>
					))}
					<li className="navbar-game-li">
						<button className="navbar-game-btn" onClick={onGameClick}>
							play [vim-arena]
						</button>
					</li>
				</ul>
			</div>
		</nav>
	);
}
