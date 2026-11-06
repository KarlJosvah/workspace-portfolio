import { MenuType } from "@/constants/menuConfig.ts";

export interface CameraWaypoint {
	/** Camera 3D position [x, y, z] */
	position: [number, number, number];
	/** Target point in 3D space to focus on [x, y, z] */
	target: [number, number, number];
	/** Precomputed yaw and pitch (in radians) */
	yaw: number;
	pitch: number;
}

/**
 * Computes exact Euler yaw & pitch (YXZ order) to orient camera from cameraPos towards targetPos.
 */
export function computeLookAtRotation(
	cameraPos: [number, number, number],
	targetPos: [number, number, number],
): { yaw: number; pitch: number } {
	const dx = targetPos[0] - cameraPos[0];
	const dy = targetPos[1] - cameraPos[1];
	const dz = targetPos[2] - cameraPos[2];
	const dXZ = Math.hypot(dx, dz);
	const yaw = Math.atan2(-dx, -dz);
	const pitch = Math.atan2(dy, dXZ);
	return { yaw, pitch };
}

function createWaypoint(
	position: [number, number, number],
	target: [number, number, number],
): CameraWaypoint {
	const { yaw, pitch } = computeLookAtRotation(position, target);
	return { position, target, yaw, pitch };
}

/** Seated eye-level height simulating sitting at the desk (~0.80m vs standing 1.75m) */
export const SEATED_EYE_HEIGHT = 0.8;

/**
 * Camera waypoint presets for each section:
 * - Hero: none (free walk)
 * - TechnicalSkills: Looking at PCTower [-2.29, 0.74, -0.19]
 * - FeaturedProjects: Shifted slightly left to face the main monitor & keyboard [-0.85, 1.15, 1.25]
 * - RecommendedProjects: Moved more to the left & closer to face the screen with mug [-0.75, 1.15, 1.20]
 * - ProfessionalExperiences: Repositioned away to prevent top-down look, viewing laptop screen [-0.90, 1.15, 1.35]
 * - Contact: Moved right and forward to focus on standing vertical screen [-1.00, 1.15, 1.15]
 */
export const CAMERA_WAYPOINTS: Record<MenuType, CameraWaypoint | null> = {
	[MenuType.Hero]: null, // Free walk, no forced waypoint
	[MenuType.TechnicalSkills]: createWaypoint(
		[-1.55, SEATED_EYE_HEIGHT, 1.15],
		[-2.29, 0.74, -0.19],
	),
	[MenuType.FeaturedProjects]: createWaypoint(
		[-0.85, SEATED_EYE_HEIGHT, 1.25],
		[-0.693, 0.78, -0.099],
	),
	[MenuType.RecommendedProjects]: createWaypoint(
		[-0.75, SEATED_EYE_HEIGHT, 1.20],
		[0.034, 0.73, 0.542],
	),
	[MenuType.ProfessionalExperiences]: createWaypoint(
		[-0.90, SEATED_EYE_HEIGHT, 1.35],
		[0.13, 0.68, 1.182],
	),
	[MenuType.Contact]: createWaypoint(
		[-1.00, SEATED_EYE_HEIGHT, 1.15],
		[-1.544, 0.82, -0.025],
	),
};
