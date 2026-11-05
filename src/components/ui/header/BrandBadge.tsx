import { BRAND_TITLE } from "@/constants/global";

interface BrandBadgeProps {
	title?: string;
}

export function BrandBadge({ title = BRAND_TITLE }: BrandBadgeProps) {
	return (
		<div className="brand-badge">
			<span className="brand-dot" />
			<span className="brand-title">{title}</span>
		</div>
	);
}

export default BrandBadge;
