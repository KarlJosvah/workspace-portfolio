import { useTranslation } from "react-i18next";

const REPOS = [
	{
		id: "r3f",
		name: "pmndrs/react-three-fiber",
		desc: "React renderer for Three.js — declarative 3D scene graph.",
		stars: "28.4k",
		url: "https://github.com/pmndrs/react-three-fiber",
	},
	{
		id: "drei",
		name: "pmndrs/drei",
		desc: "Essential abstractions, camera controls, and loaders for React Three Fiber.",
		stars: "8.9k",
		url: "https://github.com/pmndrs/drei",
	},
	{
		id: "motion",
		name: "framer/motion",
		desc: "Production-ready declarative motion library for React.",
		stars: "25.1k",
		url: "https://github.com/framer/motion",
	},
	{
		id: "zustand",
		name: "pmndrs/zustand",
		desc: "Bear necessities state management library for modern React apps.",
		stars: "51.2k",
		url: "https://github.com/pmndrs/zustand",
	},
];

export function RecommendedProjectsSection() {
	const { t } = useTranslation();

	return (
		<div className="text-overlay-content">
			<h1 className="text-overlay-title">
				{t("sections.recommendedProjects.title")}.
			</h1>
			<p className="text-overlay-subtitle">
				{t("sections.recommendedProjects.subtitle")}
			</p>

			<div className="text-overlay-list">
				{REPOS.map((repo) => (
					<div key={repo.id} className="text-group-item">
						<div className="text-item-header">
							<a
								href={repo.url}
								target="_blank"
								rel="noopener noreferrer"
								className="text-group-heading-link"
							>
								{repo.name} ↗
							</a>
							<span className="text-meta-text">
								⭐ {repo.stars}
							</span>
						</div>
						<p className="text-group-body">{repo.desc}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default RecommendedProjectsSection;
