interface DrinksProps {
    drinks: (string | undefined)[];
    setCategory : (category : string) => void;
    setCategoryName : (categoryName : string) => void;
    setActiveSafeid : (activeSafeid : string) => void; 
    activeSafeid: string
}
export default function AdminDrinksList ({setCategory, setCategoryName, setActiveSafeid, drinks, activeSafeid} : DrinksProps) {


    return (
        <>
        <ul className="flex flex-row flex-wrap gap-3 m-3 flex-3 justify-start">
						{drinks.map((cat2) => {
							if (!cat2) return null;
							const safeId = cat2.replace(/\s+/g, "").toLowerCase();
							return (
								<li
									key={safeId}
									className={`text-xl hover:text-secondary transition-colors duration-300 ease-in-out cursor-pointer ${
										activeSafeid === safeId
											? "text-secondary  font-semibold"
											: ""
									}`}
									onClick={() => {
										setCategory(cat2.replace(/\s+/g, "_").toLowerCase());
										setCategoryName(cat2);
										setActiveSafeid(safeId);
									}}
								>
									{cat2}
								</li>
							);
						})}
					</ul>
        </>
    )}
