import { useState } from "react";
import Scene from "@/components/three/Scene.tsx";
import Header from "@/sections/Header.tsx";
import SideMenu from "@/sections/SideMenu.tsx";
import ControlsHint from "@/components/ui/ControlsHint.tsx";
import { MenuType } from "@/constants/menuConfig.ts";

export function WorkSpacePage() {
	const [activeSection, setActiveSection] = useState<MenuType>(MenuType.Hero);

	const handleSectionChange = (section: MenuType) => {
		setActiveSection(section);
	};

	return (
		<main className="workspace-container">
			{/* Fullscreen 3D Room */}
			<Scene />

			{/* Top Bar with Language Selector */}
			<Header />

			{/* Interactive Controls Overlay Hint */}
			<ControlsHint />

			{/* Side Menu fixed to the right */}
			<SideMenu
				activeSection={activeSection}
				onSectionChange={handleSectionChange}
			/>
		</main>
	);
}

export default WorkSpacePage;
