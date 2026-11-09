import { useMemo } from "react";
import * as THREE from "three";
import { RoomMesh } from "./RoomMesh.tsx";
import type { GLTFResult, RoomSubComponentProps } from "./roomTypes.ts";

interface ChessPieceArrays {
	all: THREE.Mesh[];
	white: THREE.Mesh[];
	black: THREE.Mesh[];
}

/**
 * Dynamically resolves all chess piece meshes from the ChessBoard parent node,
 * falling back to scene graph search if needed.
 */
function getChessPieces(nodes: GLTFResult["nodes"]): ChessPieceArrays {
	const board = nodes.ChessBoard;
	const children = (board?.children ?? []) as THREE.Mesh[];
	const source =
		children.length > 0
			? children
			: (Object.values(nodes) as THREE.Mesh[]).filter(
					(n) => n?.name && /^Chess\.?(White|Black)/i.test(n.name)
				);

	return {
		all: source,
		white: source.filter((p) => /white/i.test(p.name)),
		black: source.filter((p) => /black/i.test(p.name)),
	};
}

export function ChessPieces({ nodes, glowMaterials }: RoomSubComponentProps) {
	const { all: chessPieces } = useMemo(() => getChessPieces(nodes), [nodes]);

	return (
		<>
			{chessPieces.map((piece) => (
				<RoomMesh
					key={piece.name}
					node={piece}
					material={glowMaterials.standard}
					castShadow
				/>
			))}
		</>
	);
}

export function ChessArea({ nodes, glowMaterials }: RoomSubComponentProps) {
	return (
		<group name="ChessArea">
			<RoomMesh
				node={nodes.ChessBoard}
				material={glowMaterials.subtle}
				castShadow
				receiveShadow
			>
				<ChessPieces nodes={nodes} glowMaterials={glowMaterials} />
			</RoomMesh>
			<RoomMesh
				node={nodes.ChessTable}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.ChessChair002}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
			<RoomMesh
				node={nodes.ChessChair001}
				material={glowMaterials.standard}
				castShadow
				receiveShadow
			/>
		</group>
	);
}

export default ChessArea;
