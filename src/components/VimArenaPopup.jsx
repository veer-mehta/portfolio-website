import React from 'react';
import './VimArenaPopup.css';

export default function VimArenaPopup({ isOpen, onClose }) {
	const handlePlay = () => {
		window.open('https://vim-arena.veermehta.dev', '_blank', 'noopener,noreferrer');
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="retro-popup-wrapper">
			<div className="retro-popup">
				<div className="retro-popup-header">
					<a href="https://vim-arena.veermehta.dev" target="_blank" rel="noopener noreferrer" className="retro-popup-title">vim-arena.exe</a>
					<button className="retro-popup-close" onClick={onClose} aria-label="Minimize">
						-
					</button>
				</div>
				<div className="retro-popup-body">
					<div className="retro-popup-dot">●</div>
					<div className="retro-popup-content">
						<p className="retro-popup-text subtitle">play my new game! Vim Arena!!</p>
						<p className="retro-popup-text">a tower defense game to learn the vim editor</p>
					</div>
				</div>
				<div className="retro-popup-actions">
					<button className="retro-btn" onClick={handlePlay}>
						play
					</button>
				</div>
			</div>
		</div>
	);
}
