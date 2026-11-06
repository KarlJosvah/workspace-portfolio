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

interface SceneProps {
	activeSection?: MenuType | null;
}

interface RoomLightingProps {
	showHelpers?: boolean;
}

function RoomLighting({ showHelpers = false }: RoomLightingProps) {
	const sunLightRef = useRef<THREE.DirectionalLight>(null);
	const ceilingLightRef = useRef<THREE.PointLight>(null);
	const deskLampRef = useRef<THREE.PointLight>(null);
	const pcTowerLightRef = useRef<THREE.PointLight>(null);
	const rimLightRef = useRef<THREE.DirectionalLight>(null);

	// Light visual helpers (DirectionalLightHelper & PointLightHelper)
	useHelper(
		showHelpers ? (sunLightRef as React.RefObject<THREE.Object3D>) : null,
		THREE.DirectionalLightHelper,
		1,
		"#facc15",
	);
	useHelper(
		showHelpers ? (ceilingLightRef as React.RefObject<THREE.Object3D>) : null,
		THREE.PointLightHelper,
		0.3,
		"#90caf9",
	);
	useHelper(
		showHelpers ? (deskLampRef as React.RefObject<THREE.Object3D>) : null,
		THREE.PointLightHelper,
		0.2,
		"#fffaed",
	);
	useHelper(
		showHelpers ? (pcTowerLightRef as React.RefObject<THREE.Object3D>) : null,
		THREE.PointLightHelper,
		0.2,
		"#2196f3",
	);
	useHelper(
		showHelpers ? (rimLightRef as React.RefObject<THREE.Object3D>) : null,
		THREE.DirectionalLightHelper,
		1,
		"#3b82f6",
	);

	return (
		<>
			{/* Ambient fill light (omnidirectional, no positional helper) */}
			<ambientLight intensity={0.65} color="#e3f2fd" />

			{/* Main sunlight / window directional light */}
			<directionalLight
				ref={sunLightRef}
				position={[-4, 6, 4]}
				intensity={1.4}
				color="#ffffff"
				castShadow
				shadow-mapSize-width={2048}
				shadow-mapSize-height={2048}
				shadow-camera-near={0.5}
				shadow-camera-far={20}
				shadow-camera-left={-5}
				shadow-camera-right={5}
				shadow-camera-top={5}
				shadow-camera-bottom={-5}
				shadow-bias={-0.0001}
			/>

			{/* Soft ceiling fill light */}
			<pointLight
				ref={ceilingLightRef}
				position={[-1.0, 3.0, 1.5]}
				intensity={0.8}
				color="#90caf9"
			/>

			{/* Desk lamp local warm point light */}
			{/* <pointLight
				ref={deskLampRef}
				position={[0.08, 1.45, -0.05]}
				intensity={1.2}
				color="#fffaed"
				distance={3.5}
				decay={2}
				castShadow
			/> */}

			{/* PC Tower subtle cyber blue glow matching palette */}
			<pointLight
				ref={pcTowerLightRef}
				position={[-2.29, 0.74, -0.1]}
				intensity={1.0}
				color="#2196f3"
				distance={2.0}
				decay={2}
			/>

			{/* Subtle rim light for background wall contrast */}
			<directionalLight
				ref={rimLightRef}
				position={[3, 3, -2]}
				intensity={0.4}
				color="#0d47a1"
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
