import './Experience.css';

const EXPERIENCES = [
	{
		year: "'26",
		period: "may — present",
		role: "Software Developer Intern",
		company: "GreyCube Technologies",
		location: "Ahmedabad",
		bullets: [
			"Built a multi-tenant SaaS platform that provisions isolated Frappe/ERPNext instances via Docker.",
			"Designed the full bench lifecycle, from spin up, to teardown, without touching other tenants.",
			"Created a meeting scheduler where clients browse agent availability from open tickets and book slots for meetings with the agent.",
		],
		stack: ["Frappe", "ERPNext", "Docker", "Python"],
	},
	{
		year: "'24",
		period: "jun — dec",
		role: "Freelance Developer",
		company: "Copilot Data Solutions",
		location: "Pennsylvania, USA (Remote)",
		bullets: [
			"Automated a POS system end-to-end with Selenium, eliminating manual data entry workflows.",
			"Added a natural language layer so operators run complex workflows through plain text commands.",
		],
		stack: ["Python", "Selenium", "NLP", "Web Automation"],
	},
];

export default function Experience() {
	return (
		<section id="experience" className="section bg-dark-green">
			<div className="section-header-row">
				<span className="section-index">02</span>
				<div>
					<h2 className="section-title"><span>Experience</span></h2>
				</div>
			</div>

			<div className="exp-timeline">
				{EXPERIENCES.map((exp, idx) => (
					<div key={idx} className="exp-card">
						<div className="exp-year-block">
							<span className="exp-year">{exp.year}</span>
							<span className="exp-period">{exp.period}</span>
						</div>

						<div className="exp-content">
							<div className="exp-headline">
								<h3 className="exp-role">{exp.role}</h3>
								<span className="exp-at">at</span>
								<span className="exp-company">{exp.company}</span>
								<span className="exp-location">{exp.location}</span>
							</div>

							<ul className="exp-bullets">
								{exp.bullets.map((bullet, bIdx) => (
									<li key={bIdx} className="exp-bullet">{bullet}</li>
								))}
							</ul>

							<div className="exp-stack">
								{exp.stack.map((tech) => (
									<span key={tech} className="exp-tech">{tech}</span>
								))}
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
