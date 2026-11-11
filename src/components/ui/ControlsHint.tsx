import { useTranslation } from "react-i18next";
import "@/components/ui/ControlsHint.css";

interface ControlsHintProps {
	playerHeight?: number;
}

export function ControlsHint({ playerHeight = 1.75 }: ControlsHintProps) {
	const { t } = useTranslation();

	return (
		<div className="controls-hint" aria-hidden="true">
			<span className="controls-key">W</span>
			<span className="controls-key">A</span>
			<span className="controls-key">S</span>
			<span className="controls-key">D</span>
			<span className="controls-separator">/</span>
			<span className="controls-key">
				{t("controls.keys.arrows", "Arrows")}
			</span>
			<span className="controls-desc">
				{t("controls.walkWithHeight", {
					height: playerHeight,
					defaultValue: `to walk (Height: ${playerHeight}m)`,
				})}
			</span>
			<span className="controls-dot">•</span>
			<span className="controls-desc">
				{t("controls.look", "Drag to look around")}
			</span>
			<span className="controls-dot">•</span>
			<span className="controls-key">F</span>
			<span className="controls-desc">
				{t("controls.fps", "FPS")}
			</span>
		</div>
	);
}

export default ControlsHint;
