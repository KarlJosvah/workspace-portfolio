interface MenuButtonProps {
	label: string;
	isActive: boolean;
	onClick: () => void;
}

function MenuButton({ label, isActive, onClick }: MenuButtonProps) {
	return (
		<div
			className={`menu-button ${isActive ? "active" : ""}`}
			onClick={onClick}
		>
			{label}
		</div>
	);
}

export default MenuButton;
