import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { createGlowMaterials } from "@/constants/emissionConfig.ts";
import {
	MODEL_URL,
	type GLTFResult,
	type RoomSubComponentProps,
} from "./utils/roomTypes.ts";
import { RoomStructure } from "./section/RoomStructure.tsx";
import { DeskStation } from "./section/DeskStation.tsx";
import { ComputerSetup } from "./section/ComputerSetup.tsx";
import { AudioEquipment } from "./section/AudioEquipment.tsx";
import { RoomFurniture } from "./section/RoomFurniture.tsx";
import { ChessArea } from "./section/ChessPieces.tsx";
import { GamingConsoleZone } from "./section/GamingConsoleZone.tsx";
import type { MenuType } from "@/constants/menuConfig.ts";

// Re-export outsourced components and types for consumers
export { MODEL_URL, type GLTFResult, type RoomSubComponentProps };
export { RoomMesh } from "./utils/RoomMesh.tsx";
export { WallClock } from "./components/WallClock.tsx";
export { TriangleWallLEDs } from "./components/TriangleWallLEDs.tsx";
export { CeilingLamps } from "./components/CeilingLamps.tsx";
export { ChessArea, ChessPieces } from "./section/ChessPieces.tsx";
export { MonitorScreen } from "./components/MonitorScreen.tsx";
export { RoomStructure } from "./section/RoomStructure.tsx";
export { DeskStation } from "./section/DeskStation.tsx";
export { ComputerSetup, type ComputerSetupProps } from "./section/ComputerSetup.tsx";
export { AudioEquipment } from "./section/AudioEquipment.tsx";
export { RoomFurniture } from "./section/RoomFurniture.tsx";
export { GamingConsoleZone } from "./section/GamingConsoleZone.tsx";

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
