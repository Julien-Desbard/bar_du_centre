"use client";
import { Button } from "../ui/button";
import { XIcon } from "../ui/XIcon";
import { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Loader } from "lucide-react";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("fr");

interface Modalprops {
	isOpen: boolean;
	onClose: () => void;
}

type Result = { ok: boolean; msg: string };

export default function Modal({ isOpen, onClose }: Modalprops) {
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
	const [number, setNumber] = useState<string>("");
	const [location, setLocation] = useState<string>("");
	const [nature, setNature] = useState<string>("");
	const [reservationTime, setReservationTime] = useState<string>("");
	const [date, setDate] = useState<string>("");
	const [message, setMessage] = useState<string>("");
	const [errors, setErrors] = useState<string>("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [messageSuccess, setMessageSuccess] = useState("");

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
		setPhone("");
		setNumber("");
		setLocation("");
		setNature("");
		setReservationTime("");
		setDate("");
		setErrors("");
		setMessage("");
	};

	const checkAllFieldsAreFilled = () => {
		if (
			!date ||
			!reservationTime ||
			!name ||
			!email ||
			!phone ||
			!number ||
			!location ||
			!nature
		)
			return {
				ok: false,
				msg: "Pour effectuer une réservation, vous devez renseigner tous les champs",
			};

		return {
			ok: true,
			msg: "",
		};
	};

	const validateNumber = (value: string) => {
		if (parseInt(value) > 10)
			return {
				ok: false,
				msg: "Vous ne pouvez pas réserver pour plus de 10 personnes",
			};
		return {
			ok: true,
			msg: "",
		};
	};

	// Apply reservation rules
	function acceptReservation(
		dateISO: string,
		timeHHMM: string,
		number: string
	): Result {
		setErrors("");

		const numberCheck = validateNumber(number);
		if (!numberCheck.ok) {
			setErrors(numberCheck.msg);
			return {
				ok: false,
				msg: "Vous ne pouvez pas réserver pour plus de 10 personnes",
			};
		}

		// Control date and time or the reservation
		const TZ = "Europe/Paris";
		const now = dayjs().tz(TZ);
		const today = now.startOf("day");

		const pickedDay = dayjs.tz(`${dateISO}T00:00:00`, TZ).startOf("day");

		if (pickedDay.isBefore(today, "day")) {
			return { ok: false, msg: "Vous avez saisi une date passée" };
		}
		if (!pickedDay.isSame(today, "day")) return { ok: true, msg: "" };

		const picked = dayjs.tz(`${dateISO}T${timeHHMM}`, TZ);

		const limit1530 = pickedDay.clone().hour(15).minute(35);
		const limit1900 = pickedDay.clone().hour(19).minute(5);

		const cutoff10 = today.clone().hour(10).minute(5);
		const cutoff17 = today.clone().hour(17).minute(5);

		if (picked.isBefore(limit1530)) {
			if (now.isBefore(cutoff10)) return { ok: true, msg: "" };
			return {
				ok: false,
				msg: "Pour déjeuner aujourd’hui, les réservations en ligne ferment à 10h00. Appelez le 01-23-45-67-89.",
			};
		}

		if (picked.isSame(limit1900) || picked.isAfter(limit1900)) {
			if (now.isBefore(cutoff17)) return { ok: true, msg: "" };
			return {
				ok: false,
				msg: "Pour diner aujourd’hui, les réservations en ligne ferment à 17h00. Appelez le 01-23-45-67-89.",
			};
		}
		return { ok: true, msg: "" };
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const fieldCheck = checkAllFieldsAreFilled();
		if (!fieldCheck.ok) {
			setErrors(fieldCheck.msg);
			return;
		}

		const reservation = acceptReservation(date, reservationTime, number);
		if (!reservation.ok) {
			setErrors(reservation.msg);
			return;
		}
		setIsSubmitting(true);
		try {
			const res = fetch("/api/reservation", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name,
					email,
					phone,
					number,
					location,
					nature,
					reservationTime,
					date,
					message,
				}),
			});
			const data = await (await res).json();
			if (data.ok) {
				console.log("mail de réservation envoyé");
			} else {
				console.log("erreur lors de l'envoi du mail de réservation");
			}

			setMessageSuccess("Réservation effectuée avec succès");
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
		<div
			className="fixed inset-0 bg-black/50 backdrop-blur z-50 flex flex-col items-center justify-center"
			onClick={() => {
				onClose();
				setErrors("");
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
								setErrors("");
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
						<input
							type="hidden"
							name="time"
							value="Mar 10 2025 08:46"
							className="border border-secondary p-1 pl-2 col-span-2"
						/>
						<label htmlFor="name" className="sr-only">
							Votre nom
						</label>
						<input
							type="text"
							ref={nameRef}
							name="name"
							value={name}
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
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							inputMode="email"
							required
							placeholder="Votre email"
							className="border border-secondary p-1 pl-2 col-span-2"
						/>
						<label htmlFor="phone" className="sr-only">
							Votre numéro de téléphone
						</label>
						<input
							type="tel"
							inputMode="tel"
							name="phone"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							pattern="^(?:(?:\+|00)33|0)[1-9](?:[0-9]{8})$"
							required
							placeholder="Votre numéro de téléphone"
							className="border border-secondary p-1 pl-2 col-span-2"
						/>
						<label htmlFor="date" className="sr-only">
							Date de votre visite
						</label>
						<input
							type="date"
							inputMode="numeric"
							name="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
							required
							placeholder="Date"
							className={`border border-secondary p-1 pl-2 max-sm:col-span-2 ${
								date ? "text-white" : "text-gray-500" }`}
						/>
						<label htmlFor="reservation_time" className="sr-only">
							Heure de votre visite
						</label>
						<input
							type="time"
							inputMode="numeric"
							name="reservation_time"
							value={reservationTime}
							onChange={(e) => {
								const value = e.target.value;
								setReservationTime(value);
								if (!value) return;
							}}
							required
							placeholder="Heure"
							className={`border border-secondary p-1 pl-2 max-sm:col-span-2 ${
								reservationTime ? "text-white" : "text-gray-500" 
							}`}
						/>
						<label htmlFor="number" className="sr-only">
							Nombre de convives
						</label>
						<select
							name="number"
							inputMode="numeric"
							value={number}
							onChange={(e) => setNumber(e.target.value)}
							required
							id="number"
							className="border border-secondary p-1 pl-2 col-span-2"
						>
							<option value="" hidden>
								# de personnes (10 max)
							</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
							<option value="7">7</option>
							<option value="8">8</option>
							<option value="9">9</option>
							<option value="10">10</option>
						</select>
						<label htmlFor="location" className="sr-only">
							Extérieur ou intérieur ?
						</label>
						<select
							name="location"
							onChange={(e) => setLocation(e.target.value)}
							id="location"
							value={location}
							required
							className="border border-secondary p-1 pl-2 col-span-2"
						>
							<option value="" hidden>
								Intérieur ou extérieur ?
							</option>
							<option value="Intérieur">En intérieur</option>
							<option value="Extérieur">En extérieur</option>
						</select>
						<label htmlFor="location" className="sr-only">
							Pour manger ou boire un verre ?
						</label>
						<select
							name="nature"
							onChange={(e) => setNature(e.target.value)}
							required
							value={nature}
							id="nature"
							className="border border-secondary p-1 pl-2 col-span-2"
						>
							<option value="" hidden>
								Manger ou boire un verre ?
							</option>
							<option value="Pour manger">Pour manger</option>
							<option value="Pour boire un verre">Pour boire un verre</option>
						</select>
						<textarea
							name="message"
							inputMode="text"
							onChange={(e) => setMessage(e.target.value)}
							rows={5}
							cols={50}
							value={message}
							placeholder="Votre message"
							className="border border-secondary p-1 pl-2 col-span-2"
						></textarea>
					</form>
					{messageSuccess && messageSuccess !== "" && (
						<p className="text-secondary py-2">{messageSuccess}</p>
					)}
					{errors && errors !== "" && (
						<p className="font-body font-light italic text-red-500 py-2">
							{" "}
							{errors}
						</p>
					)}
				</div>
				<Button
					type="submit"
					disabled={isSubmitting}
					className="m-6 flex justify-self-center"
					onClick={(e) => handleSubmit(e)}
				>
					{isSubmitting ? (
						<>
							<Loader className="animate-spin mr-2" />
							Réservation en cours
						</>
					) : (
						"Réservez votre table"
					)}
				</Button>
			</div>
		</div>
	);
}
