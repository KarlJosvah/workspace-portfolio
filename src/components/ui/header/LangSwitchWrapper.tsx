import { useTranslation } from "react-i18next";
import { supportedLanguages } from "@/i18n/index.ts";
import flagEn from "@/assets/flags/united-kingdom.svg";
import flagFr from "@/assets/flags/france.svg";
import flagJa from "@/assets/flags/japan.svg";
import flagMg from "@/assets/flags/madagascar.svg";

const FLAG_MAP: Record<string, string> = {
	en: flagEn,
	fr: flagFr,
	ja: flagJa,
	mg: flagMg,
};

export function LangSwitchWrapper() {
	const { t, i18n } = useTranslation();

	const currentLangCode =
		i18n.resolvedLanguage?.split("-")[0] ||
		i18n.language?.split("-")[0] ||
		"en";
	const currentLanguage =
		supportedLanguages.find((l) => l.code === currentLangCode) ||
		supportedLanguages[0];

	const toggleLanguage = () => {
		const currentIndex = supportedLanguages.findIndex(
			(l) => l.code === currentLanguage.code
		);
		const nextIndex = (currentIndex + 1) % supportedLanguages.length;
		void i18n.changeLanguage(supportedLanguages[nextIndex].code);
	};

	const currentFlagSrc = FLAG_MAP[currentLanguage.code] || flagEn;

	return (
		<div className="lang-switch-wrapper">
			<button
				type="button"
				className="lang-toggle-btn"
				onClick={toggleLanguage}
				title={t("language.select", "Switch language")}
				aria-label={currentLanguage.name}
			>
				<img
					src={currentFlagSrc}
					alt=""
					aria-hidden="true"
					className="lang-flag-toggle"
				/>
				<span className="lang-current-label">
					{currentLanguage.name}
				</span>
			</button>
			<div
				className="lang-options"
				role="group"
				aria-label={t("language.select", "Language options")}
			>
				{supportedLanguages.map((lang) => (
					<button
						key={lang.code}
						type="button"
						className={`lang-option-btn ${lang.code === currentLanguage.code ? "active" : ""}`}
						onClick={() => void i18n.changeLanguage(lang.code)}
						title={lang.name}
						aria-label={lang.name}
					>
						{lang.code.toUpperCase()}
					</button>
				))}
			</div>
		</div>
	);
}

export default LangSwitchWrapper;
