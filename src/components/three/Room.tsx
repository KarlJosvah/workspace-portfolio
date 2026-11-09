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
import { ChessArea } from "./ChessPieces.tsx";

// Re-export outsourced components and types for consumers
export { MODEL_URL, type GLTFResult, type RoomSubComponentProps };
export { RoomMesh } from "./RoomMesh.tsx";
export { WallClock } from "./WallClock.tsx";
export { TriangleWallLEDs } from "./TriangleWallLEDs.tsx";
export { ChessArea, ChessPieces } from "./ChessPieces.tsx";

/* -------------------------------------------------------------
 * 1. Room Architecture & Structure (Floor, Walls, Ceiling, Rugs & Wall Art)
 * ------------------------------------------------------------*/
export function RoomStructure({ nodes, glowMaterials }: RoomSubComponentProps) {
	return (
		<group name="RoomStructure">
			<RoomMesh node={nodes.Floor} material={glowMaterials.standard} receiveShadow />
			<RoomMesh node={nodes.Wall} material={glowMaterials.standard} receiveShadow />
			<RoomMesh node={nodes.Ceiling} material={glowMaterials.neonSigns} receiveShadow />
			<RoomMesh node={nodes.LEDCeiling} material={glowMaterials.subtle} receiveShadow />
			<RoomMesh node={nodes.CarpetDesk} material={glowMaterials.standard} receiveShadow />
			<RoomMesh node={nodes.CarpetChess} material={glowMaterials.standard} receiveShadow />
			<RoomMesh node={nodes.WingsofFreedomRight} material={glowMaterials.wallArt} castShadow receiveShadow />
			<RoomMesh node={nodes.WingsofFreedomLeft} material={glowMaterials.wallArt} castShadow receiveShadow />
			<RoomMesh node={nodes.DoorFrame} material={glowMaterials.standard} castShadow receiveShadow>
				<RoomMesh node={nodes.Door} material={glowMaterials.standard} castShadow receiveShadow />
				<RoomMesh node={nodes.DoorAxes} material={glowMaterials.standard} castShadow receiveShadow />
				<RoomMesh node={nodes.DoorHandle} material={glowMaterials.standard} castShadow receiveShadow />
			</RoomMesh>
			<RoomMesh node={nodes.CeilingLamp001} material={glowMaterials.lamp} castShadow receiveShadow />
			<RoomMesh node={nodes.CeilingLamp002} material={glowMaterials.lamp} castShadow receiveShadow />
			<RoomMesh node={nodes.CeilingLamp003} material={glowMaterials.lamp} castShadow receiveShadow />
			<RoomMesh node={nodes.CeilingLamp004} material={glowMaterials.lamp} castShadow receiveShadow />
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
			<RoomMesh node={nodes.Desk} material={glowMaterials.standard} castShadow receiveShadow>
				<RoomMesh node={nodes.DeskDrawer001} material={glowMaterials.standard} castShadow receiveShadow />
				<RoomMesh node={nodes.DeskDrawer002} material={glowMaterials.standard} castShadow receiveShadow />
				<RoomMesh node={nodes.DeskDrawer003} material={glowMaterials.standard} castShadow receiveShadow />
				<RoomMesh node={nodes.LED001} material={glowMaterials.ledStrips} castShadow />
				<RoomMesh node={nodes.LED002} material={glowMaterials.ledStrips} castShadow />
				<RoomMesh node={nodes.LED003} material={glowMaterials.ledStrips} castShadow />
				<RoomMesh node={nodes.LED004} material={glowMaterials.ledStrips} castShadow />
			</RoomMesh>
			<RoomMesh node={nodes.DeskMat} material={glowMaterials.standard} castShadow receiveShadow />
			<RoomMesh node={nodes.Chair} material={glowMaterials.standard} castShadow receiveShadow />
			<RoomMesh node={nodes.TrashCan} material={glowMaterials.standard} castShadow receiveShadow />
			<RoomMesh node={nodes.Rubik} material={glowMaterials.standard} castShadow />
			<RoomMesh node={nodes.Mug} material={glowMaterials.standard} castShadow receiveShadow />
			<RoomMesh node={nodes.Coaster} material={glowMaterials.standard} castShadow />
			<RoomMesh node={nodes.AVR001} material={glowMaterials.standard} castShadow receiveShadow />
		</group>
	);
}

/* -------------------------------------------------------------
 * 3. Computer Setup & Monitors (PC Tower, Triple Monitors, Laptop)
 * ------------------------------------------------------------*/
export function ComputerSetup({ nodes, glowMaterials }: RoomSubComponentProps) {
	return (
		<group name="ComputerSetup">
			<RoomMesh node={nodes.PCTower} material={glowMaterials.pcAccents} castShadow receiveShadow />
			<RoomMesh node={nodes.Monitor001} material={glowMaterials.screen} castShadow receiveShadow />
			<RoomMesh node={nodes.Monitor002} material={glowMaterials.screen} castShadow receiveShadow />
			<RoomMesh node={nodes.Monitor003} material={glowMaterials.screen} castShadow receiveShadow />
			<RoomMesh node={nodes.LapTop} material={glowMaterials.screen} castShadow receiveShadow />
			<RoomMesh node={nodes.CoolingPad} material={glowMaterials.subtle} castShadow receiveShadow />
			<RoomMesh node={nodes.Keyboard} material={glowMaterials.subtle} castShadow />
			<RoomMesh node={nodes.Mouse} material={glowMaterials.subtle} castShadow />
			<RoomMesh node={nodes.Light} material={glowMaterials.lamp} castShadow />
			<RoomMesh node={nodes.MCHotBar} material={glowMaterials.screen} castShadow receiveShadow>
				<RoomMesh node={nodes.MCHeart} material={glowMaterials.screen} castShadow />
				<RoomMesh node={nodes.MCHunger} material={glowMaterials.screen} castShadow />
				<RoomMesh node={nodes.MCXPBar} material={glowMaterials.screen} castShadow />
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
			<RoomMesh node={nodes.Speaker001} material={glowMaterials.standard} castShadow />
			<RoomMesh node={nodes.Speaker002} material={glowMaterials.standard} castShadow />
			<RoomMesh node={nodes.HeadSetHolder} material={glowMaterials.standard} castShadow />
			<RoomMesh node={nodes.HeadSet003} material={glowMaterials.subtle} castShadow />
		</group>
	);
}

/* -------------------------------------------------------------
 * 5. Room Storage & Appliances (Shelves with LED strips, Mini-Fridge)
 * ------------------------------------------------------------*/
export function RoomFurniture({ nodes, glowMaterials }: RoomSubComponentProps) {
	return (
		<group name="RoomFurniture">
			<RoomMesh node={nodes.Fridge} material={glowMaterials.standard} castShadow receiveShadow />
			<RoomMesh node={nodes.Shelves} material={glowMaterials.standard} castShadow receiveShadow>
				<RoomMesh node={nodes.LED014} material={glowMaterials.ledStrips} castShadow />
				<RoomMesh node={nodes.LED015} material={glowMaterials.ledStrips} castShadow />
				<RoomMesh node={nodes.LED016} material={glowMaterials.ledStrips} castShadow />
				<RoomMesh node={nodes.LED017} material={glowMaterials.ledStrips} castShadow />
				<RoomMesh node={nodes.LED018} material={glowMaterials.ledStrips} castShadow />
				<RoomMesh node={nodes.LED019} material={glowMaterials.ledStrips} castShadow />
				<RoomMesh node={nodes.LED020} material={glowMaterials.ledStrips} castShadow />
				<RoomMesh node={nodes.LED021} material={glowMaterials.ledStrips} castShadow />
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
			<RoomMesh node={nodes.ShelveConsole} material={glowMaterials.standard} castShadow receiveShadow>
				<RoomMesh node={nodes.LED010} material={glowMaterials.ledStrips} castShadow />
				<RoomMesh node={nodes.LED011} material={glowMaterials.ledStrips} castShadow />
				<RoomMesh node={nodes.LED012} material={glowMaterials.ledStrips} castShadow />
				<RoomMesh node={nodes.LED013} material={glowMaterials.ledStrips} castShadow />
			</RoomMesh>
			<RoomMesh node={nodes.Shelve001} material={glowMaterials.standard} castShadow receiveShadow>
				<RoomMesh node={nodes.LED005} material={glowMaterials.ledStrips} castShadow />
			</RoomMesh>
			<RoomMesh node={nodes.Monitor004} material={glowMaterials.screen} castShadow receiveShadow>
				<RoomMesh node={nodes.LED006} material={glowMaterials.ledStrips} castShadow />
				<RoomMesh node={nodes.LED007} material={glowMaterials.ledStrips} castShadow />
				<RoomMesh node={nodes.LED008} material={glowMaterials.ledStrips} castShadow />
				<RoomMesh node={nodes.LED009} material={glowMaterials.ledStrips} castShadow />
			</RoomMesh>
			<RoomMesh node={nodes.MysteryBox} material={glowMaterials.lamp} castShadow receiveShadow />
			<RoomMesh node={nodes.Speaker003} material={glowMaterials.pcAccents} castShadow />
			<RoomMesh node={nodes.TVRemote} material={glowMaterials.standard} castShadow />
			<RoomMesh node={nodes.PSGameShelve} material={glowMaterials.standard} castShadow receiveShadow />
			<RoomMesh node={nodes.PSGameShelveSupport} material={glowMaterials.standard} castShadow receiveShadow />
			<RoomMesh node={nodes.LedPSTriangle} material={glowMaterials.neonSigns} castShadow />
			<RoomMesh node={nodes.LedPSCircle} material={glowMaterials.neonSigns} castShadow />
			<RoomMesh node={nodes.LedPSCross} material={glowMaterials.neonSigns} castShadow />
			<RoomMesh node={nodes.LedPSSquare} material={glowMaterials.neonSigns} castShadow />
			<RoomMesh node={nodes.PS1} material={glowMaterials.subtle} castShadow receiveShadow />
			<RoomMesh node={nodes.PS2} material={glowMaterials.subtle} castShadow receiveShadow />
			<RoomMesh node={nodes.PS3} material={glowMaterials.subtle} castShadow receiveShadow />
			<RoomMesh node={nodes.PS4} material={glowMaterials.subtle} castShadow receiveShadow />
			<RoomMesh node={nodes.PS5} material={glowMaterials.subtle} castShadow receiveShadow />
			<RoomMesh node={nodes.SwitchSupport} material={glowMaterials.standard} castShadow receiveShadow />
			<RoomMesh node={nodes.SwitchDock} material={glowMaterials.standard} castShadow receiveShadow />
			<RoomMesh node={nodes.SwitchTablet} material={glowMaterials.screen} castShadow receiveShadow />
			<RoomMesh node={nodes.SwitchJoyConRight} material={glowMaterials.standard} castShadow receiveShadow />
			<RoomMesh node={nodes.SwitchJoyConLeft} material={glowMaterials.standard} castShadow receiveShadow />
			<RoomMesh node={nodes.SwitchJoyConRight001} material={glowMaterials.standard} castShadow receiveShadow />
			<RoomMesh node={nodes.SwitchJoyConLeft001} material={glowMaterials.standard} castShadow receiveShadow />
			<RoomMesh node={nodes.SwitchJoyConRight002} material={glowMaterials.standard} castShadow receiveShadow />
			<RoomMesh node={nodes.SwitchJoyConLeft002} material={glowMaterials.standard} castShadow receiveShadow />
			<RoomMesh node={nodes.AVR002} material={glowMaterials.standard} castShadow receiveShadow />
			<RoomMesh node={nodes.Rocket} material={glowMaterials.standard} castShadow receiveShadow />
		</group>
	);
}

/* -------------------------------------------------------------
 * Composite Room Component
 * ------------------------------------------------------------*/
export function Room(props: ThreeElements["group"]) {
	const { nodes, materials } = useGLTF(MODEL_URL) as unknown as GLTFResult;

	// Create cloned materials for each emission tier
	const glowMaterials = useMemo(() => {
		return createGlowMaterials(materials.Imphezia);
	}, [materials.Imphezia]);

	return (
		<group {...props} dispose={null}>
			<RoomStructure nodes={nodes} glowMaterials={glowMaterials} />
			<DeskStation nodes={nodes} glowMaterials={glowMaterials} />
			<ComputerSetup nodes={nodes} glowMaterials={glowMaterials} />
			<AudioEquipment nodes={nodes} glowMaterials={glowMaterials} />
			<RoomFurniture nodes={nodes} glowMaterials={glowMaterials} />
			<ChessArea nodes={nodes} glowMaterials={glowMaterials} />
			<GamingConsoleZone nodes={nodes} glowMaterials={glowMaterials} />
		</group>
	);
}

useGLTF.preload(MODEL_URL);
export default Room;
