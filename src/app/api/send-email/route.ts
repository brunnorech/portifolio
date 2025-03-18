import nodemailer from 'nodemailer';

export async function POST(req: Request) {

  try {
    const { name, email, subject, message } = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: 'contato@brech.dev',
      subject: subject,
      text: message,
      html: `<p>${message}</p>`,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: 'E-mail enviado com sucesso!' }), { status: 200 });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return new Response(JSON.stringify({ message: 'Erro ao enviar e-mail.' }), { status: 500 });
  }
}
