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

export function ComputerSetup({
	nodes,
	glowMaterials,
	activeSection,
	onExitSection,
}: ComputerSetupProps) {
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
					material={glowMaterials.screen}
				>
					{activeSection === MenuType.FeaturedProjects && (
						<MonitorScreen
							screenNode={nodes.MonitorScreen001}
							title="Featured Projects — Terminal"
							onClose={onExitSection}
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
					material={glowMaterials.screen}
				>
					{activeSection === MenuType.RecommendedProjects && (
						<MonitorScreen
							screenNode={nodes.MonitorScreen002}
							title="Recommended Projects — Terminal"
							onClose={onExitSection}
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
					material={glowMaterials.screen}
				>
					{activeSection === MenuType.Contact && (
						<MonitorScreen
							screenNode={nodes.MonitorScreen003}
							title="Contact — Terminal"
							onClose={onExitSection}
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
					material={glowMaterials.screen}
					castShadow
					receiveShadow
				>
					{activeSection === MenuType.ProfessionalExperiences && (
						<MonitorScreen
							screenNode={nodes.LapTopScreen}
							title="Experiences — Terminal"
							onClose={onExitSection}
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
