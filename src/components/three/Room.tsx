import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { createGlowMaterials } from "@/constants/emissionConfig.ts";
import {
	MODEL_URL,
	type GLTFResult,
	type RoomSubComponentProps,
} from "./roomTypes.ts";
import { RoomMesh } from "./RoomMesh.tsx";
import { WallClock } from "./WallClock.tsx";
import { TriangleWallLEDs } from "./TriangleWallLEDs.tsx";
import { CeilingLamps } from "./CeilingLamps.tsx";
import { ChessArea } from "./ChessPieces.tsx";
import { MonitorScreen } from "./MonitorScreen.tsx";
import { FeaturedProjectsSection } from "@/sections/panels/FeaturedProjectsSection.tsx";
import { RecommendedProjectsSection } from "@/sections/panels/RecommendedProjectsSection.tsx";
import { ExperiencesSection } from "@/sections/panels/ExperiencesSection.tsx";
import { ContactSection } from "@/sections/panels/ContactSection.tsx";
import { MenuType } from "@/constants/menuConfig.ts";

// Re-export outsourced components and types for consumers
export { MODEL_URL, type GLTFResult, type RoomSubComponentProps };
export { RoomMesh } from "./RoomMesh.tsx";
export { WallClock } from "./WallClock.tsx";
export { TriangleWallLEDs } from "./TriangleWallLEDs.tsx";
export { CeilingLamps } from "./CeilingLamps.tsx";
export { ChessArea, ChessPieces } from "./ChessPieces.tsx";
export { MonitorScreen } from "./MonitorScreen.tsx";

/* -------------------------------------------------------------
 * 1. Room Architecture & Structure (Floor, Walls, Ceiling, Rugs & Wall Art)
 * ------------------------------------------------------------*/
export function RoomStructure({ nodes, glowMaterials }: RoomSubComponentProps) {
	return (
		<group name="RoomStructure">
			<RoomMesh
				node={nodes.Floor}
				material={glowMaterials.standard}
				receiveShadow
			/>
			<RoomMesh
				node={nodes.Wall}
				material={glowMaterials.standard}
				receiveShadow
			/>
			<RoomMesh
				node={nodes.Ceiling}
				material={glowMaterials.lamp}
				receiveShadow
			/>
			<RoomMesh
				node={nodes.LEDCeiling}
				material={glowMaterials.subtle}
				receiveShadow
			/>
			<RoomMesh
				node={nodes.CarpetDesk}
				material={glowMaterials.standard}
				receiveShadow
			/>
			<RoomMesh
				node={nodes.CarpetChess}
				material={glowMaterials.standard}
				receiveShadow
			/>
			<RoomMesh
				node={nodes.WingsofFreedomRight}
				material={glowMaterials.wallArt}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.WingsofFreedomLeft}
				material={glowMaterials.wallArt}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.DoorFrame}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			>
				<RoomMesh
					node={nodes.Door}
					material={glowMaterials.standard}
					castShadow
					receiveShadow
				/>
				<RoomMesh
					node={nodes.DoorAxes}
					material={glowMaterials.standard}
					castShadow
					receiveShadow
				/>
				<RoomMesh
					node={nodes.DoorHandle}
					material={glowMaterials.standard}
					castShadow
					receiveShadow
				/>
			</RoomMesh>
			<RoomMesh
				node={nodes.AC}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.Radiator}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.BasketBall}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.Molecules}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<CeilingLamps nodes={nodes} glowMaterials={glowMaterials} />
			<WallClock nodes={nodes} glowMaterials={glowMaterials} />
			<TriangleWallLEDs nodes={nodes} glowMaterials={glowMaterials} />
		</group>
	);
}

/* -------------------------------------------------------------
 * 2. Desk & Seating (Main Desk, Drawer with Edge LEDs, Mat, Chair, Props)
 * ------------------------------------------------------------*/
export function DeskStation({ nodes, glowMaterials }: RoomSubComponentProps) {
	return (
		<group name="DeskStation">
			<RoomMesh
				node={nodes.Desk}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			>
				<RoomMesh
					node={nodes.DeskDrawer001}
					material={glowMaterials.standard}
					castShadow
					receiveShadow
				/>
				<RoomMesh
					node={nodes.DeskDrawer002}
					material={glowMaterials.standard}
					castShadow
					receiveShadow
				/>
				<RoomMesh
					node={nodes.DeskDrawer003}
					material={glowMaterials.standard}
					castShadow
					receiveShadow
				/>
				<RoomMesh
					node={nodes.LED001}
					material={glowMaterials.ledStrips}
					castShadow
				/>
				<RoomMesh
					node={nodes.LED002}
					material={glowMaterials.ledStrips}
					castShadow
				/>
				<RoomMesh
					node={nodes.LED003}
					material={glowMaterials.ledStrips}
					castShadow
				/>
				<RoomMesh
					node={nodes.LED004}
					material={glowMaterials.ledStrips}
					castShadow
				/>
			</RoomMesh>
			<RoomMesh
				node={nodes.DeskMat}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.Chair}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.TrashCan}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.Rubik}
				material={glowMaterials.standard}
				castShadow
			/>
			<RoomMesh
				node={nodes.Mug}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.Coaster}
				material={glowMaterials.standard}
				castShadow
			/>
			<RoomMesh
				node={nodes.AVR001}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
		</group>
	);
}

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
				node={(nodes.LapTopBody ?? nodes["LapTop.Body"] ?? nodes.LapTop)!}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			>
				<RoomMesh
					node={(nodes.LapTopScreen ?? nodes["LapTop.Screen"])!}
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

/* -------------------------------------------------------------
 * 4. Audio & Headset Equipment (Speakers, Headsets, Stand)
 * ------------------------------------------------------------*/
export function AudioEquipment({
	nodes,
	glowMaterials,
}: RoomSubComponentProps) {
	return (
		<group name="AudioEquipment">
			<RoomMesh
				node={nodes.Speaker001}
				material={glowMaterials.standard}
				castShadow
			/>
			<RoomMesh
				node={nodes.Speaker002}
				material={glowMaterials.standard}
				castShadow
			/>
			<RoomMesh
				node={nodes.HeadSetHolder}
				material={glowMaterials.standard}
				castShadow
			/>
			<RoomMesh
				node={nodes.HeadSet003}
				material={glowMaterials.subtle}
				castShadow
			/>
		</group>
	);
}

/* -------------------------------------------------------------
 * 5. Room Storage & Appliances (Shelves with LED strips, Mini-Fridge)
 * ------------------------------------------------------------*/
export function RoomFurniture({ nodes, glowMaterials }: RoomSubComponentProps) {
	return (
		<group name="RoomFurniture">
			<RoomMesh
				node={nodes.Fridge}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.Shelves}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			>
				<RoomMesh
					node={nodes.LED014}
					material={glowMaterials.ledStrips}
					castShadow
				/>
				<RoomMesh
					node={nodes.LED015}
					material={glowMaterials.ledStrips}
					castShadow
				/>
				<RoomMesh
					node={nodes.LED016}
					material={glowMaterials.ledStrips}
					castShadow
				/>
				<RoomMesh
					node={nodes.LED017}
					material={glowMaterials.ledStrips}
					castShadow
				/>
				<RoomMesh
					node={nodes.LED018}
					material={glowMaterials.ledStrips}
					castShadow
				/>
				<RoomMesh
					node={nodes.LED019}
					material={glowMaterials.ledStrips}
					castShadow
				/>
				<RoomMesh
					node={nodes.LED020}
					material={glowMaterials.ledStrips}
					castShadow
				/>
				<RoomMesh
					node={nodes.LED021}
					material={glowMaterials.ledStrips}
					castShadow
				/>
			</RoomMesh>
		</group>
	);
}

/* -------------------------------------------------------------
 * 6. Gaming & Entertainment Wall (TV Console, TV with Backlight, Soundbar, Remote, Game Shelves, PlayStation Collection, Nintendo Switch & LED Signs)
 * ------------------------------------------------------------*/
export function GamingConsoleZone({
	nodes,
	glowMaterials,
}: RoomSubComponentProps) {
	return (
		<group name="GamingConsoleZone">
			<RoomMesh
				node={nodes.ShelveConsole}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			>
				<RoomMesh
					node={nodes.LED010}
					material={glowMaterials.ledStrips}
					castShadow
				/>
				<RoomMesh
					node={nodes.LED011}
					material={glowMaterials.ledStrips}
					castShadow
				/>
				<RoomMesh
					node={nodes.LED012}
					material={glowMaterials.ledStrips}
					castShadow
				/>
				<RoomMesh
					node={nodes.LED013}
					material={glowMaterials.ledStrips}
					castShadow
				/>
			</RoomMesh>
			<RoomMesh
				node={nodes.Shelve001}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			>
				<RoomMesh
					node={nodes.LED005}
					material={glowMaterials.ledStrips}
					castShadow
				/>
			</RoomMesh>
			<RoomMesh
				node={nodes.Monitor004}
				material={glowMaterials.screen}
				castShadow
				receiveShadow
			>
				<RoomMesh
					node={nodes.LED006}
					material={glowMaterials.ledStrips}
					castShadow
				/>
				<RoomMesh
					node={nodes.LED007}
					material={glowMaterials.ledStrips}
					castShadow
				/>
				<RoomMesh
					node={nodes.LED008}
					material={glowMaterials.ledStrips}
					castShadow
				/>
				<RoomMesh
					node={nodes.LED009}
					material={glowMaterials.ledStrips}
					castShadow
				/>
			</RoomMesh>
			<RoomMesh
				node={nodes.MysteryBox}
				material={glowMaterials.lamp}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.Speaker003}
				material={glowMaterials.subtle}
				castShadow
			/>
			<RoomMesh
				node={nodes.TVRemote}
				material={glowMaterials.standard}
				castShadow
			/>
			<RoomMesh
				node={nodes.PSGameShelve}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.PSGameShelveSupport}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.LedPSTriangle}
				material={glowMaterials.neonSigns}
				castShadow
			/>
			<RoomMesh
				node={nodes.LedPSCircle}
				material={glowMaterials.neonSigns}
				castShadow
			/>
			<RoomMesh
				node={nodes.LedPSCross}
				material={glowMaterials.neonSigns}
				castShadow
			/>
			<RoomMesh
				node={nodes.LedPSSquare}
				material={glowMaterials.neonSigns}
				castShadow
			/>
			<RoomMesh
				node={nodes.PS1}
				material={glowMaterials.subtle}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.PS2}
				material={glowMaterials.subtle}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.PS3}
				material={glowMaterials.subtle}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.PS4}
				material={glowMaterials.subtle}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.PS5}
				material={glowMaterials.subtle}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.SwitchSupport}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.SwitchDock}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.SwitchTablet}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.SwitchJoyConRight}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.SwitchJoyConLeft}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.SwitchJoyConRight001}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.SwitchJoyConLeft001}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.SwitchJoyConRight002}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.SwitchJoyConLeft002}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.AVR002}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.Rocket}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
		</group>
	);
}

/* -------------------------------------------------------------
 * Composite Room Component
 * ------------------------------------------------------------*/
export type RoomProps = ThreeElements["group"] & {
	activeSection?: MenuType | null;
	onExitSection?: () => void;
};

export function Room({ activeSection, onExitSection, ...props }: RoomProps = {}) {
	const { nodes, materials } = useGLTF(MODEL_URL) as unknown as GLTFResult;

	// Create cloned materials for each emission tier
	const glowMaterials = useMemo(() => {
		return createGlowMaterials(materials.Imphezia);
	}, [materials.Imphezia]);

	return (
		<group {...props} dispose={null}>
			<RoomStructure nodes={nodes} glowMaterials={glowMaterials} />
			<DeskStation nodes={nodes} glowMaterials={glowMaterials} />
			<ComputerSetup
				nodes={nodes}
				glowMaterials={glowMaterials}
				activeSection={activeSection}
				onExitSection={onExitSection}
			/>
			<AudioEquipment nodes={nodes} glowMaterials={glowMaterials} />
			<RoomFurniture nodes={nodes} glowMaterials={glowMaterials} />
			<ChessArea nodes={nodes} glowMaterials={glowMaterials} />
			<GamingConsoleZone nodes={nodes} glowMaterials={glowMaterials} />
		</group>
	);
}

useGLTF.preload(MODEL_URL);
export default Room;
