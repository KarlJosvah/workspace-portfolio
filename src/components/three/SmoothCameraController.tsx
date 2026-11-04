/* eslint-disable react-hooks/immutability */
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export interface SmoothCameraControllerProps {
	/** Reference to the OrbitControls instance */
	controlsRef?: React.RefObject<OrbitControlsImpl | null>;
	/** Player height / eye level (default 1.75 units) */
	height?: number;
	/** Walking movement speed in units/sec (default 3.5) */
	speed?: number;
}

// Temporary vectors to avoid garbage collection inside useFrame loop
const _forward = new THREE.Vector3();
const _right = new THREE.Vector3();
const _moveDir = new THREE.Vector3();

export function SmoothCameraController({
	controlsRef,
	height = 1.75,
	speed = 3.5,
}: SmoothCameraControllerProps) {
	const { camera, controls: stateControls } = useThree();
	const activeKeys = useRef<Set<string>>(new Set());
	const velocity = useRef(new THREE.Vector3(0, 0, 0));

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

			const key = e.key.toLowerCase();
			if (
				key === "w" ||
				key === "a" ||
				key === "s" ||
				key === "d" ||
				key === "arrowup" ||
				key === "arrowdown" ||
				key === "arrowleft" ||
				key === "arrowright"
			) {
				activeKeys.current.add(key);
			}
		};

		const handleKeyUp = (e: KeyboardEvent) => {
			const key = e.key.toLowerCase();
			activeKeys.current.delete(key);
		};

		const handleBlur = () => {
			activeKeys.current.clear();
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);
		window.addEventListener("blur", handleBlur);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
			window.removeEventListener("blur", handleBlur);
		};
	}, []);

	useFrame((_, delta) => {
		// 1. Maintain player eye-height
		camera.position.y = height;

		// 2. Resolve controls instance
		const controls =
			controlsRef?.current ?? (stateControls as OrbitControlsImpl | null);

		// 3. Compute horizontal forward direction (XZ plane only)
		camera.getWorldDirection(_forward);
		_forward.y = 0;
		if (_forward.lengthSq() > 0.0001) {
			_forward.normalize();
		} else {
			_forward.set(0, 0, -1);
		}

		// 4. Compute horizontal right direction
		_right.crossVectors(_forward, camera.up).normalize();

		// 5. Combine keyboard inputs
		_moveDir.set(0, 0, 0);
		const keys = activeKeys.current;

		if (keys.has("w") || keys.has("arrowup")) {
			_moveDir.add(_forward);
		}
		if (keys.has("s") || keys.has("arrowdown")) {
			_moveDir.sub(_forward);
		}
		if (keys.has("d") || keys.has("arrowright")) {
			_moveDir.add(_right);
		}
		if (keys.has("a") || keys.has("arrowleft")) {
			_moveDir.sub(_right);
		}

		if (_moveDir.lengthSq() > 0) {
			_moveDir.normalize();
		}

		// 6. Smooth acceleration & damping
		const targetVelocity = _moveDir.multiplyScalar(speed);
		const dampFactor = Math.min(1, delta * 12);
		velocity.current.lerp(targetVelocity, dampFactor);

		// 7. Apply translation to both camera and OrbitControls target (2D move)
		const deltaX = velocity.current.x * delta;
		const deltaZ = velocity.current.z * delta;

		if (Math.abs(deltaX) > 0.00001 || Math.abs(deltaZ) > 0.00001) {
			camera.position.x += deltaX;
			camera.position.z += deltaZ;

			if (controls) {
				controls.target.x += deltaX;
				controls.target.z += deltaZ;
			}
		}

		// 8. Update controls damping
		if (controls) {
			controls.update();
		}
	});

	return null;
}

export default SmoothCameraController;
