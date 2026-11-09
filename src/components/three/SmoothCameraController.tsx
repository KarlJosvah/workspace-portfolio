/* eslint-disable react-hooks/immutability */
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { MenuType } from "@/constants/menuConfig.ts";
import {
	CAMERA_WAYPOINTS,
	resolveWaypointForSection,
} from "@/constants/cameraWaypoints.ts";

export interface SmoothCameraControllerProps {
	/** Player eye-level height in units (default 1.75) */
	height?: number;
	/** Walking movement speed in units/sec (default 3.5) */
	speed?: number;
	/** Mouse look sensitivity (default 0.0024) */
	sensitivity?: number;
	/** Initial yaw rotation in radians (default 0) */
	initialYaw?: number;
	/** Initial pitch rotation in radians (default -0.12, slightly down at desk) */
	initialPitch?: number;
	/** Current active menu section to glide towards */
	activeSection?: MenuType | null;
}

// Temporary vectors to avoid allocations inside useFrame loop
const _forward = new THREE.Vector3();
const _right = new THREE.Vector3();
const _moveDir = new THREE.Vector3();
const _startPos = new THREE.Vector3();
const _targetPos = new THREE.Vector3();

/**
 * Cubic ease-in-out curve for cinematic camera acceleration and deceleration.
 */
function easeInOutCubic(x: number): number {
	return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export function SmoothCameraController({
	height = 1.75,
	speed = 3.5,
	sensitivity = 0.0024,
	initialYaw = 0,
	initialPitch = -0.12,
	activeSection = null,
}: SmoothCameraControllerProps) {
	const { camera, gl, scene } = useThree();

	// Orientation state (Yaw & Pitch)
	const targetYaw = useRef(initialYaw);
	const targetPitch = useRef(initialPitch);
	const currentYaw = useRef(initialYaw);
	const currentPitch = useRef(initialPitch);

	// Movement state
	const activeKeys = useRef<Set<string>>(new Set());
	const velocity = useRef(new THREE.Vector3(0, 0, 0));

	// Mouse / touch drag state
	const isDragging = useRef(false);
	const lastPointer = useRef({ x: 0, y: 0 });

	// Waypoint transition state
	const isTransitioning = useRef(false);
	const transitionProgress = useRef(0);
	const transitionDuration = useRef(1.4);
	const startYaw = useRef(initialYaw);
	const startPitch = useRef(initialPitch);
	const diffYaw = useRef(0);
	const targetPitchVal = useRef(initialPitch);

	// Initialize camera orientation with YXZ Euler order
	useEffect(() => {
		camera.rotation.order = "YXZ";
		camera.rotation.y = initialYaw;
		camera.rotation.x = initialPitch;
		camera.rotation.z = 0;
	}, [camera, initialPitch, initialYaw]);

	// Listen to activeSection changes to trigger waypoint glide
	useEffect(() => {
		if (!activeSection) return;
		const waypoint =
			resolveWaypointForSection(activeSection, scene) ??
			CAMERA_WAYPOINTS[activeSection];
		if (!waypoint) return;

		_startPos.copy(camera.position);
		_targetPos.set(...waypoint.position);

		startYaw.current = currentYaw.current;
		startPitch.current = currentPitch.current;

		// Shortest angular distance for yaw (avoid 360-degree spins)
		let dy = (waypoint.yaw - currentYaw.current) % (Math.PI * 2);
		if (dy > Math.PI) dy -= Math.PI * 2;
		if (dy < -Math.PI) dy += Math.PI * 2;
		diffYaw.current = dy;

		targetPitchVal.current = waypoint.pitch;

		transitionProgress.current = 0;
		transitionDuration.current = 1.4;
		isTransitioning.current = true;
	}, [activeSection, camera.position, scene]);

	// Disable scroll / pinch zoom on the canvas (No zoom allowed)
	useEffect(() => {
		const canvas = gl.domElement;
		const handleWheel = (e: WheelEvent) => {
			e.preventDefault();
		};

		canvas.addEventListener("wheel", handleWheel, { passive: false });
		return () => {
			canvas.removeEventListener("wheel", handleWheel);
		};
	}, [gl]);

	// Keyboard controls (WASD & Directional Arrows)
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

				// Immediately cancel scripted transition when user walks
				if (isTransitioning.current) {
					isTransitioning.current = false;
					targetYaw.current = currentYaw.current;
					targetPitch.current = currentPitch.current;
				}
			}
		};

		const handleKeyUp = (e: KeyboardEvent) => {
			activeKeys.current.delete(e.key.toLowerCase());
		};

		const handleBlur = () => {
			activeKeys.current.clear();
			isDragging.current = false;
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

	// First-person mouse & touch drag-to-look (Look around in place)
	useEffect(() => {
		const canvas = gl.domElement;

		const handlePointerDown = (e: PointerEvent) => {
			if (e.button !== 0 && e.pointerType === "mouse") return;
			isDragging.current = true;
			lastPointer.current = { x: e.clientX, y: e.clientY };
			canvas.style.cursor = "grabbing";
		};

		const handlePointerMove = (e: PointerEvent) => {
			if (!isDragging.current) return;

			const deltaX = e.clientX - lastPointer.current.x;
			const deltaY = e.clientY - lastPointer.current.y;
			lastPointer.current = { x: e.clientX, y: e.clientY };

			// Cancel waypoint transition seamlessly if user drags mouse to look
			if (isTransitioning.current && (deltaX !== 0 || deltaY !== 0)) {
				isTransitioning.current = false;
				targetYaw.current = currentYaw.current;
				targetPitch.current = currentPitch.current;
			}

			// Rotate horizontally (yaw) and vertically (pitch)
			targetYaw.current -= deltaX * sensitivity;
			targetPitch.current -= deltaY * sensitivity;

			// Clamp pitch between -85° and +85° to prevent upside-down flipping
			const maxPitch = 1.48; // ~85 degrees
			targetPitch.current = Math.max(
				-maxPitch,
				Math.min(maxPitch, targetPitch.current)
			);
		};

		const handlePointerUp = () => {
			isDragging.current = false;
			canvas.style.cursor = "grab";
		};

		canvas.style.cursor = "grab";
		canvas.addEventListener("pointerdown", handlePointerDown);
		window.addEventListener("pointermove", handlePointerMove);
		window.addEventListener("pointerup", handlePointerUp);
		window.addEventListener("pointercancel", handlePointerUp);

		return () => {
			canvas.removeEventListener("pointerdown", handlePointerDown);
			window.removeEventListener("pointermove", handlePointerMove);
			window.removeEventListener("pointerup", handlePointerUp);
			window.removeEventListener("pointercancel", handlePointerUp);
		};
	}, [gl, sensitivity]);

	useFrame((_, delta) => {
		// 1. Scripted Waypoint Transition (Cinematic easing curve)
		if (isTransitioning.current) {
			transitionProgress.current += delta / transitionDuration.current;
			const t = Math.min(1, transitionProgress.current);
			const eased = easeInOutCubic(t);

			// Lerp 3D position
			camera.position.lerpVectors(_startPos, _targetPos, eased);

			// Lerp orientation angles
			currentYaw.current = startYaw.current + diffYaw.current * eased;
			currentPitch.current = THREE.MathUtils.lerp(
				startPitch.current,
				targetPitchVal.current,
				eased
			);

			targetYaw.current = currentYaw.current;
			targetPitch.current = currentPitch.current;

			camera.rotation.order = "YXZ";
			camera.rotation.y = currentYaw.current;
			camera.rotation.x = currentPitch.current;
			camera.rotation.z = 0;

			// Transition complete -> smoothly transition to free-look
			if (t >= 1) {
				isTransitioning.current = false;
			}
			return;
		}

		// 2. Smoothly damp camera rotation in place (first-person look around)
		const rotDamp = Math.min(1, delta * 20);
		currentYaw.current = THREE.MathUtils.lerp(
			currentYaw.current,
			targetYaw.current,
			rotDamp
		);
		currentPitch.current = THREE.MathUtils.lerp(
			currentPitch.current,
			targetPitch.current,
			rotDamp
		);

		camera.rotation.order = "YXZ";
		camera.rotation.y = currentYaw.current;
		camera.rotation.x = currentPitch.current;
		camera.rotation.z = 0;

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

		// 5. Combine keyboard inputs for 2D move
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

		// 6. Smooth velocity acceleration & damping
		const targetVelocity = _moveDir.multiplyScalar(speed);
		const moveDamp = Math.min(1, delta * 12);
		velocity.current.lerp(targetVelocity, moveDamp);

		// 7. Apply 2D movement
		const deltaX = velocity.current.x * delta;
		const deltaZ = velocity.current.z * delta;

		const isWalking =
			Math.abs(deltaX) > 0.00001 || Math.abs(deltaZ) > 0.00001;
		if (isWalking) {
			camera.position.x += deltaX;
			camera.position.z += deltaZ;

			// While walking, smoothly return eye height to standing height
			camera.position.y = THREE.MathUtils.lerp(
				camera.position.y,
				height,
				Math.min(1, delta * 3)
			);
		}
	});

	return null;
}

export default SmoothCameraController;
