interface MenuButtonProps {
	label: string;
	isActive: boolean;
	onClick: () => void;
}

export function MenuButton({ label, isActive, onClick }: MenuButtonProps) {
	return (
		<button
			type="button"
			className={`menu-button ${isActive ? "active" : ""}`}
			onClick={onClick}
			aria-pressed={isActive}
		>
			<span className="menu-button-glow" />
			<span className="menu-button-label">{label}</span>
		</button>
	);
}

export default MenuButton;
