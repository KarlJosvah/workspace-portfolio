import { useMemo } from "react";
import * as THREE from "three";
import { RoomMesh } from "../utils/RoomMesh.tsx";
import type { GLTFResult, RoomSubComponentProps } from "../utils/roomTypes.ts";

/**
 * Dynamically discovers all ceiling lamp fixture meshes from the GLB nodes.
 * Matches names like "Ceiling.Lamp.001" or "CeilingLamp001", sorted numerically.
 */
function getCeilingLamps(nodes: GLTFResult["nodes"]): THREE.Mesh[] {
	return (Object.values(nodes) as THREE.Mesh[])
		.filter(
			(node): node is THREE.Mesh =>
				Boolean(node?.name && /^Ceiling\.?Lamp/i.test(node.name))
		)
		.sort((a, b) =>
			a.name.localeCompare(b.name, undefined, { numeric: true })
		);
}

export function CeilingLamps({
	nodes,
	glowMaterials,
}: RoomSubComponentProps) {
	const ceilingLamps = useMemo(
		() => getCeilingLamps(nodes),
		[nodes]
	);

	return (
		<group name="CeilingLamps">
			{ceilingLamps.map((node) => (
				<RoomMesh
					key={node.name}
					node={node}
					material={glowMaterials.lamp}
					castShadow
					receiveShadow
				/>
			))}
		</group>
	);
}

export default CeilingLamps;
