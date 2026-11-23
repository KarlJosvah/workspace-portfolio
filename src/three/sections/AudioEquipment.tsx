import { RoomMesh } from "@/three/utils/RoomMesh.tsx";
import type { RoomSubComponentProps } from "@/three/utils/roomTypes.ts";

/* -------------------------------------------------------------
 * 4. Audio & Headset Equipment (Speakers, Headsets, Stand)
 * ------------------------------------------------------------*/
export function AudioEquipment({
	nodes,
	glowMaterials,
	materials,
}: RoomSubComponentProps) {
	return (
		<group name="AudioEquipment">
			<RoomMesh
				node={nodes.Speaker001}
				material={glowMaterials.subtle}
				castShadow
			>
				<RoomMesh
					node={nodes.FatuiDelusionElectro}
					material={materials?.FatuiDelusionEletro}
					castShadow
				/>
			</RoomMesh>
			<RoomMesh
				node={nodes.Speaker002}
				material={glowMaterials.subtle}
				castShadow
			>
				<RoomMesh
					node={nodes.FatuiDelusionPyro}
					material={materials?.FatuiDelustionPyro}
					castShadow
				/>
			</RoomMesh>
			<RoomMesh
				node={nodes.HeadSetHolder}
				material={glowMaterials.standard}
				castShadow
			/>
			<RoomMesh
				node={nodes.HeadSet001}
				material={glowMaterials.subtle}
				castShadow
			/>
		</group>
	);
}

export default AudioEquipment;
