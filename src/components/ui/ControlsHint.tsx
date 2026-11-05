interface ControlsHintProps {
	playerHeight?: number;
}

export function ControlsHint({ playerHeight = 1.75 }: ControlsHintProps) {
	return (
		<div className="controls-hint" aria-hidden="true">
			<span className="controls-key">W</span>
			<span className="controls-key">A</span>
			<span className="controls-key">S</span>
			<span className="controls-key">D</span>
			<span className="controls-separator">/</span>
			<span className="controls-key">Arrows</span>
			<span className="controls-desc">to walk (Height: {playerHeight}m)</span>
			<span className="controls-dot">•</span>
			<span className="controls-desc">Drag to look around</span>
		</div>
	);
}

export default ControlsHint;
