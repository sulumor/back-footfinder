import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default async function sendEmail({ email, id, token }) {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Réinitialiser votre mot de passe",
    text: `${process.env.ORIGIN}/reset-password/${id}/${token}`,
  };

  return new Promise((resolve) => {
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error(error);
        resolve(false);
      } else resolve(true);
    });
  });
}
