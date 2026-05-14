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
				</div>
			</div>

			<div className="contact-content">
				<p className="contact-text">
					<span className="text-grey">If the work here lines up with what you are building, reach out. I am open to focused work and small teams.</span>
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
