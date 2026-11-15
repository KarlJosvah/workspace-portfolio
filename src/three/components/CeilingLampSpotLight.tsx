import { useMemo, useRef, useState } from "react";
import { useHelper } from "@react-three/drei";
import * as THREE from "three";

export interface CeilingLampSpotLightProps {
	node: THREE.Mesh;
	showHelpers: boolean;
}

/**
 * Directional downward SpotLight for each ceiling lamp fixture.
 * Reads coordinates dynamically from the GLB node.
 * Emits strictly in a wide downward cone — zero light reflects or bleeds upward onto the ceiling.
 */
export function CeilingLampSpotLight({
	node,
	showHelpers,
}: CeilingLampSpotLightProps) {
	const lightRef = useRef<THREE.SpotLight>(null);

	// Position light flush with bottom face of fixture (y - 0.015)
	const lightPosition: [number, number, number] = useMemo(
		() => [node.position.x, node.position.y - 0.015, node.position.z],
		[node.position.x, node.position.y, node.position.z]
	);

	// Dedicated downward target directly below the lamp on the floor plane
	const [target] = useState(() => {
		const obj = new THREE.Object3D();
		obj.position.set(node.position.x, 0, node.position.z);
		return obj;
	});

	useHelper(
		showHelpers ? (lightRef as React.RefObject<THREE.Object3D>) : null,
		THREE.SpotLightHelper,
		"#f8fafc"
	);

	return (
		<>
			<primitive object={target} />
			<spotLight
				ref={lightRef}
				target={target}
				position={lightPosition}
				intensity={5.0}
				color="#f8fafc"
				angle={Math.PI / 2.4}
				penumbra={0.8}
				distance={8}
				decay={2}
				castShadow
				shadow-mapSize-width={1024}
				shadow-mapSize-height={1024}
				shadow-bias={-0.0001}
			/>
		</>
	);
}

export default CeilingLampSpotLight;
