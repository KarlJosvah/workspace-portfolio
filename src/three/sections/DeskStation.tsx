import { useMemo } from "react";
import type * as THREE from "three";
import { RoomMesh } from "@/three/utils/RoomMesh.tsx";
import type {
	GLTFResult,
	RoomSubComponentProps,
} from "@/three/utils/roomTypes.ts";

/**
 * Dynamically discovers LED strip meshes mounted on the main desk.
 */
function getDeskLEDs(nodes: GLTFResult["nodes"]): THREE.Mesh[] {
	const desk = nodes.Desk;
	const children = (desk?.children ?? []) as THREE.Mesh[];
	return (
		children.length > 0
			? children.filter((c) => /^LED/i.test(c.name))
			: (Object.values(nodes) as THREE.Mesh[]).filter((n) =>
					/^LED\.?00[1-4]/i.test(n.name)
				)
	).sort((a, b) =>
		a.name.localeCompare(b.name, undefined, { numeric: true })
	);
}

/* -------------------------------------------------------------
 * 2. Desk & Seating (Main Desk, Drawer with Edge LEDs, Mat, Chair, Props)
 * ------------------------------------------------------------*/
export function DeskStation({ nodes, glowMaterials }: RoomSubComponentProps) {
	const deskLEDs = useMemo(() => getDeskLEDs(nodes), [nodes]);

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
				{deskLEDs.map((led) => (
					<RoomMesh
						key={led.name}
						node={led}
						material={glowMaterials.ledStrips}
						castShadow
					/>
				))}
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
