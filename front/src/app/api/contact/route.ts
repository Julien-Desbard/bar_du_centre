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
		text: `Bonjour, \n${name} vient de nous adresser le message suivant : \n\nObjet : ${topic}\nMessage: ${message} \nAdresse de réponse : ${email}`,
	});

	// Réponse automatique vers l’utilisateur
	await transporter.sendMail({
		from: process.env.MAIL_USER,
		to: email,
		subject: "Confirmation de réception",
		text: `Bonjour ${name},\n\nNous avons bien reçu votre message\n\nNous y répondrons dans les meilleurs délais\n\n— L’équipe du Bar du Centre \n\nPour mémoire, votre message est :\nObjet :${topic}\nMessage :${message}`,
	});

	return Response.json({ ok: true });
}
