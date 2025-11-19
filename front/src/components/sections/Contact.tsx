import SectionTitle, { SectionTitleProps } from "../layout/SectionTitle";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import ContacTrigger from "../modals/contactTrigger";
import ContactForm from "../forms/contacForm";

export default function Contact() {
	const sectionTitle: SectionTitleProps = {
		part1: "nous",
		part2: "contacter",
	};

	return (
		<section
			id="contact"
			className="snap-start relative text-white overflow-hidden pt-6"
		>
			<div className="w-full h-full flex flex-col items-start mx-auto">
				<SectionTitle sectionTitle={sectionTitle} />
				<div className="self-center w-full px-6 my-6 max-w-[96%]">
					<iframe
						className="w-full h-40 sm:h-80 2xl:h-96"
						aria-label="carte google"
						loading="lazy"
						sandbox="allow-scripts allow-same-origin allow-popups"
						src="https://www.google.com/maps/embed?pb=..."
						allowFullScreen
						title="Google Maps - Bar du Centre"
					/>
				</div>
				<div className="md:self-start w-full px-6 pb-6 pt-3 ">
					<article className="font-body text-base/8 flex flex-col justify-start max-md:justify-self-center md:flex-row md:w-full ">
						<div className="flex-1 ">
							<div className="text-wrap">
								<h3 className="text-secondary text-2xl pb-3">
									Nos informations
								</h3>
								<ul className="space-y-2">
									<li className="flex items-center gap-2">
										{" "}
										<MapPin size={24} className="text-secondary" />
										12, rue Saint Laud - 49100, Angers
									</li>
									<li className="flex items-center gap-2">
										<Mail className="text-secondary" size={24} />
										contact@bdc-angers.com
									</li>
									<li className="flex items-center gap-2">
										<Phone className="text-secondary" size={24} />
										+33 (0)2 41 87 45 07
									</li>
									<li className="flex items-center gap-2">
										<Clock size={24} className="text-secondary" />
										Dimanche à Mardi : 9h–1h
									</li>
									<li className="flex items-center gap-2">
										<Clock size={24} className="text-secondary" />
										Mercredi à Samedi : 9h–2h
									</li>
								</ul>
							</div>
						</div>
						<ContactForm />
					</article>
				</div>
				<div className="self-center md:hidden mb-12">
					<ContacTrigger />
				</div>
			</div>
		</section>
	);
}
