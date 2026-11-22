import { useMemo, type ReactNode } from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import "@/three/components/MonitorScreen.css";

export interface MonitorScreenProps {
	/** The 4-vertex screen plane child mesh from the GLTF used to procedurally position/size the screen */
	screenNode?: THREE.Mesh;
	children?: ReactNode;
	title?: string;
	position?: [number, number, number];
	rotation?: [number, number, number];
	distanceFactor?: number;
	/** CSS pixel height of the screen container. Width is always 1024px. */
	screenHeight?: number;
	/** Offset in meters along the face normal to prevent z-fighting with the 3D screen mesh. Default is 0.003 (3mm). */
	normalOffset?: number;
	/** Drei Html zIndexRange. Default is [20, 0] so HUD overlays (SideMenu, Header) stay above the 3D terminal. */
	zIndexRange?: [number, number];
	onClose?: () => void;
}

/**
 * Procedurally derives 3D position, orientation, distance factor,
 * and container pixel height from a 4-vertex screen plane mesh.
 */
function deriveScreenGeometry(node: THREE.Mesh, normalOffset: number) {
	const geom = node.geometry;
	const posAttr = geom.getAttribute("position");
	const normAttr = geom.getAttribute("normal");

	if (!posAttr || posAttr.count < 3) {
		return null;
	}

	const verts: THREE.Vector3[] = [];
	const center = new THREE.Vector3();
	for (let i = 0; i < posAttr.count; i++) {
		const v = new THREE.Vector3(
			posAttr.getX(i),
			posAttr.getY(i),
			posAttr.getZ(i)
		);
		verts.push(v);
		center.add(v);
	}
	center.divideScalar(verts.length);

	// Screen face normal (unit vector pointing out from screen face)
	const normal =
		normAttr && normAttr.count > 0
			? new THREE.Vector3(
					normAttr.getX(0),
					normAttr.getY(0),
					normAttr.getZ(0)
				).normalize()
			: new THREE.Vector3(0, 0, 1);

	// Screen up direction: project world up [0, 1, 0] onto the screen plane
	const worldUp = new THREE.Vector3(0, 1, 0);
	const projUp = worldUp
		.clone()
		.sub(normal.clone().multiplyScalar(worldUp.dot(normal)));
	const up =
		projUp.lengthSq() > 0.0001
			? projUp.normalize()
			: new THREE.Vector3(0, 0, -1);
	const right = new THREE.Vector3().crossVectors(up, normal).normalize();

	// Calculate width and height by projecting vertices onto screen basis vectors
	let minU = Infinity;
	let maxU = -Infinity;
	let minV = Infinity;
	let maxV = -Infinity;

	for (const v of verts) {
		const rel = v.clone().sub(center);
		const u = rel.dot(right);
		const vCoord = rel.dot(up);
		if (u < minU) minU = u;
		if (u > maxU) maxU = u;
		if (vCoord < minV) minV = vCoord;
		if (vCoord > maxV) maxV = vCoord;
	}

	const width = maxU - minU;
	const height = maxV - minV;

	// Rotation matrix from basis vectors (right, up, normal)
	const matrix = new THREE.Matrix4().makeBasis(right, up, normal);
	const euler = new THREE.Euler().setFromRotationMatrix(matrix, "XYZ");

	// distanceFactor matches 1024px container width with physical screen width in 3D
	const distanceFactor = (width * 400) / 1024;
	const screenHeight = width > 0 ? Math.round((1024 * height) / width) : 576;

	// Offset along normal from center to prevent z-fighting with the emissive 3D plane
	const pos = center.clone().add(normal.clone().multiplyScalar(normalOffset));

	return {
		position: [pos.x, pos.y, pos.z] as [number, number, number],
		rotation: [euler.x, euler.y, euler.z] as [number, number, number],
		distanceFactor,
		screenHeight,
	};
}

export function MonitorScreen({
	screenNode,
	children,
	title = "— Terminal",
	position,
	rotation,
	distanceFactor,
	screenHeight,
	normalOffset = 0.003,
	zIndexRange = [20, 0],
	onClose,
}: MonitorScreenProps) {
	const derived = useMemo(() => {
		if (!screenNode) return null;
		return deriveScreenGeometry(screenNode, normalOffset);
	}, [screenNode, normalOffset]);

	const finalPosition = position ?? derived?.position ?? [0, 0, 0.003];
	const finalRotation = rotation ?? derived?.rotation ?? [0, 0, 0];
	const finalDistanceFactor =
		distanceFactor ?? derived?.distanceFactor ?? 0.415;
	const finalScreenHeight = screenHeight ?? derived?.screenHeight ?? 554;

	return (
		<Html
			transform
			occlude
			zIndexRange={zIndexRange}
			position={finalPosition}
			rotation={finalRotation}
			distanceFactor={finalDistanceFactor}
			className="monitor-html-host"
		>
			<div
				className="monitor-screen-container"
				style={{ height: `${finalScreenHeight}px` }}
			>
				<div className="monitor-screen-header">
					<div className="monitor-screen-dots">
						<span
							className="monitor-screen-dot red"
							role="button"
							tabIndex={0}
							onClick={onClose}
							title="Close (Esc)"
							style={{ cursor: onClose ? "pointer" : "default" }}
						/>
						<span className="monitor-screen-dot yellow" />
						<span className="monitor-screen-dot green" />
					</div>
					<div className="monitor-screen-tab">{title}</div>
				</div>
				<div className="monitor-screen-content">{children}</div>
			</div>
		</Html>
	);
}

export default MonitorScreen;
