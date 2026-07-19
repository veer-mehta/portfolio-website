import { 
	SiPython, SiJavascript, SiTypescript, SiCplusplus, SiLua, SiReact, 
	SiSolidity, SiLinux, SiGit, SiSelenium,
	SiDocker, SiFirebase, SiDjango, SiFlask, SiMongodb, SiApachespark,
	SiUnity, SiGodotengine, SiEthereum, SiGithub, SiPostman
} from 'react-icons/si';
import { FaTerminal, FaCode, FaGlobe, FaMeteor, FaDatabase, FaGamepad } from 'react-icons/fa';
import './Skills.css';

const SiFrappe = (props) => (
	<svg 
		viewBox="0 0 10 15" 
		fill="currentColor" 
		style={{ height: '1em', width: 'auto', display: 'inline-block' }}
		{...props}
	>
		<path d="M0 0V2.46377H3.02086H8.83664H9.46424V0H0Z" />
		<path d="M0 6.28906V14.0116H3.02086V8.75697H8.83663V6.28906H3.02086H0Z" />
	</svg>
);

const SKILL_GROUPS = [
	{
		category: 'Languages',
		icon: <FaCode />,
		skills: [
			{ name: 'Python', icon: <SiPython /> },
			{ name: 'JavaScript', icon: <SiJavascript /> },
			{ name: 'TypeScript', icon: <SiTypescript /> },
			{ name: 'C++', icon: <SiCplusplus /> },
			{ name: 'Lua', icon: <SiLua /> },
			{ name: 'Solidity', icon: <SiSolidity /> },
		],
	},
	{
		category: 'dev frameworks',
		icon: <FaGlobe />,
		isRightAligned: true,
		skills: [
			{ name: 'React', icon: <SiReact /> },
			{ name: 'Django', icon: <SiDjango /> },
			{ name: 'Flask', icon: <SiFlask /> },
			{ name: 'Frappe', icon: <SiFrappe /> },
			{ name: 'MongoDB', icon: <SiMongodb /> },
			{ name: 'Firebase', icon: <SiFirebase /> },
			{ name: 'SQL', icon: <FaDatabase /> },
		],
	},
	{
		category: 'Game Engines',
		icon: <FaGamepad />,
		isCompact: true,
		skills: [
			{ name: 'Phaser.js', icon: <FaMeteor /> },
			{ name: 'Unity', icon: <SiUnity /> },
			{ name: 'Godot', icon: <SiGodotengine /> },
		],
	},
	{
		category: 'Misc',
		icon: <FaTerminal />,
		isExpanded: true,
		isRightAligned: true,
		skills: [
			{ name: 'Linux', icon: <SiLinux /> },
			{ name: 'Git', icon: <SiGit /> },
			{ name: 'GitHub', icon: <SiGithub /> },
			{ name: 'Postman', icon: <SiPostman /> },
			{ name: 'Docker', icon: <SiDocker /> },
			{ name: 'Ethers.js', icon: <SiEthereum /> },
			{ name: 'PySpark', icon: <SiApachespark /> },
			{ name: 'Selenium', icon: <SiSelenium /> },
		],
	},
];

export default function Skills() {
	return (
		<section id="skills" className="section skills-section">
			<div className="section-header-row">
				<span className="section-index">02</span>
				<div>
					<h2 className="section-title"><span>Skills</span></h2>
				</div>
			</div>

			<div className="skills-grid-modern">
				{SKILL_GROUPS.map((group, idx) => (
					<div 
						key={idx} 
						className={`skill-category-group ${group.isExpanded ? 'is-expanded' : ''} ${group.isCompact ? 'is-compact' : ''} ${group.isRightAligned ? 'is-right' : ''}`}
					>
						<div className="category-header">
							<span className="category-index">{String(idx + 1).padStart(2, '0')}</span>
							<h3 className="category-name">{group.category}</h3>
						</div>
						
						<div className="skills-sub-grid">
							{group.skills.map((skill) => (
								<div 
									key={skill.name} 
									className="skill-card"
								>
									<div className="skill-card-inner">
										<span className="skill-icon">{skill.icon}</span>
										<span className="skill-name">{skill.name}</span>
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
