import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
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

export function Scene({ activeSection = null }: SceneProps) {
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
