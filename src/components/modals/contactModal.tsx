import { Button } from "../ui/button";
import { XIcon } from "../ui/XIcon";
import { useState, useRef, useEffect } from "react";

interface Modalprops {
	isOpen: boolean;
	onClose: () => void;
}

export default function Modal({ isOpen, onClose }: Modalprops) {
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [message, setMessage] = useState<string>("");
	const [topic, setTopic] = useState<string>("");
	const [error, setError] = useState<string>("");

	// Focusing on the first input field of the form
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
		setError("");
	};

	const checkAllFieldsAreFilled = () => {
		if (!name || !email ||!topic ||!message )
			return {
				ok: false,
				msg: "Pour nous contacter, vous devez renseigner tous les champs",
			};

		return {
			ok: true,
			msg: "",
		};
	};

	// Apply reservation rules

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
		onClose();
		resetFormState();
		//TODO envoyer le mail de contact
	}
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black/50 backdrop-blur z-50 flex flex-col items-center justify-center"
			onClick={() => {
				onClose();
				setError("");
				resetFormState();
			}}
		>
			<div
				className="bg-[url('/images/background.jpg')] bg-cover bg-center p-2 w-full max-w-xl shadow-lg text-white font-body"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<div className="justify-self-end">
					<button
						type="button"
						aria-label="Fermer le menu"
						className=" hover:text-secondary transition-colors duration-300 ease-in-out"
					>
						<XIcon
							onClick={() => {
								resetFormState();
								setError("");
								onClose();
							}}
							className="w-6 h-6"
						/>
					</button>
				</div>
				<h3 className="text-2xl mb-8 text-white font-subtitle font-light justify-self-center">
					Reservation
				</h3>

				<div
					className="font-body mb-4 px-12
				max-sm:px-4"
				>
					<form className="grid grid-cols-2 grid-row-8 gap-2 [&>input]:text-white [&>textarea]:text-white [&>select]:text-white [&_*::placeholder]:text-white [color-scheme:dark]">
						<label htmlFor="name" className="sr-only">
							Votre nom
						</label>
						<input
							type="text"
							ref={nameRef}
							name="name"
							onChange={(e) => setName(e.target.value)}
							required
							placeholder="Votre nom"
							className="border border-secondary p-1 pl-2 col-span-2"
						/>
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
							className="border border-secondary p-1 pl-2 col-span-2"
						/>
						<label htmlFor="name" className="sr-only">
							Objet de votre demande
						</label>
						<input
							type="text"
							name="topic"
							onChange={(e) => setTopic(e.target.value)}
							required
							placeholder="Objet de votre demande"
							className="border border-secondary p-1 pl-2 col-span-2"
						/>
						<textarea
							name="message"
							inputMode="text"
							onChange={(e) => setMessage(e.target.value)}
							rows={5}
							cols={50}
							placeholder="Votre message"
							className="border border-secondary p-1 pl-2 col-span-2"
						></textarea>
					</form>
				</div>
				<Button type="submit" className="m-6 flex justify-self-center" onClick={(e) => handleSubmit(e)}>
					Envoyer le message
				</Button>
				{error && error !== "" && (
					<p className="font-body font-light italic text-red-500"> {error}</p>
				)}
			</div>
		</div>
	);
}
