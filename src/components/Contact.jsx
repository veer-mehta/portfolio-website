import './Contact.css';

import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt } from 'react-icons/fa';

const LINKS = [
	{ label: 'github', href: 'https://github.com/veer-mehta', icon: <FaGithub /> },
	{ label: 'linkedin', href: 'https://linkedin.com/in/viirmehta', icon: <FaLinkedin /> },
	{ label: 'email', href: 'mailto:veeramehta09@gmail.com', icon: <FaEnvelope /> },
	{ label: 'resume', href: '/VeerMehtaResume.pdf', icon: <FaFileAlt />, download: 'VeerMehtaResume.pdf' },
];

export default function Contact() {
	return (
		<section id="contact" className="section">
			<div className="section-header-row">
				<span className="section-index">04</span>
				<div>
					<h2 className="section-title"><span>Contact</span></h2>
					<p className="section-kicker">
						Internships, collaborations, or useful technical conversations.
					</p>
				</div>
			</div>

			<div className="contact-content">
				<p className="contact-text" style={{ marginTop: '8px' }}>
					<span className="text-grey">If the work here lines up with what you are building, reach out. I am open to focused work, small teams, and projects with real constraints.</span>
				</p>

				<div className="contact-links">
					{LINKS.map((link) => (
						<a
							key={link.label}
							href={link.href}
							download={link.download}
							target="_blank"
							rel="noopener noreferrer"
							className="contact-link"
						>
							<span className="contact-icon">{link.icon}</span>
							<span>{link.label}</span>
						</a>
					))}
				</div>
			</div>
		</section>
	);
}
