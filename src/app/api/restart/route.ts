import { exec } from 'child_process';

export async function GET() {
  return new Promise<void | Response>((resolve, reject) => {
    exec('pm2 restart next-app', (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao reiniciar o servidor: ${error.message}`);
        return reject(new Response(`Erro: ${error.message}`, { status: 500 }));
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return reject(new Response(stderr, { status: 500 }));
      }
      console.log(`Servidor reiniciado com sucesso: ${stdout}`);
      return resolve(new Response(`Servidor reiniciado com sucesso: ${stdout}`, { status: 200 }));
    });
  });
}
