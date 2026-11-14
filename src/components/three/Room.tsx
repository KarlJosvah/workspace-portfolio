import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { createGlowMaterials } from "@/constants/emissionConfig.ts";
import {
	MODEL_URL,
	type GLTFResult,
	type RoomSubComponentProps,
} from "./roomTypes.ts";
import { RoomStructure } from "./RoomStructure.tsx";
import { DeskStation } from "./DeskStation.tsx";
import { ComputerSetup } from "./ComputerSetup.tsx";
import { AudioEquipment } from "./AudioEquipment.tsx";
import { RoomFurniture } from "./RoomFurniture.tsx";
import { ChessArea } from "./ChessPieces.tsx";
import { GamingConsoleZone } from "./GamingConsoleZone.tsx";
import type { MenuType } from "@/constants/menuConfig.ts";

// Re-export outsourced components and types for consumers
export { MODEL_URL, type GLTFResult, type RoomSubComponentProps };
export { RoomMesh } from "./RoomMesh.tsx";
export { WallClock } from "./WallClock.tsx";
export { TriangleWallLEDs } from "./TriangleWallLEDs.tsx";
export { CeilingLamps } from "./CeilingLamps.tsx";
export { ChessArea, ChessPieces } from "./ChessPieces.tsx";
export { MonitorScreen } from "./MonitorScreen.tsx";
export { RoomStructure } from "./RoomStructure.tsx";
export { DeskStation } from "./DeskStation.tsx";
export { ComputerSetup, type ComputerSetupProps } from "./ComputerSetup.tsx";
export { AudioEquipment } from "./AudioEquipment.tsx";
export { RoomFurniture } from "./RoomFurniture.tsx";
export { GamingConsoleZone } from "./GamingConsoleZone.tsx";

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
