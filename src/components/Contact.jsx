import './Contact.css';

import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload, FaFile, FaFileAlt } from 'react-icons/fa';

const LINKS = [
	{ label: 'github', href: 'https://github.com/veer-mehta', icon: <FaGithub /> },
	{ label: 'linkedin', href: 'https://linkedin.com/in/viirmehta', icon: <FaLinkedin /> },
	{ label: 'email', href: 'mailto:veeramehta09@gmail.com', icon: <FaEnvelope /> },
	{ label: 'resume', href: '/Veer_Mehta_Resume.pdf', icon: <FaFileAlt />, download: 'Veer_Mehta_Resume.pdf' },
];

export default function Contact() {
	return (
		<section id="contact" className="section">
			<h2 className="section-title">contact</h2>

			<div className="contact-content">
				<p className="contact-text" style={{ marginTop: '8px' }}>
					<span className="text-grey">/* Want to collaborate, or just say hi?<br />
						&nbsp;&nbsp;&nbsp;feel free to reach out */</span>
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
