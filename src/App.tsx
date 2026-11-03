import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { supportedLanguages } from "./i18n";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);
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
			(l) => l.code === currentLanguage.code,
		);
		const nextIndex = (currentIndex + 1) % supportedLanguages.length;
		void i18n.changeLanguage(supportedLanguages[nextIndex].code);
	};

	return (
		<>
			<header className="lang-header">
				<div className="lang-switch-wrapper">
					<button
						type="button"
						className="lang-toggle-btn"
						onClick={toggleLanguage}
						title={t("language.select")}
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
								className={`lang-option-btn ${lang.code === currentLanguage.code ? "active" : ""}`}
								onClick={() => void i18n.changeLanguage(lang.code)}
							>
								{lang.code.toUpperCase()}
							</button>
						))}
					</div>
				</div>
			</header>

			<section id="center">
				<div className="hero">
					<img src={heroImg} className="base" width="170" height="179" alt="" />
					<img src={reactLogo} className="framework" alt="React logo" />
					<img src={viteLogo} className="vite" alt="Vite logo" />
				</div>
				<div>
					<h1>{t("getStarted")}</h1>
					<p>
						<Trans t={t} key={currentLanguage.code} i18nKey="editPrompt">
							Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
						</Trans>
					</p>
				</div>
				<button
					type="button"
					className="counter"
					onClick={() => setCount((count) => count + 1)}
				>
					{t("count", { count })}
				</button>
			</section>

			<div className="ticks"></div>

			<section id="next-steps">
				<div id="docs">
					<svg className="icon" role="presentation" aria-hidden="true">
						<use href="/icons.svg#documentation-icon"></use>
					</svg>
					<h2>{t("docs.title")}</h2>
					<p>{t("docs.subtitle")}</p>
					<ul>
						<li>
							<a href="https://vite.dev/" target="_blank">
								<img className="logo" src={viteLogo} alt="" />
								{t("docs.exploreVite")}
							</a>
						</li>
						<li>
							<a href="https://react.dev/" target="_blank">
								<img className="button-icon" src={reactLogo} alt="" />
								{t("docs.learnMore")}
							</a>
						</li>
					</ul>
				</div>
				<div id="social">
					<svg className="icon" role="presentation" aria-hidden="true">
						<use href="/icons.svg#social-icon"></use>
					</svg>
					<h2>{t("social.title")}</h2>
					<p>{t("social.subtitle")}</p>
					<ul>
						<li>
							<a href="https://github.com/vitejs/vite" target="_blank">
								<svg
									className="button-icon"
									role="presentation"
									aria-hidden="true"
								>
									<use href="/icons.svg#github-icon"></use>
								</svg>
								GitHub
							</a>
						</li>
						<li>
							<a href="https://chat.vite.dev/" target="_blank">
								<svg
									className="button-icon"
									role="presentation"
									aria-hidden="true"
								>
									<use href="/icons.svg#discord-icon"></use>
								</svg>
								Discord
							</a>
						</li>
						<li>
							<a href="https://x.com/vite_js" target="_blank">
								<svg
									className="button-icon"
									role="presentation"
									aria-hidden="true"
								>
									<use href="/icons.svg#x-icon"></use>
								</svg>
								X.com
							</a>
						</li>
						<li>
							<a href="https://bsky.app/profile/vite.dev" target="_blank">
								<svg
									className="button-icon"
									role="presentation"
									aria-hidden="true"
								>
									<use href="/icons.svg#bluesky-icon"></use>
								</svg>
								Bluesky
							</a>
						</li>
					</ul>
				</div>
			</section>

			<div className="ticks"></div>
			<section id="spacer"></section>
		</>
	);
}

export default App;
