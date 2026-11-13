import type { ReactNode } from "react";
import { Html } from "@react-three/drei";
import "./MonitorScreen.css";

export interface MonitorScreenProps {
	children?: ReactNode;
	title?: string;
	position?: [number, number, number];
	rotation?: [number, number, number];
	distanceFactor?: number;
	/** CSS pixel height of the screen container. Width is always 1024px. */
	screenHeight?: number;
	onClose?: () => void;
}

export function MonitorScreen({
	children,
	title = "— Terminal",
	position = [-0.0025, 0, 0.015],
	rotation = [0, -0.2291, 0],
	distanceFactor = 0.415,
	screenHeight = 554,
	onClose,
}: MonitorScreenProps) {
	return (
		<Html
			transform
			occlude
			position={position}
			rotation={rotation}
			distanceFactor={distanceFactor}
			className="monitor-html-host"
		>
			<div
				className="monitor-screen-container"
				style={{ height: `${screenHeight}px` }}
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
