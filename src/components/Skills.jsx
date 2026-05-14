import { useState, useEffect } from 'react';
import { 
	SiPython, SiJavascript, SiTypescript, SiCplusplus, SiLua, SiReact, 
	SiSolidity, SiLinux, SiGit, SiSelenium,
	SiDocker, SiFirebase, SiDjango, SiFlask, SiMongodb, SiApachespark,
	SiUnity, SiGodotengine, SiPostgresql, SiMysql, SiEthereum, SiGithub, SiPostman
} from 'react-icons/si';
import { FaTerminal, FaCode, FaGlobe, FaLayerGroup, FaMicrochip, FaJava, FaMeteor, FaDatabase, FaGamepad } from 'react-icons/fa';
import './Skills.css';

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
	const [hoveredSkill, setHoveredSkill] = useState(null);
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (e) => {
			setMousePos({ x: e.clientX, y: e.clientY });
		};
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, []);

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
							<h3 className="category-name">{group.category}</h3>
						</div>
						
						<div className="skills-sub-grid">
							{group.skills.map((skill) => (
								<div 
									key={skill.name} 
									className="skill-card"
									onMouseEnter={() => setHoveredSkill(skill.name)}
									onMouseLeave={() => setHoveredSkill(null)}
								>
									<div className="skill-card-inner">
										<span className="skill-icon">{skill.icon}</span>
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>

			{/* Cursor Follower Label */}
			{hoveredSkill && (
				<div 
					className="skill-cursor-label"
					style={{ 
						left: `${mousePos.x + 20}px`, 
						top: `${mousePos.y + 20}px` 
					}}
				>
					{hoveredSkill}
				</div>
			)}
		</section>
	);
}
