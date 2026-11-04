import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import SmoothCameraController from "./SmoothCameraController.tsx";
import Room from "./Room.tsx";

const CAMERA_CONFIG = {
	FOV: 45,
	INITIAL_POSITION: [-0.7, 1.75, 3.8] as [number, number, number],
	INITIAL_TARGET: [-0.7, 0.85, 0.4] as [number, number, number],
	PLAYER_HEIGHT: 1.75,
	WALK_SPEED: 3.5,
};

function RoomLighting() {
	return (
		<>
			{/* Ambient fill light */}
			<ambientLight intensity={0.65} color="#e3f2fd" />

			{/* Main sunlight / window directional light */}
			<directionalLight
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
			<pointLight position={[-1.0, 3.0, 1.5]} intensity={0.8} color="#90caf9" />

			{/* Desk lamp local warm point light */}
			<pointLight
				position={[0.08, 1.45, -0.05]}
				intensity={1.2}
				color="#fffaed"
				distance={3.5}
				decay={2}
				castShadow
			/>

			{/* PC Tower subtle cyber blue glow matching palette */}
			<pointLight
				position={[-2.29, 0.74, -0.1]}
				intensity={1.0}
				color="#2196f3"
				distance={2.0}
				decay={2}
			/>

			{/* Subtle rim light for background wall contrast */}
			<directionalLight position={[3, 3, -2]} intensity={0.4} color="#0d47a1" />
		</>
	);
}

function Scene() {
	const controlsRef = useRef<OrbitControlsImpl | null>(null);

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
			<RoomLighting />

			<Suspense fallback={null}>
				<Room />
			</Suspense>

			<OrbitControls
				ref={controlsRef}
				makeDefault
				target={CAMERA_CONFIG.INITIAL_TARGET}
				enableDamping
				dampingFactor={0.06}
				minDistance={0.5}
				maxDistance={12}
				maxPolarAngle={Math.PI / 2 + 0.05}
			/>

			<SmoothCameraController
				controlsRef={controlsRef}
				height={CAMERA_CONFIG.PLAYER_HEIGHT}
				speed={CAMERA_CONFIG.WALK_SPEED}
			/>
		</Canvas>
	);
}

export default Scene;
