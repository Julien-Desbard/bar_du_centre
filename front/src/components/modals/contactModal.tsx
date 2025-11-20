import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import { XIcon } from "../ui/XIcon";
import { useState, useRef, useEffect } from "react";
import Portal from "../Portal/portal";

interface Modalprops {
	isOpen: boolean;
	onClose: () => void;
}

export default function Modal({ isOpen, onClose }: Modalprops) {
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [message, setMessage] = useState<string>("");
	const [topic, setTopic] = useState<string>("");
	const [errors, setErrors] = useState<string>("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [messageSuccess, setMessageSuccess] = useState("");

	// Bloquer le scroll quand la modale est ouverte
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setMessageSuccess("");
		}, 5000);
		return () => clearTimeout(timer);
	}, [messageSuccess]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setErrors("");
		}, 5000);
		return () => clearTimeout(timer);
	}, [errors]);

	const nameRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (isOpen && nameRef.current) {
			nameRef.current.focus();
		}
	}, [isOpen]);

	const resetFormState = () => {
		setName("");
		setEmail("");
		setMessage("");
		setTopic("");
		setErrors("");
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
			setErrors(fieldCheck.msg);
			return;
		}
		setIsSubmitting(true);
		try {
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
			}

			setMessageSuccess("Message envoyé avec succès");
			setTimeout(() => onClose(), 3000);
			setIsSubmitting(false);
		} catch {
			setErrors("Une erreur est survenue, veuillez réessayer");
		} finally {
			resetFormState();
		}
	}

	if (!isOpen) return null;

	return (
		<Portal>
			<div
				className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
				onClick={() => {
					onClose();
					setErrors("");
					resetFormState();
				}}
			>
				<div
					className="bg-gradient-dark p-2 w-full max-w-xl shadow-lg text-white font-body my-8"
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					<div className="flex justify-end">
						<button
							type="button"
							aria-label="Fermer le menu"
							className="hover:text-secondary transition-colors duration-300 ease-in-out"
							onClick={() => {
								resetFormState();
								setErrors("");
								onClose();
							}}
						>
								<XIcon className="w-6 h-6 m-3" />

						</button>
					</div>
					<h3 className="text-3xl mb-8 text-white font-subtitle font-light text-center">
						Nous contacter
					</h3>

					<div className="font-body text-base mb-4 px-12 max-sm:px-4">
						<div className="grid grid-cols-2 gap-2">
							<label htmlFor="name" className="sr-only">
								Votre nom
							</label>
							<input
								type="text"
								id="name"
								autoComplete="family-name"
								ref={nameRef}
								name="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								placeholder="Votre nom"
								className="border border-secondary p-1 pl-2 col-span-2 text-white placeholder:text-white bg-transparent"
							/>
							<label htmlFor="email" className="sr-only">
								Votre email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								autoComplete="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								inputMode="email"
								required
								placeholder="Votre email"
								className="border border-secondary p-1 pl-2 col-span-2 text-white placeholder:text-white bg-transparent"
							/>
							<label htmlFor="topic" className="sr-only">
								Objet de votre demande
							</label>
							<input
								type="text"
								id="topic"
								name="topic"
								value={topic}
								onChange={(e) => setTopic(e.target.value)}
								required
								placeholder="Objet de votre demande"
								className="border border-secondary p-1 pl-2 col-span-2 text-white placeholder:text-white bg-transparent"
							/>
							<label htmlFor="message" className="sr-only">
								Votre message
							</label>
							<textarea
								id="message"
								name="message"
								inputMode="text"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								rows={5}
								placeholder="Votre message"
								className="border border-secondary p-1 pl-2 col-span-2 text-white placeholder:text-white bg-transparent"
							></textarea>
						</div>
						{errors && errors !== "" && (
							<p className="font-body font-light italic text-red-500 py-2">
								{errors}
							</p>
						)}
						{messageSuccess && messageSuccess !== "" && (
							<p className="text-secondary py-2">{messageSuccess}</p>
						)}
					</div>
					<div className="flex justify-center">
						<Button
							type="submit"
							className="m-6"
							disabled={isSubmitting}
							onClick={(e) => handleSubmit(e)}
						>
							{isSubmitting ? (
								<>
									<Loader className="animate-spin mr-2" />
									Envoi en cours...
								</>
							) : (
								"Envoyer le message"
							)}
						</Button>
					</div>
				</div>
			</div>
		</Portal>
	);
}