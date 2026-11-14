import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stats, useGLTF, useHelper } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import SmoothCameraController from "@/three/utils/SmoothCameraController.tsx";
import Room, { MODEL_URL, type GLTFResult } from "@/three/Room.tsx";
import { MenuType } from "@/constants/menuConfig.ts";

const CAMERA_CONFIG = {
	FOV: 45,
	INITIAL_POSITION: [-0.7, 1.75, 3.8] as [number, number, number],
	PLAYER_HEIGHT: 1.75,
	WALK_SPEED: 3.5,
};

interface SceneProps {
	activeSection?: MenuType | null;
	onExitSection?: () => void;
	showStats?: boolean;
}

interface RoomLightingProps {
	showHelpers?: boolean;
}

interface CeilingLampSpotLightProps {
	node: THREE.Mesh;
	showHelpers: boolean;
}

/**
 * Directional downward SpotLight for each ceiling lamp fixture.
 * Reads coordinates dynamically from the GLB node.
 * Emits strictly in a wide downward cone — zero light reflects or bleeds upward onto the ceiling.
 */
function CeilingLampSpotLight({
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

function RoomLighting({ showHelpers = false }: RoomLightingProps) {
	const { nodes } = useGLTF(MODEL_URL) as unknown as GLTFResult;

	const deskLampRef = useRef<THREE.SpotLight>(null);
	const pcTowerLightRef = useRef<THREE.PointLight>(null);

	// Dynamically discover all ceiling lamp fixtures from GLB nodes
	const ceilingLampNodes = useMemo(() => {
		return (Object.values(nodes) as THREE.Mesh[])
			.filter(
				(node): node is THREE.Mesh =>
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
				shadow-bias={-0.0001}
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

export function Scene({
	activeSection = null,
	onExitSection,
	showStats: controlledShowStats,
}: SceneProps) {
	const [showHelpers, setShowHelpers] = useState(false);
	const [internalShowStats, setInternalShowStats] = useState(false);
	const showStats = controlledShowStats ?? internalShowStats;
	const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

	// Toggle light helpers visibility with `L` and FPS performance stats with `F` or `P`
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			const target = e.target as HTMLElement | null;
			if (
				target &&
				(target.tagName === "INPUT" ||
					target.tagName === "TEXTAREA" ||
					target.isContentEditable)
			) {
				return;
			}

			if (e.key === "l" || e.key === "L") {
				setShowHelpers((prev) => !prev);
			}

			if (e.key === "f" || e.key === "F" || e.key === "p" || e.key === "P") {
				setInternalShowStats((prev) => !prev);
				const renderer = rendererRef.current;
				if (renderer) {
					console.log("Draw Calls:", renderer.info.render.calls);
					console.log("Triangles:", renderer.info.render.triangles);
					console.log("Geometries in Memory:", renderer.info.memory.geometries);
					console.log("Textures in Memory:", renderer.info.memory.textures);
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return (
		<Canvas
			shadows
			onCreated={({ gl }) => {
				rendererRef.current = gl;
			}}
			camera={{
				position: CAMERA_CONFIG.INITIAL_POSITION,
				fov: CAMERA_CONFIG.FOV,
				near: 0.1,
				far: 100,
			}}
			className="three-canvas"
		>
			{/* FPS performance indicator (stats.js panel) */}
			{showStats && <Stats className="fps-stats" showPanel={0} />}

			<Suspense fallback={null}>
				<RoomLighting showHelpers={showHelpers} />
				<Room activeSection={activeSection} onExitSection={onExitSection} />
			</Suspense>

			{/* Bloom post-processing for high-emission palette glow */}
			<EffectComposer>
				<Bloom
					luminanceThreshold={1.0}
					luminanceSmoothing={0.25}
					intensity={1.2}
					mipmapBlur
				/>
			</EffectComposer>

			{/* First-person camera controller: Look-around in place & WASD 2D walk (No zoom) */}
			<SmoothCameraController
				height={CAMERA_CONFIG.PLAYER_HEIGHT}
				speed={CAMERA_CONFIG.WALK_SPEED}
				initialYaw={0}
				initialPitch={-0.12}
				activeSection={activeSection}
				onExitSection={onExitSection}
			/>
		</Canvas>
	);
}

export default Scene;
