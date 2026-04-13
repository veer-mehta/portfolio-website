import { SiReact, SiNodedotjs, SiPython, SiJavascript, SiTypescript, SiMongodb, SiGit, SiLinux, SiCplusplus, SiSolidity } from 'react-icons/si';
import './About.css';

const SKILLS = [
	{ name: 'React', icon: <SiReact /> },
	{ name: 'Node.js', icon: <SiNodedotjs /> },
	{ name: 'Python', icon: <SiPython /> },
	{ name: 'JavaScript', icon: <SiJavascript /> },
	{ name: 'TypeScript', icon: <SiTypescript /> },
	{ name: 'MongoDB', icon: <SiMongodb /> },
	{ name: 'Git', icon: <SiGit /> },
	{ name: 'Linux', icon: <SiLinux /> },
	{ name: 'C++', icon: <SiCplusplus /> },
	{ name: 'Solidity', icon: <SiSolidity /> },
];

export default function About() {
	return (
		<section id="about" className="section">
			<h2 className="section-title">about_me</h2>

			<div className="about-card">
				<p>
					Hey! I'm <span className="text-cyan">Veer</span>, a BTech CSE student from Gandhinagar, India.
					I enjoy writing code and figuring out how computer systems work under the hood.
				</p>
				<br />
				<p>
					I like to explore a bit of everything. Lately, I've been spending my time setting up my own home server, experimenting with game development and machine learning. I'm always looking for something new and interesting to learn.
				</p>
				<br />
				<div className="about-skills">
					<p className="text-amber" style={{ fontSize: '0.85rem', marginBottom: '12px', letterSpacing: '1px' }}>
              // tech_stack
					</p>
					<div className="skill-tags">
						{SKILLS.map((skill) => (
							<span key={skill.name} className="skill-tag">
								<span className="skill-icon">{skill.icon}</span>
								{skill.name}
							</span>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
