import { useMemo } from "react";
import * as THREE from "three";
import { Instances, Instance } from "@react-three/drei";
import type { GLTFResult, RoomSubComponentProps } from "./roomTypes.ts";

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

/**
 * Optimized Instanced Mesh for all ceiling lamps.
 * Collapses 12 individual mesh draw calls into a single instanced draw call.
 */
export function CeilingLamps({
	nodes,
	glowMaterials,
}: RoomSubComponentProps) {
	const ceilingLamps = useMemo(
		() => getCeilingLamps(nodes),
		[nodes]
	);

	if (ceilingLamps.length === 0) return null;

	const baseGeometry = ceilingLamps[0].geometry;

	return (
		<group name="CeilingLamps">
			<Instances
				geometry={baseGeometry}
				material={glowMaterials.lamp}
				castShadow
				receiveShadow
			>
				{ceilingLamps.map((node) => (
					<Instance
						key={node.name}
						position={node.position}
						rotation={node.rotation}
						scale={node.scale}
					/>
				))}
			</Instances>
		</group>
	);
}

export default CeilingLamps;
