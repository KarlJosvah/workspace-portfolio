import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import type { GLTF } from "three-stdlib";

export const MODEL_URL = "/assets/models/room-portfolio.glb";

type GLTFResult = GLTF & {
	nodes: {
		Desk: THREE.Mesh;
		Monitor002: THREE.Mesh;
		Monitor001: THREE.Mesh;
		Wall: THREE.Mesh;
		Monitor003: THREE.Mesh;
		LapTop: THREE.Mesh;
		CoolingPad: THREE.Mesh;
		Keyboard: THREE.Mesh;
		DeskCarpet: THREE.Mesh;
		Mouse: THREE.Mesh;
		Desk001: THREE.Mesh;
		Floor: THREE.Mesh;
		PCTower: THREE.Mesh;
		Chair: THREE.Mesh;
		Fridge: THREE.Mesh;
		Speaker: THREE.Mesh;
		Speaker001: THREE.Mesh;
		Shelve001: THREE.Mesh;
		Shelve: THREE.Mesh;
		Mug: THREE.Mesh;
		Coaster: THREE.Mesh;
		Light: THREE.Mesh;
		Carpet: THREE.Mesh;
		TrashCan: THREE.Mesh;
		HeadSetHolder: THREE.Mesh;
		HeadSet: THREE.Mesh;
		HeadSet001: THREE.Mesh;
		HeadSet002: THREE.Mesh;
	};
	materials: {
		Imphezia: THREE.MeshStandardMaterial;
	};
};

/* -------------------------------------------------------------
 * 1. Room Architecture & Structure (Floor, Walls, Rug)
 * ------------------------------------------------------------*/
export function RoomStructure({
	nodes,
	materials,
}: {
	nodes: GLTFResult["nodes"];
	materials: GLTFResult["materials"];
}) {
	return (
		<group name="RoomStructure">
			<mesh
				name="Floor"
				geometry={nodes.Floor.geometry}
				material={materials.Imphezia}
				position={[-2.938, -0.49, 2.536]}
				receiveShadow
			/>
			<mesh
				name="Wall"
				geometry={nodes.Wall.geometry}
				material={materials.Imphezia}
				position={[-1.762, 1.804, 1.494]}
				receiveShadow
			/>
			<mesh
				name="Carpet"
				geometry={nodes.Carpet.geometry}
				material={materials.Imphezia}
				position={[-1.268, -0.385, 0.814]}
				receiveShadow
			/>
		</group>
	);
}

/* -------------------------------------------------------------
 * 2. Desk & Seating (Main Desk, Extension, Chair, Mat)
 * ------------------------------------------------------------*/
export function DeskStation({
	nodes,
	materials,
}: {
	nodes: GLTFResult["nodes"];
	materials: GLTFResult["materials"];
}) {
	return (
		<group name="DeskStation">
			<mesh
				name="Desk"
				geometry={nodes.Desk.geometry}
				material={materials.Imphezia}
				position={[-0.707, 0.366, 0.472]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="Desk001"
				geometry={nodes.Desk001.geometry}
				material={materials.Imphezia}
				position={[-0.759, -0.024, 0.541]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="DeskCarpet"
				geometry={nodes.DeskCarpet.geometry}
				material={materials.Imphezia}
				position={[-0.761, 0.392, 0.133]}
				receiveShadow
			/>
			<mesh
				name="Chair"
				geometry={nodes.Chair.geometry}
				material={materials.Imphezia}
				position={[-1.146, -0.061, 0.992]}
				castShadow
				receiveShadow
			/>
		</group>
	);
}

/* -------------------------------------------------------------
 * 3. Computer Setup & Monitors (PC Tower, Triple Monitors, Laptop)
 * ------------------------------------------------------------*/
export function ComputerSetup({
	nodes,
	materials,
}: {
	nodes: GLTFResult["nodes"];
	materials: GLTFResult["materials"];
}) {
	return (
		<group name="ComputerSetup">
			<mesh
				name="PCTower"
				geometry={nodes.PCTower.geometry}
				material={materials.Imphezia}
				position={[-2.29, 0.74, -0.19]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="Monitor001"
				geometry={nodes.Monitor001.geometry}
				material={materials.Imphezia}
				position={[-0.693, 0.779, -0.099]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="Monitor002"
				geometry={nodes.Monitor002.geometry}
				material={materials.Imphezia}
				position={[0.034, 0.708, 0.542]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="Monitor003"
				geometry={nodes.Monitor003.geometry}
				material={materials.Imphezia}
				position={[-1.544, 0.795, -0.025]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="LapTop"
				geometry={nodes.LapTop.geometry}
				material={materials.Imphezia}
				position={[0.13, 0.537, 1.182]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="CoolingPad"
				geometry={nodes.CoolingPad.geometry}
				material={materials.Imphezia}
				position={[0.058, 0.415, 1.155]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="Keyboard"
				geometry={nodes.Keyboard.geometry}
				material={materials.Imphezia}
				position={[-0.734, 0.435, 0.183]}
				castShadow
			/>
			<mesh
				name="Mouse"
				geometry={nodes.Mouse.geometry}
				material={materials.Imphezia}
				position={[-0.301, 0.415, 0.199]}
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
	materials,
}: {
	nodes: GLTFResult["nodes"];
	materials: GLTFResult["materials"];
}) {
	return (
		<group name="AudioEquipment">
			<mesh
				name="Speaker"
				geometry={nodes.Speaker.geometry}
				material={materials.Imphezia}
				position={[-3.23, 0.162, 0.071]}
				castShadow
			/>
			<mesh
				name="Speaker001"
				geometry={nodes.Speaker001.geometry}
				material={materials.Imphezia}
				position={[-0.056, 0.178, 2.314]}
				castShadow
			/>
			<mesh
				name="HeadSetHolder"
				geometry={nodes.HeadSetHolder.geometry}
				material={materials.Imphezia}
				position={[-0.005, 0.489, 1.602]}
				castShadow
			/>
			<mesh
				name="HeadSet"
				geometry={nodes.HeadSet.geometry}
				material={materials.Imphezia}
				position={[-0.001, 0.522, 1.604]}
				castShadow
			/>
			<mesh
				name="HeadSet001"
				geometry={nodes.HeadSet001.geometry}
				material={materials.Imphezia}
				position={[0.332, 0.999, 1.292]}
				castShadow
			/>
			<mesh
				name="HeadSet002"
				geometry={nodes.HeadSet002.geometry}
				material={materials.Imphezia}
				position={[0.332, 0.999, 1.578]}
				castShadow
			/>
		</group>
	);
}

/* -------------------------------------------------------------
 * 5. Room Furniture & Storage (Shelves, Mini-Fridge, Trash Can)
 * ------------------------------------------------------------*/
export function RoomFurniture({
	nodes,
	materials,
}: {
	nodes: GLTFResult["nodes"];
	materials: GLTFResult["materials"];
}) {
	return (
		<group name="RoomFurniture">
			<mesh
				name="Fridge"
				geometry={nodes.Fridge.geometry}
				material={materials.Imphezia}
				position={[0.132, 0.148, 3.147]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="Shelve"
				geometry={nodes.Shelve.geometry}
				material={materials.Imphezia}
				position={[0.363, 1.219, 1.435]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="Shelve001"
				geometry={nodes.Shelve001.geometry}
				material={materials.Imphezia}
				position={[-1.601, 1.434, -0.24]}
				castShadow
				receiveShadow
			/>
			<mesh
				name="TrashCan"
				geometry={nodes.TrashCan.geometry}
				material={materials.Imphezia}
				position={[-0.08, -0.205, 1.412]}
				castShadow
				receiveShadow
			/>
		</group>
	);
}

/* -------------------------------------------------------------
 * 6. Decorative Props & Lamp
 * ------------------------------------------------------------*/
export function RoomProps({
	nodes,
	materials,
}: {
	nodes: GLTFResult["nodes"];
	materials: GLTFResult["materials"];
}) {
	return (
		<group name="RoomProps">
			<mesh
				name="Mug"
				geometry={nodes.Mug.geometry}
				material={materials.Imphezia}
				position={[-0.091, 0.443, 0.593]}
				castShadow
			/>
			<mesh
				name="Coaster"
				geometry={nodes.Coaster.geometry}
				material={materials.Imphezia}
				position={[-0.091, 0.391, 0.593]}
				receiveShadow
			/>
			<mesh
				name="Light"
				geometry={nodes.Light.geometry}
				material={materials.Imphezia}
				position={[0.079, 1.405, -0.099]}
				castShadow
			/>
		</group>
	);
}

/* -------------------------------------------------------------
 * Composite Room Component
 * ------------------------------------------------------------*/
export function Room(props: ThreeElements["group"]) {
	const { nodes, materials } = useGLTF(MODEL_URL) as unknown as GLTFResult;

	return (
		<group {...props} dispose={null}>
			<RoomStructure nodes={nodes} materials={materials} />
			<DeskStation nodes={nodes} materials={materials} />
			<ComputerSetup nodes={nodes} materials={materials} />
			<AudioEquipment nodes={nodes} materials={materials} />
			<RoomFurniture nodes={nodes} materials={materials} />
			<RoomProps nodes={nodes} materials={materials} />
		</group>
	);
}

useGLTF.preload(MODEL_URL);
export default Room;
