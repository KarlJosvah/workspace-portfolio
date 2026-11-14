import { RoomMesh } from "../utils/RoomMesh.tsx";
import type { RoomSubComponentProps } from "../utils/roomTypes.ts";

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

export default RoomFurniture;
