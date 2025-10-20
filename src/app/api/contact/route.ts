import nodemailer from "nodemailer";

export async function POST(req: Request) {
	const {
		name,
		email,
		topic,
		message,
	} = await req.json();

	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: { user: process.env.MAIL_USER!, pass: process.env.MAIL_PASS! },
	});

	// Mail vers toi
	await transporter.sendMail({
		from: email,
		to: process.env.MAIL_USER,
		subject: `Prise de contact de ${name}`,
		text: `Bonjour, \n- ${name} vient de nous adresser le message suivant : \n\n Object : ${topic}\nMessage: ${message} \n Réponse atendue à l'adresse suivante : ${email}`,
	});

	// Réponse automatique vers l’utilisateur
	await transporter.sendMail({
		from: process.env.MAIL_USER,
		to: email,
		subject: "Confirmation de réception",
		text: `Bonjour ${name},\n\nNous avons bien reçu votre message ayant pour object ${topic}\n\nNous y répondrons dans les meilleurs délais\n\n— L’équipe du Bar du Centre`,
	});

	return Response.json({ ok: true });
}
