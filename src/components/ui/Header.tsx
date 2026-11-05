import BrandBadge from "@/components/ui/header/BrandBadge.tsx";
import LangSwitchWrapper from "@/components/ui/header/LangSwitchWrapper.tsx";

export function Header() {
	return (
		<header className="workspace-header">
			<BrandBadge />
			<LangSwitchWrapper />
		</header>
	);
}

export default Header;
