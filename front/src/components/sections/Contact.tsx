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
			className="snap-start relative text-white overflow-hidden min-h-screen"
		>
			<div className="w-full h-full flex flex-col items-start mx-auto">
				<SectionTitle sectionTitle={sectionTitle} />
				<div className="self-start m-6 w-full max-w-[96%] sm:pt-6">
					<iframe
						className="w-full"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2696.893936127629!2d-0.5551338867689501!3d47.47249627105744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x480878e9fe7832a9%3A0xb8396a77167da707!2sBDC%20-%20Bar%20Du%20Centre!5e0!3m2!1sfr!2sfr!4v1761558821871!5m2!1sfr!2sfr"
						height="300"
						allowFullScreen
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
					></iframe>
				</div>
				<div className="md:self-start w-full">
					<article className="px-4 font-body text-base/8 flex flex-col justify-start md:flex-row md:w-full">
						<div className="flex-1 ">
							<div className="p-2 text-wrap">
								<h3 className="text-secondary text-2xl">Nos informations</h3>
								<p className="flex items-center gap-2">
									{" "}
									<MapPin size={24} className="text-secondary" />
									12, rue Saint Laud - 49100, Angers
								</p>
								<p className="flex items-center gap-2">
									<Mail className="text-secondary" size={24} />
									contact@bdc-angers.com
								</p>
								<p className="flex items-center gap-2">
									<Phone className="text-secondary" size={24} />
									+33 (0)2 41 87 45 07
								</p>
								<p className="flex items-center gap-2">
									<Clock size={24} className="text-secondary" />
									Dimanche à Mardi : 9h–1h
								</p>
								<p className="flex items-center gap-2">
									<Clock size={24} className="text-secondary" />
									Mercredi à Samedi : 9h–2h
								</p>
							</div>
						</div>
						<ContactForm />
					</article>
				</div>
				<div className="self-center md:hidden m-6">
					<ContacTrigger />
				</div>
			</div>
		</section>
	);
}
