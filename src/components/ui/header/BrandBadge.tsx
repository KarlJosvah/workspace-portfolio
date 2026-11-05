interface BrandBadgeProps {
	title?: string;
}

export function BrandBadge({ title = "Workspace 3D" }: BrandBadgeProps) {
	return (
		<div className="brand-badge">
			<span className="brand-dot" />
			<span className="brand-title">{title}</span>
		</div>
	);
}

export default BrandBadge;
