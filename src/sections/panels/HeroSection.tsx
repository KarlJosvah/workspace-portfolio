import { useTranslation } from "react-i18next";

export function HeroSection() {
	const { t } = useTranslation();

	return (
		<div className="text-overlay-content">
			<h1 className="text-overlay-title">Hi, I'm Karl Josvah.</h1>
			<h2 className="text-overlay-subtitle">{t("sections.hero.title")}</h2>
			<p className="text-overlay-body">{t("sections.hero.bio")}</p>
			<div className="text-overlay-actions">
				<a href="#projects" className="text-link">
					{t("sections.hero.ctaProjects")} →
				</a>
				<a href="#contact" className="text-link secondary">
					{t("sections.hero.ctaContact")}
				</a>
			</div>
		</div>
	);
}

export default HeroSection;
