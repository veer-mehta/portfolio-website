import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FEATURED_PROJECTS } from '../data/projects';
import Balatro from './Balatro';
import VimArenaBackground from './VimArenaBackground';
import './Projects.css';

export default function Projects() {
    const balatroEntryRef = useRef(null);
    const vimArenaEntryRef = useRef(null);
    const [isBalatroVisible, setIsBalatroVisible] = useState(false);
    const [isVimArenaVisible, setIsVimArenaVisible] = useState(false);

    useEffect(() => {
        const balatroTarget = balatroEntryRef.current;
        const vimArenaTarget = vimArenaEntryRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    const inView = entry.isIntersecting && entry.intersectionRatio >= 0.35;
                    if (entry.target === balatroTarget) {
                        setIsBalatroVisible(inView);
                    } else if (entry.target === vimArenaTarget) {
                        setIsVimArenaVisible(inView);
                    }
                }
            },
            {
                threshold: [0, 0.1, 0.2, 0.35, 0.5, 0.7, 1.0],
            }
        );

        if (balatroTarget) observer.observe(balatroTarget);
        if (vimArenaTarget) observer.observe(vimArenaTarget);

        return () => observer.disconnect();
    }, []);

    return (
        <section id="projects" className="section projects-modern-view">
            {/* Fixed background for Balatro Mod project */}
            <div className={`project-balatro-fixed-bg ${isBalatroVisible ? 'is-visible' : ''}`}>
                <Balatro
                    isRotate={false}
                    mouseInteraction={true}
                    pixelFilter={745.0}
                    color1="#166534"
                    color2="#1e293b"
                    color3="#000000"
                    contrast={3.5}
                    lighting={0.4}
                />
            </div>

            {/* Fixed background for Vim Arena project */}
            <div className={`project-vimarena-fixed-bg ${isVimArenaVisible ? 'is-visible' : ''}`}>
                <VimArenaBackground />
            </div>

            <div className="section-header-row">
                <span className="section-index">01</span>
                <div>
                    <h2 className="section-title"><span>Projects</span></h2>
                </div>
            </div>

            <div className="projects-interactive-list">
                {FEATURED_PROJECTS.slice(0, 4).map((project, i) => {
                    const isBalatro = project.title.toLowerCase().includes('joqer') || project.title.toLowerCase().includes('balatro');
                    const isVimArena = project.title.toLowerCase().includes('vim') || project.title.toLowerCase().includes('arena');

                    let entryRef = null;
                    if (isBalatro) entryRef = balatroEntryRef;
                    else if (isVimArena) entryRef = vimArenaEntryRef;

                    return (
                        <div 
                            key={project.id} 
                            ref={entryRef}
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
                    );
                })}
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