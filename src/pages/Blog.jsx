import { Link } from 'react-router-dom';
import './Blog.css';

export const BLOG_POSTS = [
	{
		id: 0,
		date: '2026-04-13',
		title: 'Building my HomeLab Server Architecture',
		snippet: 'A complete walkthrough on how I set up my personal home server using Proxmox, Docker, and Nginx to self-host all my applications...',
		tags: ['HomeLab', 'Linux', 'Docker'],
	},
	{
		id: 1,
		date: '2026-04-10',
		title: 'Getting Started with Smart Contracts',
		snippet: 'A beginner-friendly guide to writing your first Solidity smart contract on Ethereum...',
		tags: ['Blockchain', 'Solidity'],
	}
];

export default function Blog() {
	return (
		<main className="blog-page">
			<div className="section">
				<h1 className="section-title">blog_posts</h1>
				<div className="blog-list">
					{BLOG_POSTS.map((post, i) => (
						<article
							key={post.id}
							className="blog-entry anim-fadeInUp"
							style={{ animationDelay: `${i * 0.08}s` }}
						>
							<div className="blog-entry-content">
								<div className="blog-entry-meta">
									<span className="blog-date text-grey">{post.date}</span>
									<div className="blog-tags">
										{post.tags.map((tag) => (
											<span key={tag} className="blog-tag">{tag}</span>
										))}
									</div>
								</div>
								<h2 className="blog-title">{post.title}</h2>
								<p className="blog-snippet">{post.snippet}</p>
								<Link to={`/blog/${post.id}`} className="blog-read-more text-green">
									&gt; read_more
								</Link>
							</div>
						</article>
					))}
				</div>

				<div className="blog-back">
					<Link to="/" className="blog-back-link">
						<span className="text-amber">&lt;</span> cd ..
					</Link>
				</div>
			</div>
		</main>
	);
}
