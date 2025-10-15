import { Button } from "../ui/button";
import { XIcon } from "../ui/XIcon";
import { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("fr");

const now = dayjs();
console.log(now.format("dddd D MMMM YYYY"));

interface Modalprops {
	isOpen: boolean;
	onClose: () => void;
}

type Horaire = {
	time: string;
};

type Result = { ok: boolean; msg: string };

export default function Modal({ isOpen, onClose }: Modalprops) {
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
	const [number, setNumber] = useState<string>("");
	const [location, setLocation] = useState<string>("");
	const [nature, setNature] = useState<string>("");
	const [reservationTime, setReservationTime] = useState<Horaire>({ time: "" });
	const [date, setDate] = useState<string>("");
	const [error, setError] = useState<string>("");

	// Focusing on the first input field of the form
	const nameRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (isOpen && nameRef.current) {
			nameRef.current.focus();
		}
	});

	const resetFormState = () => {
		setName("");
		setEmail("");
		setPhone("");
		setNumber("");
		setLocation("");
		setNature("");
		setReservationTime({ time: "" });
		setDate("");
		setError("");
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
			ok:true,
			msg:""
		}
}

	const TZ = "Europe/Paris";


	// Apply reservation rules
	function acceptReservation(dateISO: string, timeHHMM: string): Result {
		setError("");

		const now = dayjs().tz(TZ);
		const today = now.startOf("day");
		const pickedDay = dayjs.tz(dateISO, TZ).startOf("day");

		if (pickedDay.isBefore(today, "day"))
			return {
				ok: false,
				msg: "La date de réservation ne doit pas être dans le passé",
			};
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

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		checkAllFieldsAreFilled()
		const res = acceptReservation(date, reservationTime.time);
		if (!res.ok) {
			setError(res.msg);
			return;
		}
		setError("");
		onClose();
		resetFormState();
		//TODO envoyer la réservation
	};
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black/50 backdrop-blur z-50 flex flex-col items-center justify-center"
			onClick={onClose}
		>
			<div
				className="bg-[url('/images/background.jpg')] bg-cover bg-center p-2 w-full max-w-xl shadow-lg text-white font-body"
				onClick={(e) => e.stopPropagation()}
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
								onClose();
							}}
							className="w-6 h-6"
						/>
					</button>
				</div>
				<h3 className="text-2xl mb-8 text-white font-subtitle font-light">
					Reservation
				</h3>

				<div className="font-body mb-4 px-12">
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
						<label htmlFor="phone" className="sr-only">
							Votre numéro de téléphone
						</label>
						<input
							type="tel"
							inputMode="numeric"
							name="phone"
							onChange={(e) => setPhone(e.target.value)}
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
							onChange={(e) => setDate(e.target.value)}
							required
							placeholder="Date"
							className="border border-secondary p-1 pl-2"
						/>
						<label htmlFor="reservation_time" className="sr-only">
							Heure de votre visite
						</label>
						<input
							type="time"
							inputMode="numeric"
							name="reservation_time"
							onChange={(e) => {
								const value = e.target.value; // "HH:mm"
								setReservationTime({ time: value });
								if (!value) return;
							}}
							required
							placeholder="Heure"
							className="border border-secondary p-1 pl-2"
						/>
						<label htmlFor="number" className="sr-only">
							Nombre de convives
						</label>
						<input
							type="number"
							inputMode="numeric"
							name="number"
							onChange={(e) => setNumber(e.target.value)}
							required
							placeholder="# de personnes"
							className="border border-secondary p-1 pl-2 col-span-2"
						/>
						<label htmlFor="location" className="sr-only">
							Extérieur ou intérieur ?
						</label>
						<select
							name="location"
							onChange={(e) => setLocation(e.target.value)}
							id="location"
							required
							className="border border-secondary p-1 pl-2 col-span-2"
						>
							<option value="" disabled hidden>
								Extérieur ou intérieur ?
							</option>
							<option value="Extérieur">Extérieur</option>
							<option value="Intérieur">Intérieur</option>
						</select>
						<label htmlFor="location" className="sr-only">
							Pour manger ou boire un verre ?
						</label>
						<select
							name="nature"
							onChange={(e) => setNature(e.target.value)}
							required
							id="nature"
							className="border border-secondary p-1 pl-2 col-span-2"
						>
							<option value="" disabled hidden>
								Pour manger ou boire un verre ?
							</option>
							<option value="Pour manger">Pour manger</option>
							<option value="Pour boire un verre">Pour boire un verre</option>
						</select>
						<textarea
							name="message"
							inputMode="text"
							required
							rows={5}
							cols={50}
							placeholder="Votre message"
							className="border border-secondary p-1 pl-2 col-span-2"
						></textarea>
					</form>
				</div>
				<Button type="submit" className="m-3" onClick={(e) => handleSubmit(e)}>
					Réservez votre table
				</Button>
				{error && error !== "" && (
					<p className="font-body font-light italic text-red-500"> {error}</p>
				)}
			</div>
		</div>
	);
}
