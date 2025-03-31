import { Button } from "@/src/components/ui/button";
import Image from "next/image";

export default function GhibliPage() {
  return (
    <div className="min-h-screen bg-ghibli-blue text-ghibli-brown font-ghibli">
      <header className="container mx-auto py-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Mundo Ghibli</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Uma página inspirada na poesia visual e sensibilidade dos filmes do
          Studio Ghibli.
        </p>
        <div className="mt-6">
          <Button className="bg-ghibli-cream text-ghibli-brown hover:bg-ghibli-brown hover:text-ghibli-cream">
            Explorar
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="relative w-[450px] h-[700px] max-w-xl mx-auto rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/ghibi.jpg"
            alt="Ghibli Style"
            width={450}
            height={850}
            className="object-cover w-full h-full"
          />
        </div>
        <p className="text-center mt-6 text-lg">
          A natureza, o tempo e os detalhes são parte da experiência Ghibli.
        </p>
      </main>
    </div>
  );
}
