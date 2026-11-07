import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useHelper } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import SmoothCameraController from "@/components/three/SmoothCameraController.tsx";
import Room from "@/components/three/Room.tsx";
import { MenuType } from "@/constants/menuConfig.ts";

const CAMERA_CONFIG = {
	FOV: 45,
	INITIAL_POSITION: [-0.7, 1.75, 3.8] as [number, number, number],
	PLAYER_HEIGHT: 1.75,
	WALK_SPEED: 3.5,
};

// Ceiling lamp coordinates at fixture surface (y = 2.58) emitting downward
const CEILING_LAMP_LIGHTS = [
	{ id: "CeilingLamp001", position: [-4.572, 2.58, 1.752] as [number, number, number] },
	{ id: "CeilingLamp002", position: [-0.851, 2.58, 1.752] as [number, number, number] },
	{ id: "CeilingLamp003", position: [-4.572, 2.58, 4.965] as [number, number, number] },
	{ id: "CeilingLamp004", position: [-0.851, 2.58, 4.965] as [number, number, number] },
];

interface SceneProps {
	activeSection?: MenuType | null;
}

interface RoomLightingProps {
	showHelpers?: boolean;
}

interface CeilingLampSpotLightProps {
	position: [number, number, number];
	showHelpers: boolean;
}

/**
 * Directional downward SpotLight for each ceiling lamp fixture.
 * Emits strictly in a wide downward cone — zero light reflects or bleeds upward onto the ceiling.
 */
function CeilingLampSpotLight({
	position,
	showHelpers,
}: CeilingLampSpotLightProps) {
	const lightRef = useRef<THREE.SpotLight>(null);

	// Dedicated downward target directly below the lamp on the floor plane
	const [target] = useState(() => {
		const obj = new THREE.Object3D();
		obj.position.set(position[0], 0, position[2]);
		return obj;
	});

	useHelper(
		showHelpers ? (lightRef as React.RefObject<THREE.Object3D>) : null,
		THREE.SpotLightHelper,
		"#f8fafc",
	);

	return (
		<>
			<primitive object={target} />
			<spotLight
				ref={lightRef}
				target={target}
				position={position}
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
	const deskLampRef = useRef<THREE.SpotLight>(null);
	const pcTowerLightRef = useRef<THREE.PointLight>(null);

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
		"#fffaed",
	);
	useHelper(
		showHelpers ? (pcTowerLightRef as React.RefObject<THREE.Object3D>) : null,
		THREE.PointLightHelper,
		0.2,
		"#2196f3",
	);

	return (
		<>
			{/* Ambient fill light for base indoor illumination */}
			<ambientLight intensity={0.85} color="#e3f2fd" />

			{/* 4 downward wide-angle spotlights for the ceiling fixtures (no upward ceiling bleed) */}
			{CEILING_LAMP_LIGHTS.map((lamp) => (
				<CeilingLampSpotLight
					key={lamp.id}
					position={lamp.position}
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

export function Scene({ activeSection = null }: SceneProps) {
	const [showHelpers, setShowHelpers] = useState(false);

	// Toggle light helpers visibility with the `L` key
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
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return (
		<Canvas
			shadows
			camera={{
				position: CAMERA_CONFIG.INITIAL_POSITION,
				fov: CAMERA_CONFIG.FOV,
				near: 0.1,
				far: 100,
			}}
			className="three-canvas"
		>
			<RoomLighting showHelpers={showHelpers} />

			<Suspense fallback={null}>
				<Room />
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
			/>
		</Canvas>
	);
}

export default Scene;
