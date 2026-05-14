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
			<div className="section-header-row">
				<span className="section-index">03</span>
				<div>
					<h2 className="section-title"><span>About</span></h2>
					<p className="section-kicker">
						A short version of what I care about in software.
					</p>
				</div>
			</div>

			<div className="about-card">
				<div className="about-copy">
					<p>
						Hey, I&apos;m <span className="name-highlight">Veer Mehta</span>, a BTech CSE student from Gandhinagar, Gujarat.
						I enjoy making small things that actually run, then sitting with the rough edges until I understand them better.
					</p>
					<p>
						Lately that has meant game ideas, self-hosted services, backend code, and a few low-level experiments.
						I am still early, so I focus on steady practice, clear notes, and projects that teach me something specific.
					</p>
				</div>
				<div className="about-focus-grid">
					<div>
						<span className="focus-label">What I make</span>
						<p>Small games, web apps, scripts, and server setups with a clear job.</p>
					</div>
					<div>
						<span className="focus-label">What I am learning</span>
						<p>Game loops, Linux administration, backend structure, and the basics of reinforcement learning.</p>
					</div>
					<div>
						<span className="focus-label">What I am looking for</span>
						<p>Internships or collaborations where I can contribute useful work and learn from careful engineers.</p>
					</div>
				</div>
				<div className="about-skills">
					<h3 className="skills-title">Tools I use</h3>
					<div className="skill-icons">
						{SKILLS.map((skill) => (
							<span key={skill.name} className="skill-icon-large" title={skill.name}>
								{skill.icon}
							</span>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
