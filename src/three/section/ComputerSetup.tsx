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
				material={glowMaterials.screen}
				castShadow
				receiveShadow
			>
				{activeSection === MenuType.FeaturedProjects && (
					<MonitorScreen
						title="Featured Projects — Terminal"
						position={[-0.0025, 0, 0.015]}
						rotation={[0, -0.2291, 0]}
						distanceFactor={0.415}
						screenHeight={574}
						onClose={onExitSection}
					>
						<FeaturedProjectsSection />
					</MonitorScreen>
				)}
			</RoomMesh>
			<RoomMesh
				node={nodes.WebCam}
				material={glowMaterials.subtle}
				castShadow
				receiveShadow
			/>

			{/*
			 * ── Monitor002 → Recommended Projects ──
			 * Node world pos: [0.034, 0.708, 0.542]
			 * Front face normal: [-0.91, 0, 0.41]  rotY = atan2(nx,nz) = -1.1475 rad
			 * Actual screen W = sqrt(0.308²+0.676²) = 0.743  H = 0.405  (landscape ~16:9)
			 * distanceFactor = 0.743*400/1024 = 0.290  screenH = 1024*0.405/0.743 ≈ 558px
			 */}
			<RoomMesh
				node={nodes.Monitor002}
				material={glowMaterials.screen}
				castShadow
				receiveShadow
			>
				{activeSection === MenuType.RecommendedProjects && (
					<MonitorScreen
						title="Recommended Projects — Terminal"
						position={[-0.0197, 0, 0.0092]}
						rotation={[0, -1.1475, 0]}
						distanceFactor={0.290}
						screenHeight={558}
						onClose={onExitSection}
					>
						<RecommendedProjectsSection />
					</MonitorScreen>
				)}
			</RoomMesh>

			{/*
			 * ── Monitor003 → Contact ──
			 * Node world pos: [-1.544, 0.795, -0.025]
			 * Front face normal: [0.40, 0, 0.92]  rotY = atan2(nx,nz) = +0.4101 rad
			 * Actual screen W = sqrt(0.372²+0.166²) = 0.407  H = 0.743  (portrait)
			 * distanceFactor = 0.407*400/1024 = 0.159  screenH = 1024*0.743/0.407 ≈ 1869px
			 */}
			<RoomMesh
				node={nodes.Monitor003}
				material={glowMaterials.screen}
				castShadow
				receiveShadow
			>
				{activeSection === MenuType.Contact && (
					<MonitorScreen
						title="Contact — Terminal"
						position={[0.009, 0, 0.0198]}
						rotation={[0, 0.4101, 0]}
						distanceFactor={0.159}
						screenHeight={1869}
						onClose={onExitSection}
					>
						<ContactSection />
					</MonitorScreen>
				)}
			</RoomMesh>

			{/*
			 * ── LapTop (Body & Screen) → Professional Experiences ──
			 * LapTop.Body world pos: [0.0571, 0.4497, 1.1545]
			 * LapTop.Screen local to Body: [0.1437, 0.1746, 0.0532]
			 * Display dimensions in Screen local: W = 0.3916, H = 0.2666 (aspect ratio 1.469 ~ 3:2)
			 * Front normal: [-0.9311, 0.1186, -0.3449] (facing towards user at desk with backward tilt)
			 * Basis rotation (XYZ): [-2.8104, -1.1975, -2.8312]
			 * distanceFactor = 0.3916 * 400 / 1024 = 0.153
			 * screenHeight = 1024 * 0.2666 / 0.3916 ≈ 697px
			 * position = [-0.0098, 0.0012, -0.0036] (center + 5mm normal offset)
			 */}
			<RoomMesh
				node={nodes.LapTopBody}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			>
				<RoomMesh
					node={nodes.LapTopScreen}
					material={glowMaterials.screen}
					castShadow
					receiveShadow
				>
					{activeSection === MenuType.ProfessionalExperiences && (
						<MonitorScreen
							title="Experiences — Terminal"
							position={[-0.0098, 0.0012, -0.0036]}
							rotation={[-2.8104, -1.1975, -2.8312]}
							distanceFactor={0.153}
							screenHeight={697}
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
