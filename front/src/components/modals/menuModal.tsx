"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { XIcon } from "../ui/XIcon";
import { MenuItem } from "@/@types";
import Portal from "../Portal/portal";

interface Modalprops {
	openMenu: boolean;
	nature: string;
	onClose: () => void;
}

export default function Modal({ openMenu, nature, onClose }: Modalprops) {
	const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

	// Bloquer le scroll quand la modale est ouverte
	useEffect(() => {
		if (openMenu) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [openMenu]);

	const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

	useEffect(() => {
		if (!openMenu) return;

		async function getMenuItems() {
			try {
				const httpResponse = await fetch(`${BASE_URL}menu/cat/${nature}`);
				const data = await httpResponse.json();
				console.log(data);
				if (httpResponse.ok) {
					setMenuItems(data.menuItemsPerCat1);
				} else {
					throw new Error("L'appel à l'API a échoué, veuillez réessayer...");
				}
			} catch (error) {
				console.log(error);
			}
		}
		getMenuItems();
	}, [openMenu, nature, BASE_URL]);

	if (!openMenu) return null;

	// Récupérer les catégories 2 uniques
	const itemsCat2 = [...new Set(menuItems.map((item) => item.cat2))].filter(
		Boolean
	);

	return (
		<Portal>
			<div
				className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
				onClick={() => onClose()}
			>
				<div
					className="bg-gradient-dark w-full max-w-xl max-sm:h-full sm:max-h-[85%] shadow-lg text-white font-body flex flex-col"
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					{/* HEADER */}
					<div className="flex-shrink-0 m-3">
						<div className="justify-self-end">
							<button
								type="button"
								aria-label="Fermer le menu"
								className="hover:text-secondary transition-colors duration-300 ease-in-out"
							>
								<XIcon onClick={() => onClose()} className="w-6 h-6" />
							</button>
						</div>
						<h3 className="text-2xl text-white font-subtitle font-light justify-self-center pb-6">
							Les {nature} du <span className="text-secondary">BDC</span>
						</h3>
						<div className="font-body">
							<div className="border-b border-secondary">
								<ul className="flex flex-row flex-wrap justify-center gap-3 pb-3 scroll-smooth">
									{itemsCat2.map((cat2) => {
										if (!cat2) return null;
										const safeId = cat2.replace(/\s+/g, "").toLowerCase();
										return (
											<li
												key={safeId}
												className="hover:text-secondary transition-colors duration-300 ease-in-out cursor-pointer"
												onClick={() => {
													const element = document.getElementById(safeId);
													element?.scrollIntoView({
														behavior: "smooth",
														block: "start",
													});
												}}
											>
												{cat2}
											</li>
										);
									})}
								</ul>
							</div>
						</div>
					</div>

					{/* CONTENU SCROLLABLE */}
					<div className="flex-1 min-h-0 overflow-y-auto px-6 pb-3 scroll-smooth ">
						{itemsCat2.map((cat2) => {
							if (!cat2) return null;
							const safeId = cat2.replace(/\s+/g, "").toLowerCase();
							const firstItem = menuItems.find((item) => item.cat2 === cat2);

							const itemsCat3 = [
								...new Set(
									menuItems
										.filter((item) => item.cat2 === cat2)
										.map((item) => item.cat3)
								),
							].filter(Boolean);

							return (
								<div key={safeId} id={safeId}>
									<h4 className="text-secondary text-xl border-b border-white my-3 font-semibold text-center max-w-[80%] flex justify-self-center">
										{cat2}
									</h4>
									{firstItem?.intitule && itemsCat3.length === 0 && (
										<p className="text-right text-sm text-white/80 mb-1">
											{firstItem.intitule}
										</p>
									)}

									{/* Si des cat3 existent, les afficher avec leurs items */}
									{itemsCat3.length > 0 ? (
										itemsCat3.map((cat3) => {
											const firstItemCat3 = menuItems.find(
												(item) => item.cat2 === cat2 && item.cat3 === cat3
											);
											return (
												<div key={cat3} className="mb-4">
													<div className="flex justify-between items-baseline mb-2">
														<h5 className="text-bg">{cat3}</h5>
														{firstItemCat3?.intitule && (
															<p className="text-sm text-white/80">
																{firstItemCat3.intitule}
															</p>
														)}
													</div>
													<ul className="w-full space-y-2">
														{menuItems
															.filter(
																(item) =>
																	item.cat2 === cat2 && item.cat3 === cat3
															)
															.map((item) => (
																<li
																	key={item.id}
																	className="flex items-baseline gap-2"
																>
																	<div className="break-words">{item.name}</div>
																	<div className="flex-shrink-0 border-b border-dotted border-white/80 flex-2 mb-1" />
																	{nature === "plats" && (
																		<div className="shrink-0 text-bg">
																			{item.prix_1} €
																		</div>
																	)}
																	{nature === "boissons" &&
																		(item.prix_3 ? (
																			<div className="shrink-0 text-bg">
																				{item.prix_1} € / {item.prix_2} € /{" "}
																				{item.prix_3} €
																			</div>
																		) : item.prix_2 ? (
																			<div className="shrink-0 text-bg">
																				{item.prix_1} € / {item.prix_2} €
																			</div>
																		) : (
																			<div className="shrink-0 text-bg">
																				{item.prix_1} €
																			</div>
																		))}
																</li>
															))}
													</ul>
												</div>
											);
										})
									) : (
										// Si pas de cat3, afficher directement les items de cat2
										<ul className="w-full space-y-2">
											{menuItems
												.filter((item) => item.cat2 === cat2)
												.map((item) => (
													<li
														key={item.id}
														className="flex items-baseline gap-2"
													>
														<div className="break-words">{item.name}</div>
														<div className="flex-shrink-0 border-b border-dotted border-white/80 flex-2 mb-1" />
														{nature === "plats" && (
															<div className="shrink-0 text-bg">
																{item.prix_1} €
															</div>
														)}
														{nature === "boissons" &&
															(item.prix_3 ? (
																<div className="shrink-0 text-bg">
																	{item.prix_1} € / {item.prix_2} € /{" "}
																	{item.prix_3} €
																</div>
															) : item.prix_2 ? (
																<div className="shrink-0 text-bg">
																	{item.prix_1} € / {item.prix_2} €
																</div>
															) : (
																<div className="shrink-0 text-bg">
																	{item.prix_1} €
																</div>
															))}
													</li>
												))}
										</ul>
									)}
								</div>
							);
						})}
					</div>

					<div className="flex justify-center border-t border-secondary mt-3">
						<a href="/menu.pdf" target="_blank" rel="noopener noreferrer">
							<Button className="m-6" aria-label="Menu en pdf">
								Menu en pdf
							</Button>
						</a>
					</div>
				</div>
			</div>
		</Portal>
	);
}
