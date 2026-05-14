import './Skills.css';

const SKILL_GROUPS = [
	{
		category: 'Frontend',
		skills: ['React', 'JavaScript', 'CSS', 'Vite', 'HTML5'],
	},
	{
		category: 'Backend',
		skills: ['Node.js', 'Python', 'REST APIs', 'Databases', 'Express'],
	},
	{
		category: 'Game Dev',
		skills: ['Phaser.js', 'Game Systems', 'TypeScript', 'State Management'],
	},
	{
		category: 'Systems',
		skills: ['Linux', 'Docker', 'Assembly', 'Low-level Programming', 'CLI Tools'],
	},
	{
		category: 'Tools & Practices',
		skills: ['Git', 'Unix', 'Testing', 'DQN / RL', 'Solidity'],
	},
];

export default function Skills() {
	return (
		<section id="skills" className="section skills-section">
			<div className="section-header-row">
				<span className="section-index">02</span>
				<div>
					<h2 className="section-title"><span>Skills</span></h2>
					<p className="section-kicker">
						What I work with regularly.
					</p>
				</div>
			</div>

			<div className="skills-grid">
				{SKILL_GROUPS.map((group) => (
					<div key={group.category} className="skill-group">
						<h3 className="skill-category">{group.category}</h3>
						<div className="skill-tags">
							{group.skills.map((skill) => (
								<span key={skill} className="skill-tag">{skill}</span>
							))}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
