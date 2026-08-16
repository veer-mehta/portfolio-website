import { useState } from 'react';
import './Footer.css';

export default function Footer() {
	const [emailCopied, setEmailCopied] = useState(false);

	const handleCopyEmail = (e) => {
		e.preventDefault();
		navigator.clipboard.writeText('hello@veermehta.dev');
		setEmailCopied(true);
		setTimeout(() => setEmailCopied(false), 2000);
	};

	return (
		<footer className="footer bg-dark-green">
			<div className="footer-inner">
				<div className="footer-left">
					<span className="text-green">vm.</span>
					<span className="text-grey"> © 2026</span>
					<span className="footer-hosted">hosted on my home server :)</span>
				</div>
				<div className="footer-links">
					<a href="https://github.com/veer-mehta" target="_blank" rel="noopener noreferrer" className="footer-link">github</a>
					<a href="https://linkedin.com/in/viirmehta" target="_blank" rel="noopener noreferrer" className="footer-link">linkedin</a>
					<a href="#email" onClick={handleCopyEmail} className="footer-link">
						{emailCopied ? 'copied!' : 'email'}
					</a>
					<a href="/VeerMehtaResume.pdf" download className="footer-link">resume</a>
				</div>
			</div>
		</footer>
	);
}
