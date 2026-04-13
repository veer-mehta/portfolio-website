import './Projects.css';

const PROJECTS = [
	{
		title: 'VimArena [WIP]',
		desc: 'A game that teaches Vim motions using tower defense mechanics.',
		tech: ['Game Dev', 'Phaser.js', 'TypeScript'],
		link: '#',
	},
	{
		title: 'Balatro RL Mod [WIP]',
		desc: 'A reinforcement learning model mod for the rougelike deckbuilder single-player card game Balatro.',
		tech: ['Python', 'Machine Learning', 'DQN'],
		link: '#',
	},
	{
		title: 'h2cred',
		desc: 'A full-stack dApp for buying, transferring, and managing hydrogen credits on the Sepolia Ethereum blockchain.',
		tech: ['Solidity', 'React', 'Node.js'],
		link: 'https://github.com/veer-mehta/h2cred',
	},
	{
		title: 'asm-game',
		desc: 'A shooting game developed entirely in 8086 MASM (Assembly).',
		tech: ['Assembly', 'MASM', '8086'],
		link: 'https://github.com/veer-mehta/asm-game',
	},
	{
		title: 'HomeLab Infrastructure',
		desc: 'A self-hosted Ubuntu server environment acting as a Jellyfin media center, a Samba NAS, a WireGuard VPN, using Nginx reverse-proxy for a development network, and a Pi-hole DNS sinkhole.',
		tech: ['Linux', 'Docker', 'Nginx', 'WireGuard', 'Pi-hole'],
		link: '/blog',
	},
];

export default function Projects() {
	return (
		<section id="projects" className="section">
			<h2 className="section-title">projects</h2>

			<div className="projects-grid">
				{PROJECTS.map((project, i) => (
					<div
						key={project.title}
						className="project-card anim-fadeInUp"
						style={{ animationDelay: `${i * 0.1}s` }}
					>
						<h3 className="project-name">{project.title}</h3>
						<p className="project-desc">{project.desc}</p>
						<div className="project-tech">
							{project.tech.map((t) => (
								<span key={t} className="tech-tag">{t}</span>
							))}
						</div>
						<a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
							<span className="text-green">&gt;</span> view_project
						</a>
					</div>
				))}
			</div>
		</section>
	);
}
