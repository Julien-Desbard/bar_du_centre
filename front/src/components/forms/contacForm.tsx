"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

export default function ContactForm() {
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [message, setMessage] = useState<string>("");
	const [topic, setTopic] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [messageSuccess, setMessageSuccess] = useState("");

useEffect (() => {
    if(messageSuccess) {
        const timer = setTimeout(()=> {
            setMessageSuccess("");
        },5000);
        return () => clearTimeout(timer)
    }
},[messageSuccess])

useEffect (() => {
    const timer = setTimeout(() => {
        setError("")
    }, 5000);
    return () => clearTimeout(timer)
    }, [error])

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
		setError("");
		setIsSubmitting(true);

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
		setIsSubmitting(false);
		setMessageSuccess("Message envoyé avec succès");
	}
	return (
		<>
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
									value={name}
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
									value={email}
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
							value={topic}
							onChange={(e) => setTopic(e.target.value)}
							required
							placeholder="Objet de votre demande"
							className="border border-secondary p-1 pl-2"
						/>
						<textarea
							name="message"
							inputMode="text"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							rows={2}
							cols={50}
							placeholder="Votre message"
							className="border border-secondary p-1 pl-2"
						></textarea>
					</form>
				</div>
				{error && error !== "" && (
					<p className="font-body font-light italic text-red-500"> {error}</p>
				)}
				{messageSuccess && messageSuccess !== "" && (
					<p className="font-body font-light italic text-secondary">
						{" "}
						{messageSuccess}
					</p>
				)}
				<Button
					type="submit"
					className="m-6 flex justify-self-center max-md:hidden"
					onClick={(e) => handleSubmit(e)}
					disabled={isSubmitting}
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
		</>
	);
}
