export const MenuType = {
	Hero: "Hero",
	TechnicalSkills: "Technical Skills",
	FeaturedProjects: "Featured Projects",
	RecommendedProjects: "Recommended Projects",
	ProfessionalExperiences: "Professional Experiences",
	Contact: "Contact",
} as const;

export type MenuType = (typeof MenuType)[keyof typeof MenuType];

export interface MenuItem {
	id: MenuType;
	label: string;
	description: string;
}

export const MENU_ITEMS: MenuItem[] = [
	{
		id: MenuType.Hero,
		label: "Hero",
		description: "",
	},
	{
		id: MenuType.TechnicalSkills,
		label: "Technical Skills",
		description: "",
	},
	{
		id: MenuType.FeaturedProjects,
		label: "Featured Projects",
		description: "",
	},
	{
		id: MenuType.RecommendedProjects,
		label: "Recommended Projects",
		description: "",
	},
	{
		id: MenuType.ProfessionalExperiences,
		label: "Professional Experiences",
		description: "",
	},
	{
		id: MenuType.Contact,
		label: "Contact",
		description: "",
	},
];
