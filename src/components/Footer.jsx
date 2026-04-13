import './Footer.css';

export default function Footer() {
	return (
		<footer className="footer">
			<div className="footer-inner">
				<p className="footer-text">
					<span className="text-green">vm.</span>
					<span className="text-grey"> © 2026</span>
				</p>
				<p className="footer-sub text-grey">
					built with react + pixels + game of life
				</p>
			</div>
		</footer>
	);
}
