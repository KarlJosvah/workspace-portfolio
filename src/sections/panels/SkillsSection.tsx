import { useTranslation } from "react-i18next";

const SKILL_GROUPS = [
	{
		key: "frontend",
		i18nKey: "sections.skills.categories.frontend",
		skills: "React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, Next.js",
	},
	{
		key: "threeD",
		i18nKey: "sections.skills.categories.threeD",
		skills: "Three.js, React Three Fiber, Drei, WebGL, GLSL Shaders, Blender",
	},
	{
		key: "backend",
		i18nKey: "sections.skills.categories.backend",
		skills: "Node.js, Python, PostgreSQL, Firebase, REST, GraphQL",
	},
	{
		key: "devops",
		i18nKey: "sections.skills.categories.devops",
		skills: "Docker, GitHub Actions, CI/CD, Vercel, Netlify",
	},
];

export function SkillsSection() {
	const { t } = useTranslation();

	return (
		<div className="text-overlay-content">
			<h1 className="text-overlay-title">
				{t("sections.skills.title")}.
			</h1>
			<p className="text-overlay-subtitle">
				{t("sections.skills.subtitle")}
			</p>

			<div className="text-overlay-list">
				{SKILL_GROUPS.map((group) => (
					<div key={group.key} className="text-group-item">
						<h3 className="text-group-heading">
							{t(group.i18nKey)}
						</h3>
						<p className="text-group-body">{group.skills}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default SkillsSection;
