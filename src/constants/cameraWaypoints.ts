import * as THREE from "three";
import { MenuType } from "@/constants/menuConfig.ts";

export interface CameraWaypoint {
	/** Camera 3D position [x, y, z] */
	position: [number, number, number];
	/** Target point in 3D space to focus on [x, y, z] */
	target: [number, number, number];
	/** Precomputed yaw and pitch (in radians) */
	yaw: number;
	pitch: number;
	/** Optional bound mesh reference */
	mesh?: THREE.Object3D;
}

/**
 * Computes exact Euler yaw & pitch (YXZ order) to orient camera from cameraPos towards targetPos.
 */
export function computeLookAtRotation(
	cameraPos: [number, number, number],
	targetPos: [number, number, number]
): { yaw: number; pitch: number } {
	const dx = targetPos[0] - cameraPos[0];
	const dy = targetPos[1] - cameraPos[1];
	const dz = targetPos[2] - cameraPos[2];
	const dXZ = Math.hypot(dx, dz);
	const yaw = Math.atan2(-dx, -dz);
	const pitch = Math.atan2(dy, dXZ);
	return { yaw, pitch };
}

/**
 * Resolves 3D target coordinates from a bound mesh (THREE.Object3D) or coordinate array.
 */
export function resolveTargetPosition(
	target: THREE.Object3D | [number, number, number],
	offset: [number, number, number] = [0, 0, 0]
): [number, number, number] {
	if (Array.isArray(target)) {
		return [
			target[0] + offset[0],
			target[1] + offset[1],
			target[2] + offset[2],
		];
	}

	const worldPos = new THREE.Vector3();
	target.getWorldPosition(worldPos);
	// Fallback to local position if world matrix is unpopulated or at origin
	if (worldPos.lengthSq() === 0 && target.position.lengthSq() > 0) {
		worldPos.copy(target.position);
	}

	return [
		worldPos.x + offset[0],
		worldPos.y + offset[1],
		worldPos.z + offset[2],
	];
}

/**
 * Creates a camera waypoint by binding directly to a target mesh (or coordinate array),
 * dynamically computing lookAt yaw & pitch from the target's position.
 */
export function createWaypoint(
	position: [number, number, number],
	target: THREE.Object3D | [number, number, number],
	offset: [number, number, number] = [0, 0, 0]
): CameraWaypoint {
	const targetPos = resolveTargetPosition(target, offset);
	const { yaw, pitch } = computeLookAtRotation(position, targetPos);
	return {
		position,
		target: targetPos,
		yaw,
		pitch,
		mesh: target instanceof THREE.Object3D ? target : undefined,
	};
}

/** Seated eye-level height simulating sitting at the desk (~0.80m vs standing 1.75m) */
export const SEATED_EYE_HEIGHT = 0.8;

/**
 * Mapping of menu sections to camera vantage position and target mesh name.
 */
export const WAYPOINT_TARGET_MESHES: Record<
	Exclude<MenuType, typeof MenuType.Hero>,
	{
		position: [number, number, number];
		meshName: string;
		offset?: [number, number, number];
	}
> = {
	[MenuType.TechnicalSkills]: {
		position: [-1.55, SEATED_EYE_HEIGHT, 1.15],
		meshName: "PCTower",
	},
	[MenuType.FeaturedProjects]: {
		position: [-0.85, SEATED_EYE_HEIGHT, 1.25],
		meshName: "Monitor001",
	},
	[MenuType.RecommendedProjects]: {
		position: [-0.75, SEATED_EYE_HEIGHT, 1.2],
		meshName: "Monitor002",
	},
	[MenuType.ProfessionalExperiences]: {
		position: [-0.9, SEATED_EYE_HEIGHT, 1.35],
		meshName: "LapTop.Screen",
	},
	[MenuType.Contact]: {
		position: [-1.0, SEATED_EYE_HEIGHT, 1.15],
		meshName: "Monitor003",
	},
};

/**
 * Resolves a dynamic waypoint for a given section by binding directly to a mesh from the scene or nodes dictionary.
 */
export function resolveWaypointForSection(
	section: MenuType,
	sceneOrNodes: THREE.Object3D | Record<string, THREE.Object3D>
): CameraWaypoint | null {
	if (section === MenuType.Hero) return null;
	const config = WAYPOINT_TARGET_MESHES[section];
	if (!config) return null;

	let mesh: THREE.Object3D | undefined;
	if (sceneOrNodes instanceof THREE.Object3D) {
		mesh =
			sceneOrNodes.getObjectByName(config.meshName) ??
			(config.meshName === "LapTop.Screen"
				? sceneOrNodes.getObjectByName("LapTopScreen") ??
					sceneOrNodes.getObjectByName("LapTop.Body")
				: undefined);
	} else {
		mesh =
			sceneOrNodes[config.meshName] ??
			(config.meshName === "LapTop.Screen"
				? sceneOrNodes["LapTopScreen"] ?? sceneOrNodes["LapTop.Body"]
				: undefined);
	}

	if (mesh) {
		return createWaypoint(config.position, mesh, config.offset);
	}
	return CAMERA_WAYPOINTS[section];
}

/**
 * Creates dynamic waypoints bound to a set of GLTF nodes.
 */
export function createWaypointsFromNodes(
	nodes: Record<string, THREE.Object3D>
): Record<MenuType, CameraWaypoint | null> {
	const resolve = (section: Exclude<MenuType, typeof MenuType.Hero>) => {
		const config = WAYPOINT_TARGET_MESHES[section];
		const mesh = nodes[config.meshName];
		if (mesh) {
			return createWaypoint(config.position, mesh, config.offset);
		}
		return CAMERA_WAYPOINTS[section];
	};

	return {
		[MenuType.Hero]: null,
		[MenuType.TechnicalSkills]: resolve(MenuType.TechnicalSkills),
		[MenuType.FeaturedProjects]: resolve(MenuType.FeaturedProjects),
		[MenuType.RecommendedProjects]: resolve(MenuType.RecommendedProjects),
		[MenuType.ProfessionalExperiences]: resolve(
			MenuType.ProfessionalExperiences
		),
		[MenuType.Contact]: resolve(MenuType.Contact),
	};
}

/**
 * Camera waypoint presets with updated Monitor.001 target coordinates [-0.656, 0.848, -0.162].
 */
export const CAMERA_WAYPOINTS: Record<MenuType, CameraWaypoint | null> = {
	[MenuType.Hero]: null, // Free walk, no forced waypoint
	[MenuType.TechnicalSkills]: createWaypoint(
		[-1.55, SEATED_EYE_HEIGHT, 1.15],
		[-2.29, 0.74, -0.19]
	),
	[MenuType.FeaturedProjects]: createWaypoint(
		[-0.85, SEATED_EYE_HEIGHT, 1.25],
		[-0.656, 0.848, -0.162] // Updated Monitor.001 location
	),
	[MenuType.RecommendedProjects]: createWaypoint(
		[-0.75, SEATED_EYE_HEIGHT, 1.2],
		[0.034, 0.73, 0.542]
	),
	[MenuType.ProfessionalExperiences]: createWaypoint(
		[-0.9, SEATED_EYE_HEIGHT, 1.35],
		[0.201, 0.624, 1.208]
	),
	[MenuType.Contact]: createWaypoint(
		[-1.0, SEATED_EYE_HEIGHT, 1.15],
		[-1.544, 0.82, -0.025]
	),
};
