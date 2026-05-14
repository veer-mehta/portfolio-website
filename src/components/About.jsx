import './About.css';

const BLOCKS = [
	{
		index: "01",
		heading: "who i am",
		body: "I'm Veer, a CS student from Gandhinagar. I started building software because I wanted to see how things work under the surface. Most of my projects start with a small question and usually end up being a bit more complex than I first thought.",
	},
	{
		index: "02",
		heading: "what i'm into",
		body: "I like to explore different things. Recently, I've been setting up a home server and trying out some game development and machine learning. I'm always looking for new things to learn.",
	},
	{
		index: "03",
		heading: "how i work",
		body: "I've spent time working with everything from servers to UI. I try to keep my code simple and easy to maintain. I like building tools that solve real problems without making things over-complicated.",
	},
	{
		index: "04",
		heading: "what i can do",
		body: "I can take a project from an idea to a working app. I handle the backend, servers, and the frontend. I try to keep my work practical and focused on whatever I'm trying to solve.",
	},
];

export default function About()
{
	return (
		<section id="about" className="section">
			<div className="section-header-row">
				<span className="section-index">03</span>
				<div>
					<h2 className="section-title"><span>About</span></h2>
				</div>
			</div>

			<div className="about-grid">
				{BLOCKS.map(({ index, heading, body }) => (
					<div key={index} className="about-block">
						<span className="about-block-index">{index}</span>
						<div className="about-block-content">
							<strong className="about-block-heading">{heading}</strong>
							<p className="about-block-body">{body}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}