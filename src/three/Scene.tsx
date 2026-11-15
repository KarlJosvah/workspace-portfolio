import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stats } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import type * as THREE from "three";
import SmoothCameraController from "@/three/utils/SmoothCameraController.tsx";
import Room from "@/three/Room.tsx";
import { RoomLighting } from "@/three/section/RoomLighting.tsx";
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
