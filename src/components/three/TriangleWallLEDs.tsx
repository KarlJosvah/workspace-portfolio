import { useMemo } from "react";
import * as THREE from "three";
import { RoomMesh } from "./RoomMesh.tsx";
import type { GLTFResult, RoomSubComponentProps } from "./roomTypes.ts";

interface TriangleLEDArrays {
	all: THREE.Mesh[];
	cyan: THREE.Mesh[];
	white: THREE.Mesh[];
}

/**
 * Dynamically discovers triangular wall LED panels (Nanoleaf-style modular tiles)
 * and organizes them into arrays by color or as a unified collection.
 */
function getTriangleWallLEDs(nodes: GLTFResult["nodes"]): TriangleLEDArrays {
	const all = (Object.values(nodes) as THREE.Mesh[]).filter(
		(n) => n?.name && /^LED\.?Triangle/i.test(n.name)
	);

	return {
		all,
		cyan: all.filter((n) => /cyan/i.test(n.name)),
		white: all.filter((n) => /white/i.test(n.name)),
	};
}

export function TriangleWallLEDs({
	nodes,
	glowMaterials,
}: RoomSubComponentProps) {
	const { all: triangleLEDs } = useMemo(
		() => getTriangleWallLEDs(nodes),
		[nodes]
	);

	return (
		<group name="TriangleWallLEDs">
			{triangleLEDs.map((node) => (
				<RoomMesh
					key={node.name}
					node={node}
					material={glowMaterials.wallArt}
					castShadow
				/>
			))}
		</group>
	);
}

export default TriangleWallLEDs;
