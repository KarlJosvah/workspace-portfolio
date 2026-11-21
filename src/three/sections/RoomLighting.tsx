import { useMemo, useRef, useState } from "react";
import { useGLTF, useHelper } from "@react-three/drei";
import * as THREE from "three";
import { CeilingLampSpotLight } from "@/three/components/CeilingLampSpotLight.tsx";
import { MODEL_URL, type GLTFResult } from "@/three/utils/roomTypes.ts";

/**
 * Ceiling lamp IDs (1 to 12) configured to cast real-time shadows.
 * - Pick any individual lamp numbers: e.g. [1, 2, 3, 4] or [1, 5, 8, 11]
 * - "all": every ceiling lamp casts shadows
 * - []: no ceiling lamp casts shadows (maximum FPS)
 */
const DEFAULT_SHADOW_LAMPS: number[] | "all" = [1, 2, 3, 4];

/**
 * Checks whether a given ceiling lamp mesh node should cast a shadow based on its numeric suffix.
 */
function shouldLampCastShadow(
	nodeName: string,
	config: number[] | "all"
): boolean {
	if (config === "all") return true;
	const match = nodeName.match(/\d+$/);
	if (!match) return false;
	const id = parseInt(match[0], 10);
	return config.includes(id);
}

export interface RoomLightingProps {
	showHelpers?: boolean;
	shadowLamps?: number[] | "all";
}

export function RoomLighting({
	showHelpers = false,
	shadowLamps = DEFAULT_SHADOW_LAMPS,
}: RoomLightingProps) {
	const { nodes } = useGLTF(MODEL_URL) as unknown as GLTFResult;

	const deskLampRef = useRef<THREE.SpotLight>(null);
	const pcTowerLightRef = useRef<THREE.PointLight>(null);

	// Dynamically discover all ceiling lamp fixtures from GLB nodes
	const ceilingLampNodes = useMemo(() => {
		return (Object.values(nodes) as THREE.Mesh[])
			.filter((node): node is THREE.Mesh =>
				Boolean(node?.name && /^Ceiling\.?Lamp/i.test(node.name))
			)
			.sort((a, b) =>
				a.name.localeCompare(b.name, undefined, { numeric: true })
			);
	}, [nodes]);

	// Dedicated target for the desk lamp spotLight aiming toward the chair and desk workspace
	const [lampTarget] = useState(() => {
		const obj = new THREE.Object3D();
		obj.position.set(-1.126, 0.65, 0.968);
		return obj;
	});

	// Light visual helpers
	useHelper(
		showHelpers ? (deskLampRef as React.RefObject<THREE.Object3D>) : null,
		THREE.SpotLightHelper,
		"#fffaed"
	);
	useHelper(
		showHelpers
			? (pcTowerLightRef as React.RefObject<THREE.Object3D>)
			: null,
		THREE.PointLightHelper,
		0.2,
		"#2196f3"
	);

	return (
		<>
			{/* Ambient fill light for base indoor illumination */}
			<ambientLight intensity={0.85} color="#e3f2fd" />

			{/* Downward wide-angle spotlights dynamically placed for each ceiling lamp fixture */}
			{ceilingLampNodes.map((node) => (
				<CeilingLampSpotLight
					key={node.name}
					node={node}
					showHelpers={showHelpers}
					castShadow={shouldLampCastShadow(node.name, shadowLamps)}
				/>
			))}

			{/*
			  Desk lamp directional SpotLight:
			  - Positioned at the lamp: [0.08, 1.45, -0.05]
			  - Aimed directly toward the chair / desk station: [-1.126, 0.65, 0.968]
			  - Emits in a forward cone (angle & penumbra prevent light leaking behind through the wall)
			  - Full shadow-mapping support to cast shadows across DeskStation, ComputerSetup, and chair
			*/}
			<primitive object={lampTarget} />
			<spotLight
				ref={deskLampRef}
				target={lampTarget}
				position={[0.08, 1.45, -0.05]}
				intensity={3.5}
				color="#fffaed"
				angle={Math.PI / 3.5}
				penumbra={0.4}
				distance={5}
				decay={2}
				castShadow
				shadow-mapSize-width={1024}
				shadow-mapSize-height={1024}
				shadow-bias={-0.00005}
				shadow-normalBias={0.03}
			/>

			{/* PC Tower subtle cyber blue glow matching palette */}
			<pointLight
				ref={pcTowerLightRef}
				position={[-2.29, 0.74, -0.1]}
				intensity={1.0}
				color="#2196f3"
				distance={2.0}
				decay={2}
			/>
		</>
	);
}

export default RoomLighting;
