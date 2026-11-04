import { useState } from "react";
import Scene from "../components/three/Scene.tsx";
import SideMenu from "../sections/SideMenu.tsx";
import { MenuType } from "../constants/menuConfig.ts";
import { useTranslation } from "react-i18next";
import { supportedLanguages } from "../i18n/index.ts";

export function WorkSpacePage() {
	const [activeSection, setActiveSection] = useState<MenuType>(MenuType.Hero);
	const { i18n } = useTranslation();

	const currentLangCode =
		i18n.resolvedLanguage?.split("-")[0] ||
		i18n.language?.split("-")[0] ||
		"en";
	const currentLanguage =
		supportedLanguages.find((l) => l.code === currentLangCode) ||
		supportedLanguages[0];

	const toggleLanguage = () => {
		const currentIndex = supportedLanguages.findIndex(
			(l) => l.code === currentLanguage.code,
		);
		const nextIndex = (currentIndex + 1) % supportedLanguages.length;
		void i18n.changeLanguage(supportedLanguages[nextIndex].code);
	};

	const handleSectionChange = (section: MenuType) => {
		setActiveSection(section);
	};

	return (
		<main className="workspace-container">
			{/* Fullscreen 3D Room Experience */}
			<Scene />

			{/* Top Bar with Language Selector */}
			<header className="workspace-header">
				<div className="brand-badge">
					<span className="brand-dot" />
					<span className="brand-title">Workspace 3D</span>
				</div>

				<div className="lang-switch-wrapper">
					<button
						type="button"
						className="lang-toggle-btn"
						onClick={toggleLanguage}
						title="Toggle language"
					>
						<span role="img" aria-label="Globe">
							🌐
						</span>
						<span>{currentLanguage.name}</span>
					</button>
					<div
						className="lang-options"
						role="group"
						aria-label="Language options"
					>
						{supportedLanguages.map((lang) => (
							<button
								key={lang.code}
								type="button"
								className={`lang-option-btn ${
									lang.code === currentLanguage.code ? "active" : ""
								}`}
								onClick={() => void i18n.changeLanguage(lang.code)}
							>
								{lang.code.toUpperCase()}
							</button>
						))}
					</div>
				</div>
			</header>

			{/* Interactive Controls Overlay Hint */}
			<div className="controls-hint" aria-hidden="true">
				<span className="controls-key">W</span>
				<span className="controls-key">A</span>
				<span className="controls-key">S</span>
				<span className="controls-key">D</span>
				<span className="controls-separator">/</span>
				<span className="controls-key">Arrows</span>
				<span className="controls-desc">to walk (Height: 1.75m)</span>
				<span className="controls-dot">•</span>
				<span className="controls-desc">Drag to look around</span>
			</div>

			{/* Side Menu fixed to the right */}
			<SideMenu
				activeSection={activeSection}
				onSectionChange={handleSectionChange}
			/>
		</main>
	);
}

export default WorkSpacePage;
