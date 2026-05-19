import { useState } from 'react';
import { ALL_PROJECTS } from '../data/projects';
import './AllProjects.css';

export default function AllProjects() {
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [hoveredIndex, setHoveredIndex] = useState(null);

	const categories = ['All', ...new Set(ALL_PROJECTS.map(p => p.type))];
	
	const filteredProjects = selectedCategory === 'All' 
		? ALL_PROJECTS 
		: ALL_PROJECTS.filter(p => p.type === selectedCategory);

	return (
		<div className="all-projects-page">
			<div className="section">
				<h1 className="section-title"><span>All Projects</span></h1>
				<nav className="filter-bar">
					{categories.map((category) => (
						<button
							key={category}
							className={`filter-link ${selectedCategory === category ? 'active' : ''}`}
							onClick={() => setSelectedCategory(category)}
						>
							{category}
						</button>
					))}
				</nav>

				<div className="projects-archive-list">
					{filteredProjects.map((project, i) => (
						<div 
							key={project.id} 
							className={`archive-row-wrapper ${hoveredIndex === i ? 'is-hovered' : ''}`}
							onMouseEnter={() => setHoveredIndex(i)}
							onMouseLeave={() => setHoveredIndex(null)}
						>
							<div className="archive-row">
								<div className="row-index">
									{String(i + 1).padStart(2, '0')}
								</div>
								
								<div className="row-main">
									<div className="row-header">
										<h3 className="row-title">{project.title}</h3>
										<span className="row-type">{project.type}</span>
									</div>
									<p className="row-desc">{project.shortDesc}</p>
									<div className="row-tags">
										{project.tech.map((tech) => (
											<span key={tech} className="archive-tag">{tech}</span>
										))}
									</div>
									<div className="row-actions">
										<a href={project.github} target="_blank" rel="noopener noreferrer" className="archive-link">
											Source <span className="arrow">↗</span>
										</a>
										{project.demo && (
											<a href={project.demo} target="_blank" rel="noopener noreferrer" className="archive-link secondary">
												Demo <span className="arrow">↗</span>
											</a>
										)}
									</div>
								</div>

								<div className="row-visual">
									{project.image ? (
										<div className="row-img-box">
											<img src={project.image} alt={project.title} />
										</div>
									) : (
										<div className="row-img-placeholder" />
									)}
								</div>
							</div>

							{project.image && (
								<div className="archive-floating-preview">
									<img src={project.image} alt="" />
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

