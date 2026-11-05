import { useTranslation } from "react-i18next";
import MenuButton from "@/components/ui/MenuButton.tsx";
import { MENU_ITEMS, MenuType } from "@/constants/menuConfig.ts";

interface SideMenuProps {
	activeSection: MenuType;
	onSectionChange: (section: MenuType) => void;
}

const MENU_I18N_KEYS: Record<MenuType, string> = {
	[MenuType.Hero]: "menu.hero.label",
	[MenuType.TechnicalSkills]: "menu.technicalSkills.label",
	[MenuType.FeaturedProjects]: "menu.featuredProjects.label",
	[MenuType.RecommendedProjects]: "menu.recommendedProjects.label",
	[MenuType.ProfessionalExperiences]: "menu.professionalExperiences.label",
	[MenuType.Contact]: "menu.contact.label",
};

export function SideMenu({ activeSection, onSectionChange }: SideMenuProps) {
	const { t } = useTranslation();

	return (
		<aside className="side-menu-container" aria-label="Page Sections Navigation">
			{MENU_ITEMS.map((item) => (
				<MenuButton
					key={item.id}
					label={t(MENU_I18N_KEYS[item.id], item.label)}
					isActive={activeSection === item.id}
					onClick={() => onSectionChange(item.id)}
				/>
			))}
		</aside>
	);
}

export default SideMenu;
