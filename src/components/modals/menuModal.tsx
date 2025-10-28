import { Button } from "../ui/button";
import { XIcon } from "../ui/XIcon";

interface Modalprops {
	openMenu: boolean;
	onClose: () => void;
}

export default function Modal({ openMenu, onClose }: Modalprops) {
	if (!openMenu) return null;

	return (
		<div
			className="fixed inset-0 bg-black/50 backdrop-blur z-50 flex flex-col items-center justify-center"
			onClick={() => onClose()}
		>
			<div
				className="bg-[url('/images/background.jpg')] bg-cover bg-center w-full max-w-xl max-sm:h-full sm:max-h-[70%] shadow-lg text-white font-body flex flex-col "
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				{/* HEADER - reste visible */}
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
						Menu du <span className="text-secondary">BDC</span>
					</h3>
					<div className="font-body">
						<div className="border-b border-secondary">
							<ul className="flex flex-row flex-wrap justify-center gap-2 pb-3">
								<li className="hover:text-secondary transition-colors duration-300 ease-in-out">
									Catégorie
								</li>
								<li className="hover:text-secondary transition-colors duration-300 ease-in-out">
									Catégorie
								</li>
								<li className="hover:text-secondary transition-colors duration-300 ease-in-out">
									Catégorie
								</li>
								<li className="hover:text-secondary transition-colors duration-300 ease-in-out">
									Catégorie
								</li>
								<li className="hover:text-secondary transition-colors duration-300 ease-in-out">
									Catégorie
								</li>
								<li className="hover:text-secondary transition-colors duration-300 ease-in-out">
									Catégorie
								</li>
								<li className="hover:text-secondary transition-colors duration-300 ease-in-out">
									Catégorie
								</li>
								<li className="hover:text-secondary transition-colors duration-300 ease-in-out">
									Catégorie
								</li>
								<li className="hover:text-secondary transition-colors duration-300 ease-in-out">
									Catégorie
								</li>
							</ul>
						</div>
					</div>
				</div>
				{/* CONTENU SCROLLABLE - SORTI DU HEADER */}
				<div className="flex-1 min-h-0 overflow-y-auto px-6 pb-3">
					<h4 className="text-secondary border-b border-white my-2 pb-1 font-semibold text-center max-w-[80%] flex justify-self-center ">
						Nom de la cat 2
					</h4>
					<ul className="w-full space-y-2">
						<li className="flex items-baseline gap-2">
							<span className="flex-1 break-words ">
								Soupe de potiron et son lard grillé cest très long décidement
								très très long
							</span>
							<span className="shrink-0 text-bg font-semibold">9€</span>
						</li>
						<li className="flex items-baseline gap-2">
							<span className="flex-1 break-words">Seconde entrée</span>
							<span className="shrink-0 text-bg font-semibold">9€</span>
						</li>
						<li className="flex items-baseline gap-2">
							<span className="flex-1 break-words ">
								Soupe de potiron et son lard grillé cest très long décidement
								très très long
							</span>
							<span className="shrink-0 text-bg font-semibold">9€</span>
						</li>
						<li className="flex items-baseline gap-2">
							<span className="flex-1 break-words">Seconde entrée</span>
							<span className="shrink-0 text-bg font-semibold">9€</span>
						</li>
						<li className="flex items-baseline gap-2">
							<span className="flex-1 break-words ">
								Soupe de potiron et son lard grillé cest très long décidement
								très très long
							</span>
							<span className="shrink-0 text-bg font-semibold">9€</span>
						</li>
						<li className="flex items-baseline gap-2">
							<span className="flex-1 break-words">Seconde entrée</span>
							<span className="shrink-0 text-bg font-semibold">9€</span>
						</li>
						<h4 className="text-secondary border-b border-white my-2 pb-1 font-semibold text-center max-w-[80%] flex justify-self-center ">
							Nom de la cat 2
						</h4>

						<li className="flex items-baseline gap-2">
							<span className="flex-1 break-words ">
								Soupe de potiron et son lard grillé cest très long décidement
								très très long
							</span>
							<span className="shrink-0 text-bg font-semibold">9€</span>
						</li>
						<li className="flex items-baseline gap-2">
							<span className="flex-1 break-words">Seconde entrée</span>
							<span className="shrink-0 text-bg font-semibold">9€</span>
						</li>
						<li className="flex items-baseline gap-2">
							<span className="flex-1 break-words ">
								Soupe de potiron et son lard grillé cest très long décidement
								très très long
							</span>
							<span className="shrink-0 text-bg font-semibold">9€</span>
						</li>
						<li className="flex items-baseline gap-2">
							<span className="flex-1 break-words">Seconde entrée</span>
							<span className="shrink-0 text-bg font-semibold">9€</span>
						</li>
						<li className="flex items-baseline gap-2">
							<span className="flex-1 break-words ">
								Soupe de potiron et son lard grillé cest très long décidement
								très très long
							</span>
							<span className="shrink-0 text-bg font-semibold">9€</span>
						</li>
						<li className="flex items-baseline gap-2">
							<span className="flex-1 break-words">Seconde entrée</span>
							<span className="shrink-0 text-bg font-semibold">9€</span>
						</li>
						<h4 className="text-secondary border-b border-white my-2 pb-1 font-semibold text-center max-w-[80%] flex justify-self-center ">
							Nom de la cat 2
						</h4>
						<li className="flex items-baseline gap-2">
							<span className="flex-1 break-words ">
								Soupe de potiron et son lard grillé cest très long décidement
								très très long
							</span>
							<span className="shrink-0 text-bg font-semibold">9€</span>
						</li>
						<li className="flex items-baseline gap-2">
							<span className="flex-1 break-words">Seconde entrée</span>
							<span className="shrink-0 text-bg font-semibold">9€</span>
						</li>
						<li className="flex items-baseline gap-2">
							<span className="flex-1 break-words ">
								Soupe de potiron et son lard grillé cest très long décidement
								très très long
							</span>
							<span className="shrink-0 text-bg font-semibold">9€</span>
						</li>
						<li className="flex items-baseline gap-2">
							<span className="flex-1 break-words">Seconde entrée</span>
							<span className="shrink-0 text-bg font-semibold">9€</span>
						</li>
					</ul>
				</div>
				<div className="flex justify-center">
					<Button className="m-6">Menu en pdf</Button>
				</div>
			</div>
		</div>
	);
}
