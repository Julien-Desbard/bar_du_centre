interface FoodProps {
    food : (string | undefined)[];
    activeSafeid : string;
setCategory: (category : string) => void;
setCategoryName : (categoryName : string) => void;
setActiveSafeid : (activeSafeid : string) => void;


}

export default function AdminFoodList ({food, activeSafeid, setCategory, setCategoryName, setActiveSafeid}: FoodProps) {
    return (
        <>
        <ul className="flex flex-row flex-wrap gap-3 m-3 flex-3 justify-start">
						{food.map((cat2) => {
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
    )
}