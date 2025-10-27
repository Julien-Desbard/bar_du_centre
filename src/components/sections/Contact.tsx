"use client";
import { useState } from "react";
import ContactModal from "../modals/contactModal";

import SectionTitle, { SectionTitleProps } from "../layout/SectionTitle";
import { Button } from "../ui/button";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

export default function Contact() {
	const sectionTitle: SectionTitleProps = {
		part1: "nous",
		part2: "contacter",
	};

	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [message, setMessage] = useState<string>("");
	const [topic, setTopic] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [isOpen, setIsOpen] = useState(false);

	const resetFormState = () => {
		setName("");
		setEmail("");
		setMessage("");
		setTopic("");
		setError("");
	};

	const checkAllFieldsAreFilled = () => {
		if (!name || !email || !topic || !message)
			return {
				ok: false,
				msg: "Pour nous contacter, vous devez renseigner tous les champs",
			};

		return {
			ok: true,
			msg: "",
		};
	};

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const fieldCheck = checkAllFieldsAreFilled();
		if (!fieldCheck.ok) {
			setError(fieldCheck.msg);
			return;
		}

		const res = fetch("/api/contact", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name,
				email,
				topic,
				message,
			}),
		});
		const data = await (await res).json();
		if (data.ok) {
			console.log("mail de contact envoyé");
		} else {
			console.log("erreur lors de l'envoi du mail de contact");
		}

		setError("");
		resetFormState();
	}

	return (
		<section id="contact" className="snap-start min-h-screen text-white">
			<div className="w-full h-full flex flex-col items-start mx-auto">
				<SectionTitle sectionTitle={sectionTitle} />
				<div className="self-start m-6 w-full max-w-[96%]">
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
						<div className="flex-1">
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
						<div className="flex-1 lg:flex-2 p-2">
							<div className="font-body max-md:hidden">
								<form className="flex flex-col gap-2 [&>input]:text-white [&>textarea]:text-white [&>select]:text-white [&_*::placeholder]:text-white [color-scheme:dark] text-base">
									<div className="flex flex-col xl:flex-row gap-2">
										<div className="flex flex-col xl:flex-1">
											<label htmlFor="name" className="sr-only">
												Votre nom
											</label>
											<input
												type="text"
												name="name"
												onChange={(e) => setName(e.target.value)}
												required
												placeholder="Votre nom"
												className="border border-secondary p-1 pl-2"
											/>
										</div>
										<div className="flex flex-col xl:flex-1">
											<label htmlFor="email" className="sr-only">
												Votre email
											</label>
											<input
												type="email"
												name="email"
												onChange={(e) => setEmail(e.target.value)}
												inputMode="email"
												required
												placeholder="Votre email"
												className="border border-secondary p-1 pl-2"
											/>
										</div>
									</div>

									<label htmlFor="topic" className="sr-only">
										Objet de votre demande
									</label>
									<input
										type="text"
										name="topic"
										onChange={(e) => setTopic(e.target.value)}
										required
										placeholder="Objet de votre demande"
										className="border border-secondary p-1 pl-2"
									/>
									<textarea
										name="message"
										inputMode="text"
										onChange={(e) => setMessage(e.target.value)}
										rows={2}
										cols={50}
										placeholder="Votre message"
										className="border border-secondary p-1 pl-2"
									></textarea>
								</form>
							</div>
							<Button
								type="submit"
								className="m-6 flex justify-self-center max-md:hidden"
								onClick={(e) => handleSubmit(e)}
							>
								Envoyer le message
							</Button>
							{error && error !== "" && (
								<p className="font-body font-light italic text-red-500">
									{" "}
									{error}
								</p>
							)}
						</div>
					</article>
				</div>
				<Button
					className="max-w-45 self-center mb-12 md:hidden"
					onClick={() => setIsOpen(true)}
				>
					Contactez-nous
				</Button>
			</div>
			<ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
		</section>
	);
}
