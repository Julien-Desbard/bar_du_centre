import { CarteItems } from "../sections/Menu";

interface CategoryList {
	items: CarteItems[];
}

export default function CategoryCarte({ items }: CategoryList) {
	if (!items || items.length === 0) return null;

	// Regrouper les éléments par catégorie
	const groupedByCategory: { [key: string]: CarteItems[] } = {};
	
	items.forEach((item) => {
		if (!item || !item.categorie) return;
		if (!groupedByCategory[item.categorie]) {
			groupedByCategory[item.categorie] = [];
		}
		groupedByCategory[item.categorie].push(item);
	});

	// Afficher chaque catégorie avec tous ses éléments
	return Object.entries(groupedByCategory).map(([categorie, categoryItems]) => (
		<div key={categorie}>
			<h3 className="text-2xl pb-1 font-light text-center text-secondary">
				{categorie}
			</h3>
			<ul className="w-full">
				{categoryItems.map((item) => (
					<li key={item.id} className="flex items-baseline gap-2">
						<span className="flex-1 break-words text-xl">{item.name}</span>
						<span className="shrink-0 text-bg font-semibold">{item.prix}€</span>
					</li>
				))}
			</ul>
		</div>
	));
}