import { useMemo } from "react";
import * as THREE from "three";
import { RoomMesh } from "./RoomMesh.tsx";
import type { GLTFResult, RoomSubComponentProps } from "./roomTypes.ts";

interface ClockMeshArrays {
	hours: THREE.Mesh[];
	seconds: THREE.Mesh[];
	digits: THREE.Mesh[];
}

/**
 * Dynamically organizes the hundreds of clock children into three arrays:
 * - hours: Digital.Clock.Hour.01 - 12
 * - seconds: Digital.Clock.Second.00 - 59
 * - digits: Digital.Clock.Digit.* and Digital.Clock.Colon
 */
function getClockMeshes(nodes: GLTFResult["nodes"]): ClockMeshArrays {
	const clock = nodes.DigitalAnalogWallClock;
	const children = (clock?.children ?? []) as THREE.Mesh[];
	const source =
		children.length > 0
			? children
			: (Object.values(nodes) as THREE.Mesh[]).filter((n) =>
					n?.name?.startsWith("DigitalClock")
				);

	return {
		hours: source.filter((c) => c.name.includes("Hour")),
		seconds: source.filter((c) => c.name.includes("Second")),
		digits: source.filter(
			(c) => c.name.includes("Digit") || c.name.includes("Colon")
		),
	};
}

export function WallClock({ nodes, glowMaterials }: RoomSubComponentProps) {
	const { hours, seconds, digits } = useMemo(
		() => getClockMeshes(nodes),
		[nodes]
	);

	return (
		<RoomMesh
			node={nodes.DigitalAnalogWallClock}
			material={glowMaterials.standard}
			castShadow
			receiveShadow
		>
			{digits.map((node) => (
				<RoomMesh
					key={node.name}
					node={node}
					material={glowMaterials.neonSigns}
				/>
			))}
			{hours.map((node) => (
				<RoomMesh
					key={node.name}
					node={node}
					material={glowMaterials.neonSigns}
				/>
			))}
			{seconds.map((node) => (
				<RoomMesh
					key={node.name}
					node={node}
					material={glowMaterials.neonSigns}
				/>
			))}
		</RoomMesh>
	);
}

export default WallClock;
