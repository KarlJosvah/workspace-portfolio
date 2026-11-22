import * as THREE from "three";
import { useMemo } from "react";
import { RoomMesh } from "@/three/utils/RoomMesh.tsx";
import type {
	GLTFResult,
	RoomSubComponentProps,
} from "@/three/utils/roomTypes.ts";
import type { GlowMaterials } from "@/constants/emissionConfig.ts";

/* ---------------------------------------------------------------
 * Helpers – dynamic node discovery
 * -------------------------------------------------------------- */

/** All shuriken nodes (Fuma.Shuriken + Shuriken.001…N) */
function getShurikens(nodes: GLTFResult["nodes"]): THREE.Mesh[] {
	return (Object.values(nodes) as THREE.Mesh[]).filter(
		(n) =>
			n != null &&
			Boolean((n as THREE.Mesh).isMesh) &&
			/shuriken/i.test(n.name)
	);
}

/**
 * Root kunai nodes only (Kunai.001, Kunai.002, …).
 * Excludes child accessories like Kunai.Rope and Kunai.Paper.Bomb.
 */
function getKunais(nodes: GLTFResult["nodes"]): THREE.Object3D[] {
	return (Object.values(nodes) as THREE.Object3D[]).filter(
		(n) => n != null && /^Kunai\.?\d+$/i.test(n.name)
	);
}

/** Resolve the material for a kunai child mesh by its name. */
function getKunaiChildMaterial(
	child: THREE.Object3D,
	glowMaterials: GlowMaterials,
	materials: GLTFResult["materials"] | undefined
): THREE.Material | undefined {
	if (/bomb/i.test(child.name)) return materials?.PaperBomb;
	return glowMaterials.standard; // rope or any other accessory
}

/**
 * Dynamically discovers LED strip meshes mounted on the storage shelves.
 */
function getShelfLEDs(nodes: GLTFResult["nodes"]): THREE.Mesh[] {
	const shelves = nodes.Shelves;
	const children = (shelves?.children ?? []) as THREE.Mesh[];
	return (
		children.length > 0
			? children.filter((c) => /^LED/i.test(c.name))
			: (Object.values(nodes) as THREE.Mesh[]).filter((n) =>
					/^LED\.?0(1[4-9]|2[0-1])/i.test(n.name)
				)
	).sort((a, b) =>
		a.name.localeCompare(b.name, undefined, { numeric: true })
	);
}

/* ---------------------------------------------------------------
 * 5. Room Storage & Appliances
 * -------------------------------------------------------------- */
export function RoomFurniture({
	nodes,
	glowMaterials,
	materials,
}: RoomSubComponentProps) {
	const shurikens = useMemo(() => getShurikens(nodes), [nodes]);
	const kunais = useMemo(() => getKunais(nodes), [nodes]);
	const shelfLEDs = useMemo(() => getShelfLEDs(nodes), [nodes]);
	return (
		<group name="RoomFurniture">
			<RoomMesh
				node={nodes.Fridge}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.Snorlax}
				material={materials?.snorlax}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.Shelves}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			>
				{shelfLEDs.map((led) => (
					<RoomMesh
						key={led.name}
						node={led}
						material={glowMaterials.ledStrips}
						castShadow
					/>
				))}
			</RoomMesh>
			<RoomMesh
				node={nodes.AnbuMask}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>

			{/* ── Shurikens (dynamic) ─────────────────────────── */}
			{shurikens.map((shuriken) => (
				<RoomMesh
					key={shuriken.name}
					node={shuriken}
					material={glowMaterials.subtle}
					castShadow
					receiveShadow
				/>
			))}

			{/* ── Kunais (dynamic, children resolved per-mesh) ── */}
			{kunais.map((kunai) => (
				<RoomMesh
					key={kunai.name}
					node={kunai as THREE.Mesh}
					material={glowMaterials.subtle}
					castShadow
					receiveShadow
				>
					{kunai.children.map((child) => (
						<RoomMesh
							key={child.name}
							node={child as THREE.Mesh}
							material={getKunaiChildMaterial(
								child,
								glowMaterials,
								materials
							)}
							castShadow
							receiveShadow
						/>
					))}
				</RoomMesh>
			))}

			<RoomMesh
				node={nodes.Molecules}
				material={glowMaterials.subtle}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.Celestia}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			>
				<RoomMesh
					node={nodes.CelestiaStructures}
					material={glowMaterials.subtle}
					castShadow
					receiveShadow
				/>
			</RoomMesh>
			<RoomMesh
				node={nodes.MarionetteNotebook}
				material={materials?.MarionetteNotebook}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.SwordProps}
				material={glowMaterials.wallArt}
				castShadow
				receiveShadow
			>
				<RoomMesh
					node={nodes.SwordSupport}
					material={glowMaterials.standard}
					castShadow
					receiveShadow
				/>
			</RoomMesh>
		</group>
	);
}

export default RoomFurniture;
