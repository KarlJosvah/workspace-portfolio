import * as THREE from "three";

/**
 * Tunable emission intensity levels (Pattern 1: Tiered Material Clones).
 * Adjust these values directly here in code to balance glow and bloom.
 */
export const EMISSION_LEVELS = {
	standard: 0.0, // Base non-glowing objects (furniture, walls, floor, props)
	subtle: 1.5, // Subtle backlights & indicators (keyboard, mouse, cooling pad)
	screen: 2.0, // Monitor & laptop displays
	lamp: 2.2, // All basic lamps that should light the room
	pcAccents: 3.5, // PC tower internal cyber glow
	wallArt: 2.3, // Wings of Freedom wall plaque
	neonSigns: 5.0, // PlayStation neon wall symbols
	ledStrips: 1.2, // Ambient LED edge strips & screen bias lights
} as const;

export type EmissionTier = keyof typeof EMISSION_LEVELS;
export type GlowMaterials = Record<EmissionTier, THREE.MeshStandardMaterial>;

/**
 * Creates independent material clones from the base palette material.
 * Reuses the same underlying texture buffer in GPU memory with zero texture overhead.
 */
export function createGlowMaterials(
	baseMaterial: THREE.MeshStandardMaterial
): GlowMaterials {
	const createTier = (intensity: number) => {
		const mat = baseMaterial.clone();
		mat.emissiveIntensity = intensity;
		return mat;
	};

	return {
		standard: createTier(EMISSION_LEVELS.standard),
		subtle: createTier(EMISSION_LEVELS.subtle),
		screen: createTier(EMISSION_LEVELS.screen),
		lamp: createTier(EMISSION_LEVELS.lamp),
		pcAccents: createTier(EMISSION_LEVELS.pcAccents),
		wallArt: createTier(EMISSION_LEVELS.wallArt),
		neonSigns: createTier(EMISSION_LEVELS.neonSigns),
		ledStrips: createTier(EMISSION_LEVELS.ledStrips),
	};
}
