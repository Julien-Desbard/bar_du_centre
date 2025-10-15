import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { name, email, phone, number, location, nature, reservationTime, date, message } = await req.json();


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
    subject: `Demande de réservation de ${name}`,
    text: `Nouvelle demande de réservation : \n- Nom: ${name}\n- Date: ${date}\n- Horaire: ${reservationTime} \n- Nombre de personne: ${number}\n- Lieu: ${location}\n- Objet: ${nature}\n- Téléphone: ${phone}\n\nMessage: ${message}`,
  });

  // Réponse automatique vers l’utilisateur
  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: "Confirmation de réception",
    text: `Bonjour ${name},\n\nNous avons bien reçu votre demande de réservation pour ${number} personnes le ${date} à ${reservationTime}\n\nNous vous en remercions\n\n— L’équipe du Bar du Centre`,
  });

  return Response.json({ ok: true });
}
