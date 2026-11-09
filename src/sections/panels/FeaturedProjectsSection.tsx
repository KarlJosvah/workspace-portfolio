import { useTranslation } from "react-i18next";

const PROJECTS = [
	{
		id: "workspace-3d",
		title: "Workspace 3D Portfolio",
		desc: "Immersive first-person 3D portfolio powered by React 19 and Three.js with full scene exploration and spatial audio.",
		stack: "React 19 · Three.js · R3F · TypeScript",
		sourceUrl: "https://github.com/KarlJosvah/workspace-portfolio",
	},
	{
		id: "collab",
		title: "Real-Time Collaboration Canvas",
		desc: "WebSocket whiteboard with multi-user cursors, live sync, and encrypted persistent state.",
		stack: "Next.js · Socket.io · PostgreSQL",
		demoUrl: "#",
	},
	{
		id: "ai-review",
		title: "AI Code Review Assistant",
		desc: "Automated PR reviews and security pattern detection powered by Gemini API.",
		stack: "Python · Gemini API · FastAPI",
		sourceUrl: "#",
	},
];

export function FeaturedProjectsSection() {
	const { t } = useTranslation();

	return (
		<div className="text-overlay-content">
			<h1 className="text-overlay-title">
				{t("sections.featuredProjects.title")}.
			</h1>
			<p className="text-overlay-subtitle">
				{t("sections.featuredProjects.subtitle")}
			</p>

			<div className="text-overlay-list">
				{PROJECTS.map((project) => (
					<div key={project.id} className="text-group-item">
						<div className="text-item-header">
							<h3 className="text-group-heading">
								{project.title}
							</h3>
							<div className="text-item-links">
								{project.demoUrl && (
									<a
										href={project.demoUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="text-link-sm"
									>
										{t(
											"sections.featuredProjects.viewDemo"
										)}{" "}
										↗
									</a>
								)}
								{project.sourceUrl && (
									<a
										href={project.sourceUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="text-link-sm"
									>
										{t(
											"sections.featuredProjects.sourceCode"
										)}{" "}
										↗
									</a>
								)}
							</div>
						</div>
						<p className="text-group-body">{project.desc}</p>
						<p className="text-meta-text">{project.stack}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default FeaturedProjectsSection;
