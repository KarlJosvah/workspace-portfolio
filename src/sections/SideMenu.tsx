import MenuButton from "@/components/ui/MenuButton.tsx";
import { MENU_ITEMS, type MenuType } from "@/constants/menuConfig.ts";

interface SideMenuProps {
	activeSection: MenuType;
	onSectionChange: (section: MenuType) => void;
}

export function SideMenu({ activeSection, onSectionChange }: SideMenuProps) {
	return (
		<aside className="side-menu-container" aria-label="Page Sections Navigation">
			{MENU_ITEMS.map((item) => (
				<MenuButton
					key={item.id}
					label={item.label}
					isActive={activeSection === item.id}
					onClick={() => onSectionChange(item.id)}
				/>
			))}
		</aside>
	);
}

export default SideMenu;
