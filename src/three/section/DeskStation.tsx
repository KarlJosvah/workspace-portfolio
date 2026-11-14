import { RoomMesh } from "../utils/RoomMesh.tsx";
import type { RoomSubComponentProps } from "../utils/roomTypes.ts";

/* -------------------------------------------------------------
 * 2. Desk & Seating (Main Desk, Drawer with Edge LEDs, Mat, Chair, Props)
 * ------------------------------------------------------------*/
export function DeskStation({ nodes, glowMaterials }: RoomSubComponentProps) {
	return (
		<group name="DeskStation">
			<RoomMesh
				node={nodes.Desk}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			>
				<RoomMesh
					node={nodes.DeskDrawer001}
					material={glowMaterials.standard}
					castShadow
					receiveShadow
				/>
				<RoomMesh
					node={nodes.DeskDrawer002}
					material={glowMaterials.standard}
					castShadow
					receiveShadow
				/>
				<RoomMesh
					node={nodes.DeskDrawer003}
					material={glowMaterials.standard}
					castShadow
					receiveShadow
				/>
				<RoomMesh
					node={nodes.LED001}
					material={glowMaterials.ledStrips}
					castShadow
				/>
				<RoomMesh
					node={nodes.LED002}
					material={glowMaterials.ledStrips}
					castShadow
				/>
				<RoomMesh
					node={nodes.LED003}
					material={glowMaterials.ledStrips}
					castShadow
				/>
				<RoomMesh
					node={nodes.LED004}
					material={glowMaterials.ledStrips}
					castShadow
				/>
			</RoomMesh>
			<RoomMesh
				node={nodes.DeskMat}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.Chair}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.TrashCan}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.Rubik}
				material={glowMaterials.standard}
				castShadow
			/>
			<RoomMesh
				node={nodes.Mug}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.Coaster}
				material={glowMaterials.standard}
				castShadow
			/>
			<RoomMesh
				node={nodes.AVR001}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
		</group>
	);
}

export default DeskStation;
