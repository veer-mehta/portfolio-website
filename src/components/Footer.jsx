import './Footer.css';

export default function Footer() {
	return (
		<footer className="footer">
			<div className="footer-inner">
				<div className="footer-left">
					<span className="text-green">vm.</span>
					<span className="text-grey"> © 2026</span>
					<span className="footer-hosted">hosted on my home server :)</span>
				</div>
				<div className="footer-links">
					<a href="https://github.com/veer-mehta" target="_blank" rel="noopener noreferrer" className="footer-link">github</a>
					<a href="https://linkedin.com/in/viirmehta" target="_blank" rel="noopener noreferrer" className="footer-link">linkedin</a>
					<a href="mailto:veeramehta09@gmail.com" className="footer-link">email</a>
					<a href="/VeerMehtaResume.pdf" download className="footer-link">resume</a>
				</div>
			</div>
		</footer>
	);
}
