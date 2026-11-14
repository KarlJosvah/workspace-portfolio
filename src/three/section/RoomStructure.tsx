import { RoomMesh } from "../utils/RoomMesh.tsx";
import { CeilingLamps } from "../components/CeilingLamps.tsx";
import { WallClock } from "../components/WallClock.tsx";
import { TriangleWallLEDs } from "../components/TriangleWallLEDs.tsx";
import type { RoomSubComponentProps } from "../utils/roomTypes.ts";

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

export default RoomStructure;
