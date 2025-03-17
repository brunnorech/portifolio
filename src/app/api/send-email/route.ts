import nodemailer from 'nodemailer';

export async function POST(req: Request) {

    console.error("Variáveis de ambiente no servidor:");
    console.error("SMTP_HOST:", process.env.SMTP_HOST);
    console.warn("SMTP_PORT:", process.env.SMTP_PORT);
    console.log("SMTP_USER:", process.env.SMTP_USER);

  try {
    const { name, email, subject, message } = await req.json();

    // Configuração do Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: true, // true para 465, false para outras portas
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

    // Enviar e-mail
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: 'E-mail enviado com sucesso!' }), { status: 200 });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return new Response(JSON.stringify({ message: 'Erro ao enviar e-mail.' }), { status: 500 });
  }
}
