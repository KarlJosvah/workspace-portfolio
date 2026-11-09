import { useMemo } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import type { GLTF } from "three-stdlib";
import {
	createGlowMaterials,
	type GlowMaterials,
} from "@/constants/emissionConfig.ts";

export const MODEL_URL = "/assets/models/room-portfolio.glb";

export type GLTFResult = GLTF & {
	nodes: {
		Floor: THREE.Mesh;
		DoorFrame: THREE.Mesh;
		Door: THREE.Mesh;
		DoorAxes: THREE.Mesh;
		DoorHandle: THREE.Mesh;
		CeilingLamp001: THREE.Mesh;
		CeilingLamp002: THREE.Mesh;
		CeilingLamp003: THREE.Mesh;
		CeilingLamp004: THREE.Mesh;
		WingsofFreedomRight: THREE.Mesh;
		WingsofFreedomLeft: THREE.Mesh;
		Ceiling: THREE.Mesh;
		LEDCeiling : THREE.Mesh;
		Wall: THREE.Mesh;
		Desk: THREE.Mesh;
		DeskDrawer001: THREE.Mesh;
		DeskDrawer002: THREE.Mesh;
		DeskDrawer003: THREE.Mesh;
		LED001: THREE.Mesh;
		LED002: THREE.Mesh;
		LED003: THREE.Mesh;
		LED004: THREE.Mesh;
		Chair: THREE.Mesh;
		Speaker002: THREE.Mesh;
		Speaker001: THREE.Mesh;
		Light: THREE.Mesh;
		CarpetDesk: THREE.Mesh;
		TrashCan: THREE.Mesh;
		Coaster: THREE.Mesh;
		HeadSetHolder: THREE.Mesh;
		HeadSet003: THREE.Mesh;
		Mug: THREE.Mesh;
		Rubik: THREE.Mesh;
		LapTop: THREE.Mesh;
		CoolingPad: THREE.Mesh;
		Monitor002: THREE.Mesh;
		Monitor001: THREE.Mesh;
		Monitor003: THREE.Mesh;
		Keyboard: THREE.Mesh;
		Mouse: THREE.Mesh;
		PCTower: THREE.Mesh;
		DeskMat: THREE.Mesh;
		ChessBoard: THREE.Mesh;
		ChessTable: THREE.Mesh;
		ChessChair002: THREE.Mesh;
		ChessChair001: THREE.Mesh;
		CarpetChess: THREE.Mesh;
		Shelves: THREE.Mesh;
		LED014: THREE.Mesh;
		LED015: THREE.Mesh;
		LED016: THREE.Mesh;
		LED017: THREE.Mesh;
		LED018: THREE.Mesh;
		LED019: THREE.Mesh;
		LED020: THREE.Mesh;
		LED021: THREE.Mesh;
		Fridge: THREE.Mesh;
		ShelveConsole: THREE.Mesh;
		LED010: THREE.Mesh;
		LED011: THREE.Mesh;
		LED012: THREE.Mesh;
		LED013: THREE.Mesh;
		Shelve001: THREE.Mesh;
		LED005: THREE.Mesh;
		MysteryBox: THREE.Mesh;
		Monitor004: THREE.Mesh;
		LED006: THREE.Mesh;
		LED007: THREE.Mesh;
		LED008: THREE.Mesh;
		LED009: THREE.Mesh;
		Speaker003: THREE.Mesh;
		TVRemote: THREE.Mesh;
		LedPSTriangle: THREE.Mesh;
		LedPSCircle: THREE.Mesh;
		LedPSCross: THREE.Mesh;
		LedPSSquare: THREE.Mesh;
		PS1: THREE.Mesh;
		PS2: THREE.Mesh;
		PS3: THREE.Mesh;
		PS4: THREE.Mesh;
		PS5: THREE.Mesh;
		SwitchSupport: THREE.Mesh;
		SwitchDock: THREE.Mesh;
		SwitchTablet: THREE.Mesh;
		SwitchJoyConRight: THREE.Mesh;
		SwitchJoyConLeft: THREE.Mesh;
		SwitchJoyConRight001: THREE.Mesh;
		SwitchJoyConLeft001: THREE.Mesh;
		SwitchJoyConRight002: THREE.Mesh;
		SwitchJoyConLeft002: THREE.Mesh;
		PSGameShelve: THREE.Mesh;
		PSGameShelveSupport: THREE.Mesh;
		DigitalAnalogWallClock: THREE.Mesh;
		MCHotBar: THREE.Mesh;
		MCHeart: THREE.Mesh;
		MCHunger: THREE.Mesh;
		MCXPBar: THREE.Mesh;
		AVR001: THREE.Mesh;
		AVR002: THREE.Mesh;
		Rocket: THREE.Mesh;
		[key: string]: THREE.Mesh;
	};
	materials: {
		Imphezia: THREE.MeshStandardMaterial;
	};
};

interface RoomSubComponentProps {
	nodes: GLTFResult["nodes"];
	glowMaterials: GlowMaterials;
}

type RoomMeshProps = ThreeElements["mesh"] & {
	node: THREE.Mesh;
	material?: THREE.Material;
};

/**
 * Reusable mesh wrapper that automatically reads geometry, position, rotation,
 * and scale directly from the loaded GLB node, while allowing optional prop overrides.
 */
export function RoomMesh({
	node,
	material,
	position,
	rotation,
	scale,
	name,
	children,
	...rest
}: RoomMeshProps) {
	return (
		<mesh
			name={name ?? node.name}
			geometry={node.geometry}
			material={material}
			position={position ?? node.position}
			rotation={rotation ?? node.rotation}
			scale={scale ?? node.scale}
			{...rest}
		>
			{children}
		</mesh>
	);
}

interface ClockMeshArrays {
	hours: THREE.Mesh[];
	seconds: THREE.Mesh[];
	digits: THREE.Mesh[];
}

/**
 * Dynamically organizes the hundreds of clock children into three arrays:
 * - hours: Digital.Clock.Hour.01 - 12
 * - seconds: Digital.Clock.Second.00 - 59
 * - digits: Digital.Clock.Digit.* and Digital.Clock.Colon
 */
function getClockMeshes(nodes: GLTFResult["nodes"]): ClockMeshArrays {
	const clock = nodes.DigitalAnalogWallClock;
	const children = (clock?.children ?? []) as THREE.Mesh[];
	const source =
		children.length > 0
			? children
			: (Object.values(nodes) as THREE.Mesh[]).filter((n) =>
					n?.name?.startsWith("DigitalClock"),
			  );

	return {
		hours: source.filter((c) => c.name.includes("Hour")),
		seconds: source.filter((c) => c.name.includes("Second")),
		digits: source.filter(
			(c) => c.name.includes("Digit") || c.name.includes("Colon"),
		),
	};
}

export function WallClock({ nodes, glowMaterials }: RoomSubComponentProps) {
	const { hours, seconds, digits } = useMemo(
		() => getClockMeshes(nodes),
		[nodes],
	);

	return (
		<RoomMesh
			node={nodes.DigitalAnalogWallClock}
			material={glowMaterials.standard}
			castShadow
			receiveShadow
		>
			{digits.map((node) => (
				<RoomMesh
					key={node.name}
					node={node}
					material={glowMaterials.wallArt}
				/>
			))}
			{hours.map((node) => (
				<RoomMesh
					key={node.name}
					node={node}
					material={glowMaterials.wallArt}
				/>
			))}
			{seconds.map((node) => (
				<RoomMesh
					key={node.name}
					node={node}
					material={glowMaterials.wallArt}
				/>
			))}
		</RoomMesh>
	);
}

interface TriangleLEDArrays {
	all: THREE.Mesh[];
	cyan: THREE.Mesh[];
	white: THREE.Mesh[];
}

/**
 * Dynamically discovers triangular wall LED panels (Nanoleaf-style modular tiles)
 * and organizes them into arrays by color or as a unified collection.
 */
function getTriangleWallLEDs(nodes: GLTFResult["nodes"]): TriangleLEDArrays {
	const all = (Object.values(nodes) as THREE.Mesh[]).filter(
		(n) => n?.name && /^LED\.?Triangle/i.test(n.name),
	);

	return {
		all,
		cyan: all.filter((n) => /cyan/i.test(n.name)),
		white: all.filter((n) => /white/i.test(n.name)),
	};
}

export function TriangleWallLEDs({
	nodes,
	glowMaterials,
}: RoomSubComponentProps) {
	const { all: triangleLEDs } = useMemo(
		() => getTriangleWallLEDs(nodes),
		[nodes],
	);

	return (
		<group name="TriangleWallLEDs">
			{triangleLEDs.map((node) => (
				<RoomMesh
					key={node.name}
					node={node}
					material={glowMaterials.lamp}
					castShadow
				/>
			))}
		</group>
	);
}

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
 * 6. Interactive Chess Corner (Table, Board, Chairs & 32 Pieces)
 * -------------------------------------------------------------*/
interface ChessPieceArrays {
	all: THREE.Mesh[];
	white: THREE.Mesh[];
	black: THREE.Mesh[];
}

/**
 * Dynamically resolves all chess piece meshes from the ChessBoard parent node,
 * falling back to scene graph search if needed.
 */
function getChessPieces(nodes: GLTFResult["nodes"]): ChessPieceArrays {
	const board = nodes.ChessBoard;
	const children = (board?.children ?? []) as THREE.Mesh[];
	const source =
		children.length > 0
			? children
			: (Object.values(nodes) as THREE.Mesh[]).filter(
					(n) => n?.name && /^Chess\.?(White|Black)/i.test(n.name),
			  );

	return {
		all: source,
		white: source.filter((p) => /white/i.test(p.name)),
		black: source.filter((p) => /black/i.test(p.name)),
	};
}

export function ChessArea({ nodes, glowMaterials }: RoomSubComponentProps) {
	const { all: chessPieces } = useMemo(
		() => getChessPieces(nodes),
		[nodes],
	);

	return (
		<group name="ChessArea">
			<RoomMesh
				node={nodes.ChessBoard}
				material={glowMaterials.subtle}
				castShadow
				receiveShadow
			>
				{chessPieces.map((piece) => (
					<RoomMesh
						key={piece.name}
						node={piece}
						material={glowMaterials.standard}
						castShadow
					/>
				))}
			</RoomMesh>
			<RoomMesh node={nodes.ChessTable} material={glowMaterials.standard} castShadow receiveShadow />
			<RoomMesh node={nodes.ChessChair002} material={glowMaterials.standard} castShadow receiveShadow />
			<RoomMesh node={nodes.ChessChair001} material={glowMaterials.standard} castShadow receiveShadow />
		</group>
	);
}

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
