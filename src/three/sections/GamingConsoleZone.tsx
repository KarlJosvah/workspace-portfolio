import { useMemo } from "react";
import type * as THREE from "three";
import { RoomMesh } from "@/three/utils/RoomMesh.tsx";
import type { GLTFResult, RoomSubComponentProps } from "@/three/utils/roomTypes.ts";

/**
 * Dynamically discovers PS5 and Xbox controllers from the GLB nodes.
 * Matches names like "PS5.Controller.001", "Xbox.Controller.001", sorted numerically.
 */
function getGameControllers(nodes: GLTFResult["nodes"]): THREE.Mesh[] {
	return (Object.values(nodes) as THREE.Mesh[])
		.filter(
			(node): node is THREE.Mesh =>
				Boolean(node?.name && /(?:PS5|Xbox)[._]?Controller/i.test(node.name))
		)
		.sort((a, b) =>
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
	const gameControllers = useMemo(
		() => getGameControllers(nodes),
		[nodes]
	);

	return (
		<group name="GamingConsoleZone">
			<RoomMesh
				node={nodes.ShelveConsole}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			>
				<RoomMesh
					node={nodes.LED010}
					material={glowMaterials.ledStrips}
					castShadow
				/>
				<RoomMesh
					node={nodes.LED011}
					material={glowMaterials.ledStrips}
					castShadow
				/>
				<RoomMesh
					node={nodes.LED012}
					material={glowMaterials.ledStrips}
					castShadow
				/>
				<RoomMesh
					node={nodes.LED013}
					material={glowMaterials.ledStrips}
					castShadow
				/>
			</RoomMesh>
			<RoomMesh
				node={nodes.Shelve001}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			>
				<RoomMesh
					node={nodes.LED005}
					material={glowMaterials.ledStrips}
					castShadow
				/>
			</RoomMesh>
			<RoomMesh
				node={nodes.Monitor004}
				material={glowMaterials.screen}
				castShadow
				receiveShadow
			>
				<RoomMesh
					node={nodes.LED006}
					material={glowMaterials.ledStrips}
					castShadow
				/>
				<RoomMesh
					node={nodes.LED007}
					material={glowMaterials.ledStrips}
					castShadow
				/>
				<RoomMesh
					node={nodes.LED008}
					material={glowMaterials.ledStrips}
					castShadow
				/>
				<RoomMesh
					node={nodes.LED009}
					material={glowMaterials.ledStrips}
					castShadow
				/>
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
			<RoomMesh
				node={nodes.SwitchJoyConRight}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.SwitchJoyConLeft}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.SwitchJoyConRight001}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.SwitchJoyConLeft001}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.SwitchJoyConRight002}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.SwitchJoyConLeft002}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.AVR002}
				material={glowMaterials.standard}
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
