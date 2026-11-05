import { useEffect, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MenuType } from "@/constants/menuConfig.ts";
import "@/components/ui/overlay/SectionOverlay.css";

const HeroSection = lazy(() => import("@/sections/panels/HeroSection.tsx"));
const SkillsSection = lazy(
	() => import("@/sections/panels/SkillsSection.tsx"),
);
const FeaturedProjectsSection = lazy(
	() => import("@/sections/panels/FeaturedProjectsSection.tsx"),
);
const RecommendedProjectsSection = lazy(
	() => import("@/sections/panels/RecommendedProjectsSection.tsx"),
);
const ExperiencesSection = lazy(
	() => import("@/sections/panels/ExperiencesSection.tsx"),
);
const ContactSection = lazy(
	() => import("@/sections/panels/ContactSection.tsx"),
);

const SECTION_MAP: Record<MenuType, React.ComponentType> = {
	[MenuType.Hero]: HeroSection,
	[MenuType.TechnicalSkills]: SkillsSection,
	[MenuType.FeaturedProjects]: FeaturedProjectsSection,
	[MenuType.RecommendedProjects]: RecommendedProjectsSection,
	[MenuType.ProfessionalExperiences]: ExperiencesSection,
	[MenuType.Contact]: ContactSection,
};

interface SectionOverlayProps {
	activeSection: MenuType | null;
	onClose: () => void;
}

export function SectionOverlay({ activeSection, onClose }: SectionOverlayProps) {
	// ESC always fires on window â€” works even while canvas has pointer focus
	useEffect(() => {
		if (activeSection === null) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [activeSection, onClose]);

	const Section = activeSection !== null ? SECTION_MAP[activeSection] : null;

	return (
		/*
		 * pointer-events: none on the root â†’ canvas keeps ALL input events.
		 * Interactive descendants (links, buttons) opt back in individually.
		 */
		<div className="section-overlay">
			<AnimatePresence mode="wait">
				{activeSection !== null && Section !== null && (
					<motion.div
						key={activeSection}
						className="section-overlay-inner"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.22, ease: "easeOut" }}
					>
						<Suspense fallback={null}>
							<Section />
						</Suspense>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export default SectionOverlay;
