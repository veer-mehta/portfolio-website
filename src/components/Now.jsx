import './Now.css';

const NOW_ITEMS = [
	{
		title: 'VimArena',
		body: 'A small game about Vim motions. I want it to teach movement by feel, not by memorizing a sheet of keys.',
	},
	{
		title: 'Balatro RL',
		body: 'A learning experiment around card-game decisions, rewards, and why simple strategies stop working quickly.',
	},
	{
		title: 'HomeLab',
		body: 'A personal server where I learn Linux the slow way: updates, logs, backups, DNS, and the occasional broken service.',
	},
];

export default function Now() {
	return (
		<section id="now" className="section now-section">
			<div className="section-header-row">
				<span className="section-index">02</span>
				<div>
					<h2 className="section-title"><span>Current Work</span></h2>
					<p className="section-kicker">
						Things getting active attention right now.
					</p>
				</div>
			</div>

			<div className="current-list">
				{NOW_ITEMS.map((item, index) => (
					<article className="current-item" key={item.title}>
						<span className="current-number">{String(index + 1).padStart(2, '0')}</span>
						<h3>{item.title}</h3>
						<p>{item.body}</p>
					</article>
				))}
			</div>
		</section>
	);
}
