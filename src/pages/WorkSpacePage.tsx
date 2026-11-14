import { useState, useCallback, useEffect } from "react";
import Scene from "@/three/Scene.tsx";
import Header from "@/sections/Header.tsx";
import SideMenu from "@/sections/SideMenu.tsx";
import ControlsHint from "@/components/ui/ControlsHint.tsx";
import SectionOverlay from "@/components/ui/overlay/SectionOverlay.tsx";
import { MenuType } from "@/constants/menuConfig.ts";
import "@/pages/WorkSpacePage.css";

export function WorkSpacePage() {
	const [activeSection, setActiveSection] = useState<MenuType | null>(
		MenuType.Hero
	);

	const handleSectionChange = useCallback((section: MenuType) => {
		// Toggle: clicking the active tab again collapses the overlay
		setActiveSection((prev) => (prev === section ? null : section));
	}, []);

	const handleClose = useCallback(() => {
		setActiveSection(null);
	}, []);

	// Global Escape listener to unfocus section from anywhere
	useEffect(() => {
		if (activeSection === null) return;
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setActiveSection(null);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [activeSection]);

	return (
		<main className="workspace-container">
			{/* Fullscreen 3D Room — always interactive */}
			<Scene
				activeSection={activeSection}
				onExitSection={handleClose}
			/>

			{/* Top bar */}
			<Header />

			{/* Controls hint */}
			<ControlsHint />

			{/* Right side menu */}
			<SideMenu
				activeSection={activeSection}
				onSectionChange={handleSectionChange}
			/>

			{/*
			 * Minimalist text overlay:
			 * Left-aligned, vertically centered typography directly on the 3D scene.
			 * Root has pointer-events: none so WASD walk and drag-to-look remain active.
			 * Pressing ESC or clicking the active menu button closes it.
			 */}
			<SectionOverlay
				activeSection={activeSection}
				onClose={handleClose}
			/>
		</main>
	);
}

export default WorkSpacePage;
