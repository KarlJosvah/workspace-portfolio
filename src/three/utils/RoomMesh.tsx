import * as THREE from "three";
import type { ThreeElements } from "@react-three/fiber";

export type RoomMeshProps = ThreeElements["mesh"] & {
	node: THREE.Mesh;
	material?: THREE.Material;
};

/**
 * Reusable mesh wrapper that automatically reads geometry, position, rotation,
 * and scale directly from the loaded GLB node, while allowing optional prop overrides.
 */
export function RoomMesh({
	node,
	material,
	position,
	rotation,
	scale,
	name,
	children,
	...rest
}: RoomMeshProps) {
	return (
		<mesh
			name={name ?? node.name}
			geometry={node.geometry}
			material={material}
			position={position ?? node.position}
			rotation={rotation ?? node.rotation}
			scale={scale ?? node.scale}
			{...rest}
		>
			{children}
		</mesh>
	);
}

export default RoomMesh;
