import { useTranslation } from "react-i18next";
import { supportedLanguages } from "@/i18n/index.ts";

export function LangSwitchWrapper() {
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

	return (
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
			<div className="lang-options" role="group" aria-label="Language options">
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
	);
}

export default LangSwitchWrapper;
