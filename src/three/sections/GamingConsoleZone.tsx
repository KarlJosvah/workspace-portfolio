import { useMemo } from "react";
import type * as THREE from "three";
import { RoomMesh } from "@/three/utils/RoomMesh.tsx";
import type {
	GLTFResult,
	RoomSubComponentProps,
} from "@/three/utils/roomTypes.ts";

/**
 * Dynamically discovers PS5 and Xbox controllers from the GLB nodes.
 * Matches names like "PS5.Controller.001", "Xbox.Controller.001", sorted numerically.
 */
function getGameControllers(nodes: GLTFResult["nodes"]): THREE.Mesh[] {
	return (Object.values(nodes) as THREE.Mesh[])
		.filter((node): node is THREE.Mesh =>
			Boolean(
				node?.name && /(?:PS5|Xbox)[._]?Controller/i.test(node.name)
			)
		)
		.sort((a, b) =>
			a.name.localeCompare(b.name, undefined, { numeric: true })
		);
}

/**
 * Dynamically discovers Nintendo Switch Joy-Con meshes from the GLB nodes.
 * Matches names like "Switch.Joy.Con.Left", "SwitchJoyConRight001", etc.
 */
function getSwitchJoyCons(nodes: GLTFResult["nodes"]): THREE.Mesh[] {
	return (Object.values(nodes) as THREE.Mesh[])
		.filter((node): node is THREE.Mesh =>
			Boolean(node?.name && /^Switch\.?Joy\.?Con/i.test(node.name))
		)
		.sort((a, b) =>
			a.name.localeCompare(b.name, undefined, { numeric: true })
		);
}

/**
 * Dynamically discovers LED strip meshes mounted on the TV console shelf.
 */
function getConsoleLEDs(nodes: GLTFResult["nodes"]): THREE.Mesh[] {
	const consoleMesh = nodes.ShelveConsole;
	const children = (consoleMesh?.children ?? []) as THREE.Mesh[];
	return (
		children.length > 0
			? children.filter((c) => /^LED/i.test(c.name))
			: (Object.values(nodes) as THREE.Mesh[]).filter((n) =>
					/^LED\.?01[0-3]/i.test(n.name)
				)
	).sort((a, b) =>
		a.name.localeCompare(b.name, undefined, { numeric: true })
	);
}

/**
 * Dynamically discovers LED strip meshes mounted on upper shelf 001.
 */
function getShelve001LEDs(nodes: GLTFResult["nodes"]): THREE.Mesh[] {
	const shelve = nodes.Shelve001;
	const children = (shelve?.children ?? []) as THREE.Mesh[];
	return (
		children.length > 0
			? children.filter((c) => /^LED/i.test(c.name))
			: (Object.values(nodes) as THREE.Mesh[]).filter((n) =>
					/^LED\.?005/i.test(n.name)
				)
	).sort((a, b) =>
		a.name.localeCompare(b.name, undefined, { numeric: true })
	);
}

/**
 * Dynamically discovers LED backlight strip meshes mounted on the main TV (Monitor004).
 */
function getTVLEDs(nodes: GLTFResult["nodes"]): THREE.Mesh[] {
	const tv = nodes.Monitor004;
	const children = (tv?.children ?? []) as THREE.Mesh[];
	return (
		children.length > 0
			? children.filter((c) => /^LED/i.test(c.name))
			: (Object.values(nodes) as THREE.Mesh[]).filter((n) =>
					/^LED\.?00[6-9]/i.test(n.name)
				)
	).sort((a, b) =>
		a.name.localeCompare(b.name, undefined, { numeric: true })
	);
}

/* -------------------------------------------------------------
 * 6. Gaming & Entertainment Wall (TV Console, TV with Backlight, Soundbar, Remote, Game Shelves, PlayStation Collection, Nintendo Switch & LED Signs)
 * ------------------------------------------------------------*/
export function GamingConsoleZone({
	nodes,
	glowMaterials,
}: RoomSubComponentProps) {
	const gameControllers = useMemo(() => getGameControllers(nodes), [nodes]);
	const switchJoyCons = useMemo(() => getSwitchJoyCons(nodes), [nodes]);
	const consoleLEDs = useMemo(() => getConsoleLEDs(nodes), [nodes]);
	const shelve001LEDs = useMemo(() => getShelve001LEDs(nodes), [nodes]);
	const tvLEDs = useMemo(() => getTVLEDs(nodes), [nodes]);

	return (
		<group name="GamingConsoleZone">
			<RoomMesh
				node={nodes.ShelveConsole}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			>
				{consoleLEDs.map((led) => (
					<RoomMesh
						key={led.name}
						node={led}
						material={glowMaterials.ledStrips}
						castShadow
					/>
				))}
			</RoomMesh>
			<RoomMesh
				node={nodes.Shelve001}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			>
				{shelve001LEDs.map((led) => (
					<RoomMesh
						key={led.name}
						node={led}
						material={glowMaterials.ledStrips}
						castShadow
					/>
				))}
			</RoomMesh>
			<RoomMesh
				node={nodes.Monitor004}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			>
				<RoomMesh
					node={nodes.MonitorScreen004}
					material={glowMaterials.screen}
				/>
				{tvLEDs.map((led) => (
					<RoomMesh
						key={led.name}
						node={led}
						material={glowMaterials.ledStrips}
						castShadow
					/>
				))}
			</RoomMesh>
			<RoomMesh
				node={nodes.MysteryBox}
				material={glowMaterials.lamp}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.Speaker003}
				material={glowMaterials.subtle}
				castShadow
			/>
			<RoomMesh
				node={nodes.TVRemote}
				material={glowMaterials.standard}
				castShadow
			/>
			<RoomMesh
				node={nodes.PSGameShelve}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.PSGameShelveSupport}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.LedPSTriangle}
				material={glowMaterials.neonSigns}
				castShadow
			/>
			<RoomMesh
				node={nodes.LedPSCircle}
				material={glowMaterials.neonSigns}
				castShadow
			/>
			<RoomMesh
				node={nodes.LedPSCross}
				material={glowMaterials.neonSigns}
				castShadow
			/>
			<RoomMesh
				node={nodes.LedPSSquare}
				material={glowMaterials.neonSigns}
				castShadow
			/>
			<RoomMesh
				node={nodes.GIElements}
				material={glowMaterials.neonSigns}
				castShadow
			/>
			<RoomMesh
				node={nodes.TwinsLightWings}
				material={glowMaterials.subtle}
				castShadow
			/>
			<RoomMesh
				node={nodes.PS1}
				material={glowMaterials.subtle}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.PS2}
				material={glowMaterials.subtle}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.PS3}
				material={glowMaterials.subtle}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.PS4}
				material={glowMaterials.subtle}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.PS5}
				material={glowMaterials.subtle}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.XboxX}
				material={glowMaterials.subtle}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.ControllerHanger}
				material={glowMaterials.subtle}
				castShadow
				receiveShadow
			/>
			{gameControllers.map((node) => (
				<RoomMesh
					key={node.name}
					node={node}
					material={glowMaterials.subtle}
					castShadow
					receiveShadow
				/>
			))}
			<RoomMesh
				node={nodes.SwitchSupport}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.SwitchDock}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.SwitchTablet}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			{switchJoyCons.map((node) => (
				<RoomMesh
					key={node.name}
					node={node}
					material={glowMaterials.standard}
					castShadow
					receiveShadow
				/>
			))}
			<RoomMesh
				node={nodes.AVR002}
				material={glowMaterials.lamp}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.Rocket}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
		</group>
	);
}

export default GamingConsoleZone;
