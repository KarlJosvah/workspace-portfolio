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

type GLTFResult = GLTF & {
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
		Wall: THREE.Mesh;
		DeskDrawer: THREE.Mesh;
		Desk: THREE.Mesh;
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
		ChessWhiteRook001: THREE.Mesh;
		ChessWhiteKnight001: THREE.Mesh;
		ChessWhiteBishop001: THREE.Mesh;
		ChessWhiteQueen: THREE.Mesh;
		ChessWhiteKing: THREE.Mesh;
		ChessWhitePawn001: THREE.Mesh;
		ChessWhiteRook002: THREE.Mesh;
		ChessWhiteKnight002: THREE.Mesh;
		ChessWhiteBishop002: THREE.Mesh;
		ChessWhitePawn002: THREE.Mesh;
		ChessWhitePawn003: THREE.Mesh;
		ChessWhitePawn004: THREE.Mesh;
		ChessWhitePawn005: THREE.Mesh;
		ChessWhitePawn006: THREE.Mesh;
		ChessWhitePawn007: THREE.Mesh;
		ChessWhitePawn008: THREE.Mesh;
		ChessWhiteRook003: THREE.Mesh;
		ChessBlackKnight001: THREE.Mesh;
		ChessBlackBishop001: THREE.Mesh;
		ChessWhiteQueen001: THREE.Mesh;
		ChessBlackKing: THREE.Mesh;
		ChessBlackPawn001: THREE.Mesh;
		ChessWhiteRook004: THREE.Mesh;
		ChessBlackKnight002: THREE.Mesh;
		ChessBlackBishop002: THREE.Mesh;
		ChessBlackPawn002: THREE.Mesh;
		ChessBlackPawn003: THREE.Mesh;
		ChessBlackPawn004: THREE.Mesh;
		ChessBlackPawn005: THREE.Mesh;
		ChessBlackPawn006: THREE.Mesh;
		ChessBlackPawn007: THREE.Mesh;
		ChessBlackPawn008: THREE.Mesh;
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
	};
	materials: {
		Imphezia: THREE.MeshStandardMaterial;
	};
};

interface RoomSubComponentProps {
	nodes: GLTFResult["nodes"];
	glowMaterials: GlowMaterials;
}

/* -------------------------------------------------------------
 * 1. Room Architecture & Structure (Floor, Walls, Ceiling, Rugs & Wall Art)
 * ------------------------------------------------------------*/
export function RoomStructure({ nodes, glowMaterials }: RoomSubComponentProps) {
	return (
		<group name="RoomStructure">
			<mesh
				name="Floor"
				geometry={nodes.Floor.geometry}
				material={glowMaterials.standard}
				position={[-2.712, -0.49, 3.358]}
				receiveShadow
			/>
			<mesh
				name="Wall"
				geometry={nodes.Wall.geometry}
				material={glowMaterials.standard}
				position={[-2.712, 1.111, 3.358]}
				receiveShadow
			/>
			<mesh
				name="Ceiling"
				geometry={nodes.Ceiling.geometry}
				material={glowMaterials.standard}
				position={[-2.712, 2.647, 3.358]}
				receiveShadow
			/>
			<mesh
				name="CarpetDesk"
				geometry={nodes.CarpetDesk.geometry}
				material={glowMaterials.standard}
				position={[-1.268, -0.385, 0.814]}
				receiveShadow
			/>
			<mesh
				name="CarpetChess"
				geometry={nodes.CarpetChess.geometry}
				material={glowMaterials.standard}
				position={[-1.255, -0.385, 6.284]}
				receiveShadow
			/>
			<mesh
				name="WingsofFreedomRight"
				geometry={nodes.WingsofFreedomRight.geometry}
				material={glowMaterials.wallArt}
				position={[-2.225, 1.396, -0.378]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="WingsofFreedomLeft"
				geometry={nodes.WingsofFreedomLeft.geometry}
				material={glowMaterials.wallArt}
				position={[-2.356, 1.417, -0.378]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="DoorFrame"
				geometry={nodes.DoorFrame.geometry}
				material={glowMaterials.standard}
				position={[-4.46, 0.71, 7.216]}
				castShadow
				receiveShadow
			>
				<mesh
					name="Door"
					geometry={nodes.Door.geometry}
					material={glowMaterials.standard}
					position={[-0.118, -0.005, 0.059]}
					castShadow
					receiveShadow
				/>
				<mesh
					name="DoorAxes"
					geometry={nodes.DoorAxes.geometry}
					material={glowMaterials.standard}
					position={[-0.523, -0.096, 0.033]}
					castShadow
					receiveShadow
				/>
				<mesh
					name="DoorHandle"
					geometry={nodes.DoorHandle.geometry}
					material={glowMaterials.standard}
					position={[0.383, -0.036, 0.009]}
					castShadow
					receiveShadow
				/>
			</mesh>
			<mesh
				name="CeilingLamp001"
				geometry={nodes.CeilingLamp001.geometry}
				material={glowMaterials.lamp}
				position={[-4.572, 2.595, 1.752]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="CeilingLamp002"
				geometry={nodes.CeilingLamp002.geometry}
				material={glowMaterials.lamp}
				position={[-0.851, 2.595, 1.752]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="CeilingLamp003"
				geometry={nodes.CeilingLamp003.geometry}
				material={glowMaterials.lamp}
				position={[-4.572, 2.595, 4.965]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="CeilingLamp004"
				geometry={nodes.CeilingLamp004.geometry}
				material={glowMaterials.lamp}
				position={[-0.851, 2.595, 4.965]}
				castShadow
				receiveShadow
			/>
		</group>
	);
}

/* -------------------------------------------------------------
 * 2. Desk & Seating (Main Desk, Drawer with Edge LEDs, Mat, Chair, Props)
 * ------------------------------------------------------------*/
export function DeskStation({ nodes, glowMaterials }: RoomSubComponentProps) {
	return (
		<group name="DeskStation">
			<mesh
				name="DeskDrawer"
				geometry={nodes.DeskDrawer.geometry}
				material={glowMaterials.standard}
				position={[-0.742, -0.024, 0.524]}
				castShadow
				receiveShadow
			>
				<mesh
					name="Desk"
					geometry={nodes.Desk.geometry}
					material={glowMaterials.standard}
					position={[0.036, 0.39, -0.051]}
					castShadow
					receiveShadow
				/>
				<mesh
					name="LED001"
					geometry={nodes.LED001.geometry}
					material={glowMaterials.ledStrips}
					position={[-0.866, 0.361, -0.139]}
					castShadow
				/>
				<mesh
					name="LED002"
					geometry={nodes.LED002.geometry}
					material={glowMaterials.ledStrips}
					position={[-2.079, 0.361, -0.529]}
					castShadow
				/>
				<mesh
					name="LED003"
					geometry={nodes.LED003.geometry}
					material={glowMaterials.ledStrips}
					position={[0.357, 0.361, 0.611]}
					castShadow
				/>
				<mesh
					name="LED004"
					geometry={nodes.LED004.geometry}
					material={glowMaterials.ledStrips}
					position={[0.747, 0.361, 1.361]}
					castShadow
				/>
			</mesh>
			<mesh
				name="DeskMat"
				geometry={nodes.DeskMat.geometry}
				material={glowMaterials.standard}
				position={[-0.761, 0.392, 0.133]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="Chair"
				geometry={nodes.Chair.geometry}
				material={glowMaterials.standard}
				position={[-1.146, -0.061, 0.992]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="TrashCan"
				geometry={nodes.TrashCan.geometry}
				material={glowMaterials.standard}
				position={[-0.08, -0.205, 1.412]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="Rubik"
				geometry={nodes.Rubik.geometry}
				material={glowMaterials.standard}
				position={[-1.208, 0.425, 0.131]}
				castShadow
			/>
			<mesh
				name="Mug"
				geometry={nodes.Mug.geometry}
				material={glowMaterials.standard}
				position={[-0.091, 0.443, 0.593]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="Coaster"
				geometry={nodes.Coaster.geometry}
				material={glowMaterials.standard}
				position={[-0.091, 0.391, 0.593]}
				castShadow
			/>
		</group>
	);
}

/* -------------------------------------------------------------
 * 3. Computer Setup & Monitors (PC Tower, Triple Monitors, Laptop)
 * ------------------------------------------------------------*/
export function ComputerSetup({ nodes, glowMaterials }: RoomSubComponentProps) {
	return (
		<group name="ComputerSetup">
			<mesh
				name="PCTower"
				geometry={nodes.PCTower.geometry}
				material={glowMaterials.pcAccents}
				position={[-2.29, 0.74, -0.19]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="Monitor001"
				geometry={nodes.Monitor001.geometry}
				material={glowMaterials.screen}
				position={[-0.693, 0.779, -0.099]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="Monitor002"
				geometry={nodes.Monitor002.geometry}
				material={glowMaterials.screen}
				position={[0.034, 0.708, 0.542]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="Monitor003"
				geometry={nodes.Monitor003.geometry}
				material={glowMaterials.screen}
				position={[-1.544, 0.795, -0.025]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="LapTop"
				geometry={nodes.LapTop.geometry}
				material={glowMaterials.screen}
				position={[0.13, 0.537, 1.182]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="CoolingPad"
				geometry={nodes.CoolingPad.geometry}
				material={glowMaterials.subtle}
				position={[0.058, 0.415, 1.155]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="Keyboard"
				geometry={nodes.Keyboard.geometry}
				material={glowMaterials.subtle}
				position={[-0.734, 0.406, 0.183]}
				castShadow
			/>
			<mesh
				name="Mouse"
				geometry={nodes.Mouse.geometry}
				material={glowMaterials.subtle}
				position={[-0.301, 0.415, 0.199]}
				castShadow
			/>
			<mesh
				name="Light"
				geometry={nodes.Light.geometry}
				material={glowMaterials.lamp}
				position={[0.079, 1.405, -0.099]}
				castShadow
			/>
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
			<mesh
				name="Speaker001"
				geometry={nodes.Speaker001.geometry}
				material={glowMaterials.standard}
				position={[-0.056, 0.178, 2.314]}
				castShadow
			/>
			<mesh
				name="Speaker002"
				geometry={nodes.Speaker002.geometry}
				material={glowMaterials.standard}
				position={[-3.116, 0.162, 0.241]}
				castShadow
			/>
			<mesh
				name="HeadSetHolder"
				geometry={nodes.HeadSetHolder.geometry}
				material={glowMaterials.standard}
				position={[-0.005, 0.489, 1.602]}
				castShadow
			/>
			<mesh
				name="HeadSet003"
				geometry={nodes.HeadSet003.geometry}
				material={glowMaterials.subtle}
				position={[-0.001, 0.522, 1.604]}
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
			<mesh
				name="Fridge"
				geometry={nodes.Fridge.geometry}
				material={glowMaterials.standard}
				position={[0.032, 0.275, 4.639]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="Shelves"
				geometry={nodes.Shelves.geometry}
				material={glowMaterials.standard}
				position={[0.205, 0.859, 3.319]}
				castShadow
				receiveShadow
			>
				<mesh
					name="LED014"
					geometry={nodes.LED014.geometry}
					material={glowMaterials.ledStrips}
					position={[0.16, 0, 0.643]}
					castShadow
				/>
				<mesh
					name="LED015"
					geometry={nodes.LED015.geometry}
					material={glowMaterials.ledStrips}
					position={[0.16, 0, -0.643]}
					castShadow
				/>
				<mesh
					name="LED016"
					geometry={nodes.LED016.geometry}
					material={glowMaterials.ledStrips}
					position={[0.16, 1.224, 0]}
					castShadow
				/>
				<mesh
					name="LED017"
					geometry={nodes.LED017.geometry}
					material={glowMaterials.ledStrips}
					position={[0.16, 0.766, 0]}
					castShadow
				/>
				<mesh
					name="LED018"
					geometry={nodes.LED018.geometry}
					material={glowMaterials.ledStrips}
					position={[0.16, 0.27, 0]}
					castShadow
				/>
				<mesh
					name="LED019"
					geometry={nodes.LED019.geometry}
					material={glowMaterials.ledStrips}
					position={[0.16, -0.225, 0]}
					castShadow
				/>
				<mesh
					name="LED020"
					geometry={nodes.LED020.geometry}
					material={glowMaterials.ledStrips}
					position={[0.16, -0.721, 0]}
					castShadow
				/>
				<mesh
					name="LED021"
					geometry={nodes.LED021.geometry}
					material={glowMaterials.ledStrips}
					position={[0.16, -1.224, 0]}
					castShadow
				/>
			</mesh>
		</group>
	);
}

/* -------------------------------------------------------------
 * 6. Interactive Chess Corner (Table, Board, Chairs & 32 Pieces)
 * ------------------------------------------------------------*/
export function ChessArea({ nodes, glowMaterials }: RoomSubComponentProps) {
	return (
		<group name="ChessArea">
			<mesh
				name="ChessBoard"
				geometry={nodes.ChessBoard.geometry}
				material={glowMaterials.subtle}
				position={[-1.204, 0.496, 6.322]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="ChessTable"
				geometry={nodes.ChessTable.geometry}
				material={glowMaterials.standard}
				position={[-1.204, 0.126, 6.322]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="ChessChair002"
				geometry={nodes.ChessChair002.geometry}
				material={glowMaterials.standard}
				position={[-0.286, 0.105, 6.316]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="ChessChair001"
				geometry={nodes.ChessChair001.geometry}
				material={glowMaterials.standard}
				position={[-2.196, 0.105, 6.316]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="ChessWhiteRook001"
				geometry={nodes.ChessWhiteRook001.geometry}
				material={glowMaterials.standard}
				position={[-1.415, 0.526, 6.112]}
				castShadow
			/>
			<mesh
				name="ChessWhiteKnight001"
				geometry={nodes.ChessWhiteKnight001.geometry}
				material={glowMaterials.standard}
				position={[-1.415, 0.531, 6.172]}
				castShadow
			/>
			<mesh
				name="ChessWhiteBishop001"
				geometry={nodes.ChessWhiteBishop001.geometry}
				material={glowMaterials.standard}
				position={[-1.415, 0.536, 6.232]}
				castShadow
			/>
			<mesh
				name="ChessWhiteQueen"
				geometry={nodes.ChessWhiteQueen.geometry}
				material={glowMaterials.standard}
				position={[-1.415, 0.541, 6.292]}
				castShadow
			/>
			<mesh
				name="ChessWhiteKing"
				geometry={nodes.ChessWhiteKing.geometry}
				material={glowMaterials.standard}
				position={[-1.415, 0.549, 6.352]}
				castShadow
			/>
			<mesh
				name="ChessWhitePawn001"
				geometry={nodes.ChessWhitePawn001.geometry}
				material={glowMaterials.standard}
				position={[-1.354, 0.524, 6.112]}
				castShadow
			/>
			<mesh
				name="ChessWhiteRook002"
				geometry={nodes.ChessWhiteRook002.geometry}
				material={glowMaterials.standard}
				position={[-1.415, 0.526, 6.532]}
				castShadow
			/>
			<mesh
				name="ChessWhiteKnight002"
				geometry={nodes.ChessWhiteKnight002.geometry}
				material={glowMaterials.standard}
				position={[-1.415, 0.531, 6.472]}
				castShadow
			/>
			<mesh
				name="ChessWhiteBishop002"
				geometry={nodes.ChessWhiteBishop002.geometry}
				material={glowMaterials.standard}
				position={[-1.415, 0.536, 6.412]}
				castShadow
			/>
			<mesh
				name="ChessWhitePawn002"
				geometry={nodes.ChessWhitePawn002.geometry}
				material={glowMaterials.standard}
				position={[-1.354, 0.524, 6.171]}
				castShadow
			/>
			<mesh
				name="ChessWhitePawn003"
				geometry={nodes.ChessWhitePawn003.geometry}
				material={glowMaterials.standard}
				position={[-1.354, 0.524, 6.231]}
				castShadow
			/>
			<mesh
				name="ChessWhitePawn004"
				geometry={nodes.ChessWhitePawn004.geometry}
				material={glowMaterials.standard}
				position={[-1.354, 0.524, 6.291]}
				castShadow
			/>
			<mesh
				name="ChessWhitePawn005"
				geometry={nodes.ChessWhitePawn005.geometry}
				material={glowMaterials.standard}
				position={[-1.354, 0.524, 6.351]}
				castShadow
			/>
			<mesh
				name="ChessWhitePawn006"
				geometry={nodes.ChessWhitePawn006.geometry}
				material={glowMaterials.standard}
				position={[-1.354, 0.524, 6.411]}
				castShadow
			/>
			<mesh
				name="ChessWhitePawn007"
				geometry={nodes.ChessWhitePawn007.geometry}
				material={glowMaterials.standard}
				position={[-1.354, 0.524, 6.471]}
				castShadow
			/>
			<mesh
				name="ChessWhitePawn008"
				geometry={nodes.ChessWhitePawn008.geometry}
				material={glowMaterials.standard}
				position={[-1.354, 0.524, 6.531]}
				castShadow
			/>
			<mesh
				name="ChessWhiteRook003"
				geometry={nodes.ChessWhiteRook003.geometry}
				material={glowMaterials.standard}
				position={[-0.992, 0.526, 6.532]}
				castShadow
			/>
			<mesh
				name="ChessBlackKnight001"
				geometry={nodes.ChessBlackKnight001.geometry}
				material={glowMaterials.standard}
				position={[-0.992, 0.531, 6.472]}
				castShadow
			/>
			<mesh
				name="ChessBlackBishop001"
				geometry={nodes.ChessBlackBishop001.geometry}
				material={glowMaterials.standard}
				position={[-0.992, 0.536, 6.411]}
				castShadow
			/>
			<mesh
				name="ChessWhiteQueen001"
				geometry={nodes.ChessWhiteQueen001.geometry}
				material={glowMaterials.standard}
				position={[-0.992, 0.541, 6.351]}
				castShadow
			/>
			<mesh
				name="ChessBlackKing"
				geometry={nodes.ChessBlackKing.geometry}
				material={glowMaterials.standard}
				position={[-0.992, 0.549, 6.291]}
				castShadow
			/>
			<mesh
				name="ChessBlackPawn001"
				geometry={nodes.ChessBlackPawn001.geometry}
				material={glowMaterials.standard}
				position={[-1.053, 0.524, 6.532]}
				castShadow
			/>
			<mesh
				name="ChessWhiteRook004"
				geometry={nodes.ChessWhiteRook004.geometry}
				material={glowMaterials.standard}
				position={[-0.992, 0.526, 6.111]}
				castShadow
			/>
			<mesh
				name="ChessBlackKnight002"
				geometry={nodes.ChessBlackKnight002.geometry}
				material={glowMaterials.standard}
				position={[-0.992, 0.531, 6.171]}
				castShadow
			/>
			<mesh
				name="ChessBlackBishop002"
				geometry={nodes.ChessBlackBishop002.geometry}
				material={glowMaterials.standard}
				position={[-0.992, 0.536, 6.231]}
				castShadow
			/>
			<mesh
				name="ChessBlackPawn002"
				geometry={nodes.ChessBlackPawn002.geometry}
				material={glowMaterials.standard}
				position={[-1.053, 0.524, 6.471]}
				castShadow
			/>
			<mesh
				name="ChessBlackPawn003"
				geometry={nodes.ChessBlackPawn003.geometry}
				material={glowMaterials.standard}
				position={[-1.053, 0.524, 6.411]}
				castShadow
			/>
			<mesh
				name="ChessBlackPawn004"
				geometry={nodes.ChessBlackPawn004.geometry}
				material={glowMaterials.standard}
				position={[-1.053, 0.524, 6.35]}
				castShadow
			/>
			<mesh
				name="ChessBlackPawn005"
				geometry={nodes.ChessBlackPawn005.geometry}
				material={glowMaterials.standard}
				position={[-1.053, 0.524, 6.29]}
				castShadow
			/>
			<mesh
				name="ChessBlackPawn006"
				geometry={nodes.ChessBlackPawn006.geometry}
				material={glowMaterials.standard}
				position={[-1.053, 0.524, 6.229]}
				castShadow
			/>
			<mesh
				name="ChessBlackPawn007"
				geometry={nodes.ChessBlackPawn007.geometry}
				material={glowMaterials.standard}
				position={[-1.053, 0.524, 6.169]}
				castShadow
			/>
			<mesh
				name="ChessBlackPawn008"
				geometry={nodes.ChessBlackPawn008.geometry}
				material={glowMaterials.standard}
				position={[-1.053, 0.524, 6.108]}
				castShadow
			/>
		</group>
	);
}

/* -------------------------------------------------------------
 * 7. Gaming & Entertainment Wall (TV Console, TV with Backlight, Soundbar, Remote, Game Shelves, PlayStation Collection, Nintendo Switch & LED Signs)
 * ------------------------------------------------------------*/
export function GamingConsoleZone({
	nodes,
	glowMaterials,
}: RoomSubComponentProps) {
	return (
		<group name="GamingConsoleZone">
			<mesh
				name="ShelveConsole"
				geometry={nodes.ShelveConsole.geometry}
				material={glowMaterials.standard}
				position={[-4.705, 0.01, -0.149]}
				castShadow
				receiveShadow
			>
				<mesh
					name="LED010"
					geometry={nodes.LED010.geometry}
					material={glowMaterials.ledStrips}
					position={[-1.074, 0, -0.206]}
					castShadow
				/>
				<mesh
					name="LED011"
					geometry={nodes.LED011.geometry}
					material={glowMaterials.ledStrips}
					position={[0.676, 0, -0.206]}
					castShadow
				/>
				<mesh
					name="LED012"
					geometry={nodes.LED012.geometry}
					material={glowMaterials.ledStrips}
					position={[-0.199, 0.365, -0.206]}
					castShadow
				/>
				<mesh
					name="LED013"
					geometry={nodes.LED013.geometry}
					material={glowMaterials.ledStrips}
					position={[-0.199, -0.365, -0.206]}
					castShadow
				/>
			</mesh>
			<mesh
				name="Shelve001"
				geometry={nodes.Shelve001.geometry}
				material={glowMaterials.standard}
				position={[-4.813, 1.569, -0.24]}
				castShadow
				receiveShadow
			>
				<mesh
					name="LED005"
					geometry={nodes.LED005.geometry}
					material={glowMaterials.ledStrips}
					position={[0, -0.03, 0.145]}
					castShadow
				/>
			</mesh>
			<mesh
				name="Monitor004"
				geometry={nodes.Monitor004.geometry}
				material={glowMaterials.screen}
				position={[-4.813, 0.9, -0.268]}
				castShadow
				receiveShadow
			>
				<mesh
					name="LED006"
					geometry={nodes.LED006.geometry}
					material={glowMaterials.ledStrips}
					position={[0, 0.45, -0.035]}
					castShadow
				/>
				<mesh
					name="LED007"
					geometry={nodes.LED007.geometry}
					material={glowMaterials.ledStrips}
					position={[0.829, 0, -0.035]}
					castShadow
				/>
				<mesh
					name="LED008"
					geometry={nodes.LED008.geometry}
					material={glowMaterials.ledStrips}
					position={[0, -0.45, -0.035]}
					castShadow
				/>
				<mesh
					name="LED009"
					geometry={nodes.LED009.geometry}
					material={glowMaterials.ledStrips}
					position={[-0.829, 0, -0.035]}
					castShadow
				/>
			</mesh>
			<mesh
				name="MysteryBox"
				geometry={nodes.MysteryBox.geometry}
				material={glowMaterials.neonSigns}
				position={[-3.963, 1.699, -0.211]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="Speaker003"
				geometry={nodes.Speaker003.geometry}
				material={glowMaterials.standard}
				position={[-4.813, 0.736, -0.335]}
				castShadow
			/>
			<mesh
				name="TVRemote"
				geometry={nodes.TVRemote.geometry}
				material={glowMaterials.standard}
				position={[-4.141, 0.42, -0.038]}
				castShadow
			/>
			<mesh
				name="PSGameShelve"
				geometry={nodes.PSGameShelve.geometry}
				material={glowMaterials.standard}
				position={[-3.603, -0.002, -0.001]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="PSGameShelveSupport"
				geometry={nodes.PSGameShelveSupport.geometry}
				material={glowMaterials.standard}
				position={[-3.599, -0.004, -0.001]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="LedPSTriangle"
				geometry={nodes.LedPSTriangle.geometry}
				material={glowMaterials.neonSigns}
				position={[-3.919, 0.225, 0.135]}
				castShadow
			/>
			<mesh
				name="LedPSCircle"
				geometry={nodes.LedPSCircle.geometry}
				material={glowMaterials.neonSigns}
				position={[-3.919, 0.082, 0.135]}
				castShadow
			/>
			<mesh
				name="LedPSCross"
				geometry={nodes.LedPSCross.geometry}
				material={glowMaterials.neonSigns}
				position={[-3.919, -0.066, 0.135]}
				castShadow
			/>
			<mesh
				name="LedPSSquare"
				geometry={nodes.LedPSSquare.geometry}
				material={glowMaterials.neonSigns}
				position={[-3.919, -0.235, 0.135]}
				castShadow
			/>
			<mesh
				name="PS1"
				geometry={nodes.PS1.geometry}
				material={glowMaterials.subtle}
				position={[-5.345, -0.328, -0.099]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="PS2"
				geometry={nodes.PS2.geometry}
				material={glowMaterials.subtle}
				position={[-4.985, -0.321, -0.099]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="PS3"
				geometry={nodes.PS3.geometry}
				material={glowMaterials.subtle}
				position={[-4.607, -0.311, -0.099]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="PS4"
				geometry={nodes.PS4.geometry}
				material={glowMaterials.subtle}
				position={[-4.302, -0.222, -0.086]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="PS5"
				geometry={nodes.PS5.geometry}
				material={glowMaterials.subtle}
				position={[-4.119, -0.165, -0.086]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="SwitchSupport"
				geometry={nodes.SwitchSupport.geometry}
				material={glowMaterials.standard}
				position={[-3.585, 0.848, -0.336]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="SwitchDock"
				geometry={nodes.SwitchDock.geometry}
				material={glowMaterials.standard}
				position={[-3.585, 0.916, -0.338]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="SwitchTablet"
				geometry={nodes.SwitchTablet.geometry}
				material={glowMaterials.screen}
				position={[-3.585, 0.942, -0.338]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="SwitchJoyConRight"
				geometry={nodes.SwitchJoyConRight.geometry}
				material={glowMaterials.standard}
				position={[-3.481, 0.942, -0.338]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="SwitchJoyConLeft"
				geometry={nodes.SwitchJoyConLeft.geometry}
				material={glowMaterials.standard}
				position={[-3.691, 0.942, -0.338]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="SwitchJoyConRight001"
				geometry={nodes.SwitchJoyConRight001.geometry}
				material={glowMaterials.standard}
				position={[-3.484, 0.787, -0.358]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="SwitchJoyConLeft001"
				geometry={nodes.SwitchJoyConLeft001.geometry}
				material={glowMaterials.standard}
				position={[-3.688, 0.787, -0.358]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="SwitchJoyConRight002"
				geometry={nodes.SwitchJoyConRight002.geometry}
				material={glowMaterials.standard}
				position={[-3.484, 0.787, -0.326]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="SwitchJoyConLeft002"
				geometry={nodes.SwitchJoyConLeft002.geometry}
				material={glowMaterials.standard}
				position={[-3.688, 0.787, -0.326]}
				castShadow
				receiveShadow
			/>
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
