import { useState } from "react";
import Scene from "../components/three/Scene.tsx";
import SideMenu from "../sections/SideMenu.tsx";
import { MenuType } from "../constants/menuConfig.ts";

function WorkSpacePage() {
	const [activeSection, setActiveSection] = useState<MenuType>(MenuType.Hero);

	const handleSectionChange = (section: MenuType) => {
		setActiveSection(section);
	};

	return (
		<div className="workspace-container">
			<Scene />
			<SideMenu
				activeSection={activeSection}
				onSectionChange={handleSectionChange}
			/>
		</div>
	);
}

export default WorkSpacePage;
