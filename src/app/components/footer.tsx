"use client";

export default function Footer() {
  return (
    <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
      <p className="text-gray-400 text-sm">
        © {new Date().getFullYear()} BRDEV. Todos os direitos reservados.
      </p>
      <p className="text-gray-400 text-sm">
        Desenvolvido com ❤️ em React e Next.js
      </p>
    </div>
  );
}
