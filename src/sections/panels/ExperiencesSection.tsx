import { useTranslation } from "react-i18next";

const EXPERIENCES = [
	{
		id: "e1",
		role: "Senior Full-Stack & 3D Web Developer",
		company: "Freelance",
		period: "2023 – Present",
		desc: "Crafting bespoke web applications combining modern React architectures with interactive WebGL/Three.js environments.",
	},
	{
		id: "e2",
		role: "Frontend Engineer",
		company: "Tech Startup",
		period: "2021 – 2023",
		desc: "Led frontend architecture for scalable web platforms. Modernized legacy stacks to React and optimized rendering speed.",
	},
	{
		id: "e3",
		role: "Web Developer",
		company: "Digital Agency",
		period: "2019 – 2021",
		desc: "Built high-fidelity responsive websites, interactive marketing pages, and custom client web solutions.",
	},
];

export function ExperiencesSection() {
	const { t } = useTranslation();

	return (
		<div className="text-overlay-content">
			<h1 className="text-overlay-title">{t("sections.experiences.title")}.</h1>
			<p className="text-overlay-subtitle">{t("sections.experiences.subtitle")}</p>

			<div className="text-overlay-list">
				{EXPERIENCES.map((exp) => (
					<div key={exp.id} className="text-group-item">
						<div className="text-item-header">
							<h3 className="text-group-heading">{exp.role}</h3>
							<span className="text-meta-text">{exp.period}</span>
						</div>
						<p className="text-company-label">{exp.company}</p>
						<p className="text-group-body">{exp.desc}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default ExperiencesSection;
