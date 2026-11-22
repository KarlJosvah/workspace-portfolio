import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { createGlowMaterials } from "@/constants/emissionConfig.ts";
import {
	MODEL_URL,
	type GLTFResult,
	type RoomSubComponentProps,
} from "@/three/utils/roomTypes.ts";
import { RoomStructure } from "@/three/sections/RoomStructure.tsx";
import { DeskStation } from "@/three/sections/DeskStation.tsx";
import { ComputerSetup } from "@/three/sections/ComputerSetup.tsx";
import { AudioEquipment } from "@/three/sections/AudioEquipment.tsx";
import { RoomFurniture } from "@/three/sections/RoomFurniture.tsx";
import { ChessArea } from "@/three/sections/ChessArea.tsx";
import { GamingConsoleZone } from "@/three/sections/GamingConsoleZone.tsx";
import type { MenuType } from "@/constants/menuConfig.ts";

// Re-export outsourced components and types for consumers
export { MODEL_URL, type GLTFResult, type RoomSubComponentProps };
export { RoomMesh } from "@/three/utils/RoomMesh.tsx";
export { WallClock } from "@/three/components/WallClock.tsx";
export { TriangleWallLEDs } from "@/three/components/TriangleWallLEDs.tsx";
export { CeilingLamps } from "@/three/components/CeilingLamps.tsx";
export { ChessArea, ChessPieces } from "@/three/sections/ChessArea.tsx";
export { MonitorScreen } from "@/three/components/MonitorScreen.tsx";
export { RoomStructure } from "@/three/sections/RoomStructure.tsx";
export { DeskStation } from "@/three/sections/DeskStation.tsx";
export {
	ComputerSetup,
	type ComputerSetupProps,
} from "@/three/sections/ComputerSetup.tsx";
export { AudioEquipment } from "@/three/sections/AudioEquipment.tsx";
export { RoomFurniture } from "@/three/sections/RoomFurniture.tsx";
export { GamingConsoleZone } from "@/three/sections/GamingConsoleZone.tsx";

/* -------------------------------------------------------------
 * Composite Room Component
 * ------------------------------------------------------------*/
export type RoomProps = ThreeElements["group"] & {
	activeSection?: MenuType | null;
	onExitSection?: () => void;
};

export function Room({
	activeSection,
	onExitSection,
	...props
}: RoomProps = {}) {
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
			<RoomFurniture
				nodes={nodes}
				glowMaterials={glowMaterials}
				materials={materials}
			/>
			<ChessArea nodes={nodes} glowMaterials={glowMaterials} />
			<GamingConsoleZone nodes={nodes} glowMaterials={glowMaterials} />
		</group>
	);
}

useGLTF.preload(MODEL_URL);
export default Room;
