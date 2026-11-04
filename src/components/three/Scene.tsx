import React, { Suspense, useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import SmoothCameraController from "./SmoothCameraController";

export const CAMERA_CONFIG = {
	// FOV and Initial Position
	FOV: 45,
	INITIAL_POSITION: [0, 1.0, 3.5] as [number, number, number],

	// Target Y Heights (World Y = 0 is character feet)
	NORMAL_TARGET_Y: 1.0, // Chest/torso height in normal view
	HEAD_TARGET_Y: 1.45, // Head level height when focused/zoomed

	// Camera Zoom Distances
	NORMAL_ZOOM_DIST: 3.5, // Default zoom distance outside WeaponsSection
	ACTIVE_ZOOM_DIST: 2.15, // Focused zoom distance inside WeaponsSection
	MIN_DISTANCE: 1.8, // Minimum allowed OrbitControls zoom distance
	MAX_DISTANCE: 3.5, // Maximum allowed OrbitControls zoom distance

	// Transition Damping Speed (higher = faster transition)
	DAMP_SPEED: 6,
};

function Scene() {
	return (
		<Canvas
			camera={{
				position: CAMERA_CONFIG.INITIAL_POSITION,
				fov: CAMERA_CONFIG.FOV,
			}}
			className="three-canvas"
		>
			<ambientLight intensity={0.5} />
			<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
			<pointLight position={[-10, -10, -10]} />

			<SmoothCameraController />

			<Environment preset="city" />
		</Canvas>
	);
}

export default Scene;
