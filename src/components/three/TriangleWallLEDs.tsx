import { useMemo } from "react";
import * as THREE from "three";
import { Instances, Instance } from "@react-three/drei";
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

/**
 * Optimized Instanced Mesh for modular triangular LED wall panels.
 * Collapses 30+ individual mesh draw calls into 2 instanced draw calls (Cyan & White).
 */
export function TriangleWallLEDs({
	nodes,
	glowMaterials,
}: RoomSubComponentProps) {
	const { cyan, white } = useMemo(
		() => getTriangleWallLEDs(nodes),
		[nodes]
	);

	return (
		<group name="TriangleWallLEDs">
			{cyan.length > 0 && (
				<Instances
					geometry={cyan[0].geometry}
					material={glowMaterials.wallArt}
					castShadow
				>
					{cyan.map((node) => (
						<Instance
							key={node.name}
							position={node.position}
							rotation={node.rotation}
							scale={node.scale}
						/>
					))}
				</Instances>
			)}
			{white.length > 0 && (
				<Instances
					geometry={white[0].geometry}
					material={glowMaterials.wallArt}
					castShadow
				>
					{white.map((node) => (
						<Instance
							key={node.name}
							position={node.position}
							rotation={node.rotation}
							scale={node.scale}
						/>
					))}
				</Instances>
			)}
		</group>
	);
}

export default TriangleWallLEDs;
