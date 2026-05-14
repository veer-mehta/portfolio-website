import './Projects.css';

const PROJECTS = [
	{
		title: 'VimArena',
		type: 'Game systems',
		desc: 'A tower-defense game idea built around Vim movement keys.',
		proof: 'The goal is simple: make h, j, k, and l feel natural through play instead of drills.',
		tech: ['Game Dev', 'Phaser.js', 'TypeScript'],
		link: null,
	},
	{
		title: 'Balatro RL Mod',
		type: 'Machine learning',
		desc: 'An early experiment in teaching an agent to make choices in Balatro.',
		proof: 'I am using it to learn where reward design, state, and noisy outcomes become hard.',
		tech: ['Python', 'Machine Learning', 'DQN'],
		link: null,
	},
	{
		title: 'h2cred',
		type: 'Full-stack dApp',
		desc: 'A dApp for buying, transferring, and managing hydrogen credits on Sepolia.',
		proof: 'Built as a practical way to connect a Solidity contract, backend API, and frontend flow.',
		tech: ['Solidity', 'React', 'Node.js'],
		link: 'https://github.com/veer-mehta/h2cred',
	},
	{
		title: 'asm-game',
		type: 'Low-level game',
		desc: 'A simple shooting game written in 8086 MASM.',
		proof: 'This was mainly about learning how much work is usually hidden by modern tools.',
		tech: ['Assembly', 'MASM', '8086'],
		link: 'https://github.com/veer-mehta/asm-game',
	},
	{
		title: 'HomeLab Infrastructure',
		type: 'Linux infrastructure',
		desc: 'A personal Ubuntu server for media, storage, VPN access, reverse proxying, and DNS filtering.',
		proof: 'This is where I learn by maintaining real services instead of only reading setup guides.',
		tech: ['Linux', 'Docker', 'Nginx', 'WireGuard', 'Pi-hole'],
		link: '/blog',
	},
];

export default function Projects() {
	return (
		<section id="projects" className="section">
			<div className="section-header-row">
				<span className="section-index">01</span>
				<div>
					<h2 className="section-title"><span>Selected Work</span></h2>
					<p className="section-kicker">
						Projects that moved from idea to working code.
					</p>
				</div>
			</div>

			<div className="projects-grid">
				{PROJECTS.map((project, i) => (
					<div
						key={project.title}
						className="project-card anim-fadeInUp"
						style={{ animationDelay: `${i * 0.1}s` }}
					>
						<span className="project-number">{String(i + 1).padStart(2, '0')}</span>
						<div className="project-heading">
							<span className="project-type">{project.type}</span>
							<h3 className="project-name">{project.title}</h3>
						</div>
						<div className="project-copy">
							<p className="project-desc">{project.desc}</p>
							<p className="project-proof">{project.proof}</p>
						</div>
						<div className="project-meta">
							<div className="project-tech">
								{project.tech.map((t) => (
									<span key={t} className="tech-tag">{t}</span>
								))}
							</div>
							{project.link ? (
								<a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
									View
								</a>
							) : (
								<span className="project-link project-link-muted">
									Soon
								</span>
							)}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
