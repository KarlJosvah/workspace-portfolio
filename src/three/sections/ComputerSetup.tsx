import { useState } from "react";
import { RoomMesh } from "@/three/utils/RoomMesh.tsx";
import { MonitorScreen } from "@/three/components/MonitorScreen.tsx";
import { FeaturedProjectsSection } from "@/sections/panels/FeaturedProjectsSection.tsx";
import { RecommendedProjectsSection } from "@/sections/panels/RecommendedProjectsSection.tsx";
import { ExperiencesSection } from "@/sections/panels/ExperiencesSection.tsx";
import { ContactSection } from "@/sections/panels/ContactSection.tsx";
import { MenuType } from "@/constants/menuConfig.ts";
import type { RoomSubComponentProps } from "@/three/utils/roomTypes.ts";

/* -------------------------------------------------------------
 * 3. Computer Setup & Monitors (PC Tower, Triple Monitors, Laptop)
 * ------------------------------------------------------------*/
export interface ComputerSetupProps extends RoomSubComponentProps {
	activeSection?: MenuType | null;
	onExitSection?: () => void;
}

const MONITOR_SECTIONS = new Set<MenuType>([
	MenuType.FeaturedProjects,
	MenuType.RecommendedProjects,
	MenuType.Contact,
	MenuType.ProfessionalExperiences,
]);

export function ComputerSetup({
	nodes,
	glowMaterials,
	activeSection,
	onExitSection,
}: ComputerSetupProps) {
	// Track previous activeSection to update openScreens during render when props change
	const [prevSection, setPrevSection] = useState(activeSection);
	const [openScreens, setOpenScreens] = useState<Set<MenuType>>(
		() => new Set()
	);

	if (prevSection !== activeSection) {
		setPrevSection(activeSection);
		const isStanding = !activeSection || activeSection === MenuType.Hero;
		if (isStanding) {
			setOpenScreens(new Set());
		} else if (MONITOR_SECTIONS.has(activeSection)) {
			setOpenScreens((prev) => {
				if (prev.has(activeSection)) return prev;
				const next = new Set(prev);
				next.add(activeSection);
				return next;
			});
		}
	}

	const handleCloseScreen = (section: MenuType) => {
		setOpenScreens((prev) => {
			const next = new Set(prev);
			next.delete(section);
			return next;
		});
		if (activeSection === section) {
			onExitSection?.();
		}
	};

	const isFeaturedOpen = openScreens.has(MenuType.FeaturedProjects);
	const isRecommendedOpen = openScreens.has(MenuType.RecommendedProjects);
	const isContactOpen = openScreens.has(MenuType.Contact);
	const isExperiencesOpen = openScreens.has(MenuType.ProfessionalExperiences);

	return (
		<group name="ComputerSetup">
			<RoomMesh
				node={nodes.PCTower}
				material={glowMaterials.pcAccents}
				castShadow
				receiveShadow
			/>

			{/* ── Monitor001 → Featured Projects ── */}
			<RoomMesh
				node={nodes.Monitor001}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			>
				<RoomMesh
					node={nodes.MonitorScreen001}
					material={
						isFeaturedOpen
							? glowMaterials.standard
							: glowMaterials.screen
					}
				>
					{isFeaturedOpen && (
						<MonitorScreen
							screenNode={nodes.MonitorScreen001}
							title="Featured Projects — Terminal"
							onClose={() =>
								handleCloseScreen(MenuType.FeaturedProjects)
							}
						>
							<FeaturedProjectsSection />
						</MonitorScreen>
					)}
				</RoomMesh>
			</RoomMesh>

			<RoomMesh
				node={nodes.WebCam}
				material={glowMaterials.subtle}
				castShadow
				receiveShadow
			/>

			{/* ── Monitor002 → Recommended Projects ── */}
			<RoomMesh
				node={nodes.Monitor002}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			>
				<RoomMesh
					node={nodes.MonitorScreen002}
					material={
						isRecommendedOpen
							? glowMaterials.standard
							: glowMaterials.screen
					}
				>
					{isRecommendedOpen && (
						<MonitorScreen
							screenNode={nodes.MonitorScreen002}
							title="Recommended Projects — Terminal"
							onClose={() =>
								handleCloseScreen(MenuType.RecommendedProjects)
							}
						>
							<RecommendedProjectsSection />
						</MonitorScreen>
					)}
				</RoomMesh>
			</RoomMesh>

			{/* ── Monitor003 → Contact ── */}
			<RoomMesh
				node={nodes.Monitor003}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			>
				<RoomMesh
					node={nodes.MonitorScreen003}
					material={
						isContactOpen
							? glowMaterials.standard
							: glowMaterials.screen
					}
				>
					{isContactOpen && (
						<MonitorScreen
							screenNode={nodes.MonitorScreen003}
							title="Contact — Terminal"
							onClose={() => handleCloseScreen(MenuType.Contact)}
						>
							<ContactSection />
						</MonitorScreen>
					)}
				</RoomMesh>
			</RoomMesh>

			{/* ── LapTop (Body, Lid & Screen) → Professional Experiences ── */}
			<RoomMesh
				node={nodes.LapTopBody}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			>
				<RoomMesh
					node={nodes.LapTopLid}
					material={glowMaterials.standard}
					castShadow
					receiveShadow
				/>
				<RoomMesh
					node={nodes.LapTopScreen}
					material={
						isExperiencesOpen
							? glowMaterials.standard
							: glowMaterials.screen
					}
					castShadow
					receiveShadow
				>
					{isExperiencesOpen && (
						<MonitorScreen
							screenNode={nodes.LapTopScreen}
							title="Experiences — Terminal"
							onClose={() =>
								handleCloseScreen(
									MenuType.ProfessionalExperiences
								)
							}
						>
							<ExperiencesSection />
						</MonitorScreen>
					)}
				</RoomMesh>
			</RoomMesh>

			<RoomMesh
				node={nodes.CoolingPad}
				material={glowMaterials.subtle}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.Keyboard}
				material={glowMaterials.subtle}
				castShadow
			/>
			<RoomMesh
				node={nodes.Mouse}
				material={glowMaterials.subtle}
				castShadow
			/>
			<RoomMesh
				node={nodes.USBFflash}
				material={glowMaterials.subtle}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.HardDisk}
				material={glowMaterials.subtle}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.Light}
				material={glowMaterials.lamp}
				castShadow
			/>
			<RoomMesh
				node={nodes.MCHotBar}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			>
				<RoomMesh
					node={nodes.MCHeart}
					material={glowMaterials.standard}
					castShadow
				/>
				<RoomMesh
					node={nodes.MCHunger}
					material={glowMaterials.standard}
					castShadow
				/>
				<RoomMesh
					node={nodes.MCXPBar}
					material={glowMaterials.standard}
					castShadow
				/>
			</RoomMesh>
		</group>
	);
}

export default ComputerSetup;
