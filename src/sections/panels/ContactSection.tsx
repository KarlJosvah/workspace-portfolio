import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

const EMAIL = "karl.josvah@example.com";

const SOCIAL_LINKS = [
	{ id: "github", label: "GitHub", url: "https://github.com/KarlJosvah" },
	{
		id: "linkedin",
		label: "LinkedIn",
		url: "https://linkedin.com/in/karljosvah",
	},
	{ id: "twitter", label: "Twitter / X", url: "https://x.com/KarlJosvah" },
];

export function ContactSection() {
	const { t } = useTranslation();
	const [copied, setCopied] = useState(false);

	const handleCopyEmail = useCallback(() => {
		void navigator.clipboard.writeText(EMAIL).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	}, []);

	return (
		<div className="text-overlay-content">
			<h1 className="text-overlay-title">
				{t("sections.contact.title")}.
			</h1>
			<p className="text-overlay-body">
				{t("sections.contact.subtitle")}
			</p>

			<div className="text-contact-block">
				<div className="text-contact-email-line">
					<a href={`mailto:${EMAIL}`} className="text-email-link">
						{EMAIL}
					</a>
					<button
						type="button"
						className="text-inline-btn"
						onClick={handleCopyEmail}
					>
						{copied
							? `✓ ${t("sections.contact.copied")}`
							: `[ ${t("sections.contact.copyEmail")} ]`}
					</button>
				</div>

				<div className="text-contact-actions">
					<a href="/resume.pdf" download className="text-link">
						↓ {t("sections.contact.downloadResume")}
					</a>
				</div>

				<div className="text-social-links">
					{SOCIAL_LINKS.map((link) => (
						<a
							key={link.id}
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-social-link"
						>
							{link.label} ↗
						</a>
					))}
				</div>
			</div>
		</div>
	);
}

export default ContactSection;
