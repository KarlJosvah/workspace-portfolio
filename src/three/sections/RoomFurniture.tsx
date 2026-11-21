import { RoomMesh } from "@/three/utils/RoomMesh.tsx";
import type { RoomSubComponentProps } from "@/three/utils/roomTypes.ts";

/* -------------------------------------------------------------
 * 5. Room Storage & Appliances (Shelves with LED strips, Mini-Fridge, Collectibles)
 * ------------------------------------------------------------*/
export function RoomFurniture({
	nodes,
	glowMaterials,
	materials,
}: RoomSubComponentProps) {
	return (
		<group name="RoomFurniture">
			<RoomMesh
				node={nodes.Fridge}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.Snorlax}
				material={materials?.snorlax}
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
			<RoomMesh
				node={nodes.AnbuMask}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.FumaShuriken}
				material={glowMaterials.subtle}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.Shuriken}
				material={glowMaterials.subtle}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.Kunai}
				material={glowMaterials.subtle}
				castShadow
				receiveShadow
			>
				<RoomMesh
					node={nodes.KunaiRope}
					material={glowMaterials.standard}
					castShadow
					receiveShadow
				/>
				<RoomMesh
					node={nodes.PaperBomb}
					material={materials?.PaperBomb}
					castShadow
					receiveShadow
				/>
			</RoomMesh>
			<RoomMesh
				node={nodes.Molecules}
				material={glowMaterials.subtle}
				castShadow
				receiveShadow
			/>
		</group>
	);
}

export default RoomFurniture;
