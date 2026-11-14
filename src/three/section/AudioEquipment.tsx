import { RoomMesh } from "../utils/RoomMesh.tsx";
import type { RoomSubComponentProps } from "../utils/roomTypes.ts";

/* -------------------------------------------------------------
 * 4. Audio & Headset Equipment (Speakers, Headsets, Stand)
 * ------------------------------------------------------------*/
export function AudioEquipment({
	nodes,
	glowMaterials,
}: RoomSubComponentProps) {
	return (
		<group name="AudioEquipment">
			<RoomMesh
				node={nodes.Speaker001}
				material={glowMaterials.standard}
				castShadow
			/>
			<RoomMesh
				node={nodes.Speaker002}
				material={glowMaterials.standard}
				castShadow
			/>
			<RoomMesh
				node={nodes.HeadSetHolder}
				material={glowMaterials.standard}
				castShadow
			/>
			<RoomMesh
				node={nodes.HeadSet003}
				material={glowMaterials.subtle}
				castShadow
			/>
		</group>
	);
}

export default AudioEquipment;
