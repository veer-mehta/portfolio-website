import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { BLOG_POSTS } from './blogData';
import './BlogPost.css';

export default function BlogPost() {
  const { id } = useParams();
  const post = BLOG_POSTS.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <main className="blog-post-page section">
        <h1 className="text-accent">404 - Post Not Found</h1>
        <br/>
        <Link to="/blog" className="text-green">&lt; return to blog</Link>
      </main>
    );
  }

  return (
    <main className="blog-post-page section">
      <div className="blog-post-header anim-pixelIn">
        <Link to="/blog" className="back-link text-grey">
          Back to writing
        </Link>
        <div className="post-meta">
          <span className="text-green">date:</span> {post.date}
        </div>
        <h1 className="post-title text-cyan">{post.title}</h1>
        <div className="post-tags">
          {post.tags.map(tag => (
            <span key={tag} className="post-tag">#{tag}</span>
          ))}
        </div>
      </div>
      
      <div className="post-content anim-fadeInUp">
        <ReactMarkdown>{post.content || post.snippet}</ReactMarkdown>
      </div>
    </main>
  );
}
