import { Link } from 'react-router-dom';
import { BLOG_POSTS } from './blogData';
import './Blog.css';

export default function Blog() {
	return (
		<main className="blog-page">
			<div className="section">
				<h1 className="section-title"><span>Writing</span></h1>
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
									Read more
								</Link>
							</div>
						</article>
					))}
				</div>

				<div className="blog-back">
					<Link to="/" className="blog-back-link">
						Back home
					</Link>
				</div>
			</div>
		</main>
	);
}
