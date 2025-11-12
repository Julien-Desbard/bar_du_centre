import { Edit, Trash } from "lucide-react";
import { CarteItems } from "../sections/admin/carteAdmin";

interface CarteProps {
	carteItems: CarteItems[];
	setOpenEdit: (openEdit: boolean) => void;
	setOpenDelete: (openDelete: boolean) => void;
	setId: (id: number) => void;
	setName: (name: string) => void;
	setCategorie: (categorie: string) => void;
	setPrix: (prix: string) => void;
}

export default function AdminCarteList({ carteItems, setId, setName, setCategorie, setPrix, setOpenEdit, setOpenDelete}: CarteProps) {
	return (
		<>
			<div className="justify-self-center">
				<div className="mb-8">
					<div className="px-3 w-full">
						<div>
							<div>
								<div className="grid grid-cols-[minmax(75px,1fr)_minmax(200px,3fr)_70px_28px_28px] gap-2 font-bold">
									<div>Catégorie</div>
									<div>Nom</div>
									<div className="text-center">Prix</div>
								</div>
							</div>
							{carteItems?.map((item, index) => {
                                if (!item) return null
								return (
									<div
										key={item.id}
										className="grid grid-cols-[minmax(75px,1fr)_minmax(200px,3fr)_70px_28px_28px] gap-2 py-1"
									>
										<input
											type="text"
											name="categorie"
											value={item.categorie}
											className="border border-secondary p-2 bg-transparent text-white"
											readOnly
										/>
										<input
											type="text"
											name="nom"
											value={item.name}
											className="border border-secondary p-2 bg-transparent text-white"
											readOnly
										/>{" "}
										<input
											type="text"
											name="prix"
											value={item.prix}
											className="border border-secondary p-2 bg-transparent text-white"
											readOnly
										/>
										<button
											type="button"
											onClick={() => {
												setOpenEdit(true);
												setId(item.id);
												setName(item.name);
												setCategorie(item.categorie);
												setPrix(item.prix);
											}}
											className="flex items-center justify-center"
										>
											<Edit className="w-5 h-5 cursor-pointer hover:text-secondary transition-colors duration-300" />
										</button>
										<button
											type="button"
											onClick={() => {
												setOpenDelete(true);
												setId(item.id);
												setName(item.name);
											}}
											className="flex items-center justify-center"
										>
											<Trash className="w-5 h-5 cursor-pointer hover:text-secondary transition-colors duration-300" />
										</button>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
