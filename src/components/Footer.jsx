import './Footer.css';

export default function Footer() {
	return (
		<footer className="footer">
			<div className="footer-inner">
				<div className="footer-left">
					<span className="footer-logo">vm.</span>
					<span className="footer-tagline">self-hosted on my home server</span>
				</div>
				<div className="footer-right">
					<span className="footer-copyright">© {new Date().getFullYear()} Veer Mehta</span>
				</div>
			</div>
		</footer>
	);
}
