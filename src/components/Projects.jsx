import { Link } from 'react-router-dom';
import { FEATURED_PROJECTS } from '../data/projects';
import './Projects.css';

export default function Projects() {
	return (
		<section id="projects" className="section projects-modern-view">
			<div className="section-header-row">
				<span className="section-index">01</span>
				<div>
					<h2 className="section-title"><span>Projects</span></h2>
				</div>
			</div>

			<div className="projects-interactive-list">
				{FEATURED_PROJECTS.slice(0, 4).map((project, i) => (
					<div 
						key={project.id} 
						className="project-entry"
					>
						<div className="project-entry-main">
							<div className="entry-index">{String(i + 1).padStart(2, '0')}</div>
							
							<div className="entry-info">
								<div className="entry-header">
									<h3 className="entry-title">{project.title}</h3>
									<span className="entry-category">{project.type}</span>
								</div>
							</div>
						</div>

						<div className="project-expanded-area">
							<div className="expanded-inner">
								<div className="expanded-visual">
									{project.image ? (
										<img src={project.image} alt={project.title} className="expanded-image" />
									) : (
										<div className="image-placeholder">
											<div className="scanline" />
											<span>NO_PREVIEW_AVAILABLE</span>
										</div>
									)}
								</div>
								
								<div className="expanded-details">
									<div className="expanded-tags">
										{project.tech.map(t => <span key={t} className="tech-pill">{t}</span>)}
									</div>
									<p className="full-description">{project.fullDesc}</p>
									<div className="expanded-links">
										<a href={project.github} target="_blank" rel="noopener noreferrer" className="expanded-link github">
											Source
										</a>
										{project.demo && (
											<a href={project.demo} target="_blank" rel="noopener noreferrer" className="expanded-link demo">
												Live
											</a>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="projects-view-all">
				<Link to="/projects" className="view-all-entry">
					<div className="view-all-main">
						<div className="view-all-index">ALL</div>
						<div className="view-all-info">
							<h3 className="view-all-title">view all projects</h3>
						</div>
						<div className="view-all-arrow">
							<span className="arrow-icon">{'→'}</span>
						</div>
					</div>
				</Link>
			</div>
		</section>
	);
}
