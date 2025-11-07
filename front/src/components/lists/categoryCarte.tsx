import { CarteItems } from "../sections/Menu";

interface CategoryList {
	items: CarteItems[];
}

export default function ({ items }: CategoryList) {
    if (!items || items.length === 0) return null
	return items.map((item, index) => {
		if (!item) return null;
		const previousItem = index > 0 ? items[index - 1] : null;
		const showCategorie =
			item.categorie && item.categorie !== previousItem?.categorie;
		return (
			<div key={item.id}>
				{showCategorie && (
					<h3 className="text-2xl font-light text-center text-secondary">
						{item.categorie}
					</h3>
				)}
				<ul className="w-full space-y-2 px-4">
					<li className="flex items-baseline gap-2">
						<span className="flex-1 break-words text-xl">{item.name}</span>
						<span className="shrink-0 text-bg font-semibold">{item.prix}€</span>
					</li>
				</ul>
			</div>
		);
	});
}
