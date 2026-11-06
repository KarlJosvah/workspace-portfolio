import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useHelper } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import SmoothCameraController from "@/components/three/SmoothCameraController.tsx";
import Room from "@/components/three/Room.tsx";
import { MenuType } from "@/constants/menuConfig.ts";

// Initialize RectAreaLight LTC lookup tables once at module level
RectAreaLightUniformsLib.init();

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

/** Manual RectAreaLight helper — drei's useHelper does not support RectAreaLightHelper */
function DeskLampHelper({
	lightRef,
}: {
	lightRef: React.RefObject<THREE.RectAreaLight | null>;
}) {
	const helperRef = useRef<RectAreaLightHelper | null>(null);
	const { scene } = useThree();

	useLayoutEffect(() => {
		if (!lightRef.current) return;
		const helper = new RectAreaLightHelper(lightRef.current);
		helperRef.current = helper;
		scene.add(helper);
		return () => {
			scene.remove(helper);
			helper.dispose?.();
			helperRef.current = null;
		};
	}, [lightRef, scene]);

	return null;
}

function RoomLighting({ showHelpers = false }: RoomLightingProps) {
	const ceilingLightRef = useRef<THREE.PointLight>(null);
	const deskLampRef = useRef<THREE.RectAreaLight>(null);
	const pcTowerLightRef = useRef<THREE.PointLight>(null);

	// Light visual helpers (PointLightHelper) for point lights
	useHelper(
		showHelpers ? (ceilingLightRef as React.RefObject<THREE.Object3D>) : null,
		THREE.PointLightHelper,
		0.3,
		"#f8fafc",
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

			{/* Soft ceiling fill light — primary shadow caster for the room */}
			<pointLight
				ref={ceilingLightRef}
				position={[-1.0, 2.5, 2.0]}
				intensity={1.2}
				color="#f8fafc"
				distance={10}
				decay={2}
				castShadow
				shadow-mapSize-width={1024}
				shadow-mapSize-height={1024}
				shadow-bias={-0.0001}
			/>

			{/*
			  Desk lamp warm area light — emits only toward the chair, never through walls.
			  RectAreaLight emits along its local -Z axis.
			  Lamp pos: [0.08, 1.45, -0.05] | Chair center: [-1.126, 0.65, 0.968]
			  Rotation from setFromUnitVectors(0,0,-1 → toChair): x≈-2.4755, y≈0.7499, z≈1.6996 rad
			  RectAreaLight does NOT support castShadow (Three.js limitation).
			*/}
			<rectAreaLight
				ref={deskLampRef}
				position={[0.08, 1.45, -0.05]}
				rotation={[-2.4755, 0.7499, 1.6996]}
				intensity={6}
				color="#fffaed"
				width={0.5}
				height={0.5}
			/>

			{/* Manual RectAreaLightHelper — only shown when L is pressed */}
			{showHelpers && <DeskLampHelper lightRef={deskLampRef} />}

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
