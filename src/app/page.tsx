"use client";

import Image from "next/image";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Code2,
  Layers,
  Smartphone,
  Zap,
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  User,
} from "lucide-react";

import dynamic from "next/dynamic";
import ProjectExperience from "./components/project-experience";
const Footer = dynamic(() => import("./components/footer"), { ssr: false });

export default function Home() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    console.log({ data }, "data");

    if (!data.email || !data.message || !data.subject) return null;

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log({ result, json: JSON.stringify(result) }, "sadf");
      if (response.ok) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      alert("Erro ao enviar formulário." + JSON.stringify(error));
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(66,74,89)]">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="w-48">
          <Image
            src="/logo.svg"
            alt="brech Logo"
            width={320}
            height={80}
            className="h-auto"
          />
        </div>
        <nav className="hidden md:flex space-x-6">
          {["Início", "Sobre", "Habilidades", "Projetos", "Contato"].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white hover:text-sky-400 transition-colors"
              >
                {item}
              </a>
            )
          )}
        </nav>
        <a href={"#contato"}>
          <Button className="bg-sky-500 hover:bg-sky-600 text-white">
            Contato
          </Button>
        </a>
      </header>

      {/* Hero Section */}
      <section
        id="início"
        className="container mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center"
      >
        <div className="md:w-1/2 space-y-6">
          <Badge className="bg-sky-500/20 text-sky-400 hover:bg-sky-500/20 px-4 py-1 text-sm">
            Desenvolvedor Fullstack
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Transformando ideias em{" "}
            <span className="text-sky-400">experiências digitais</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-md">
            Desenvolvimento fullstack de alta qualidade com foco em performance,
            acessibilidade e design moderno.
          </p>
          <div className="flex space-x-4 pt-4">
            <a href="#projetos">
              <Button className="bg-sky-500 hover:bg-sky-600 text-white">
                Ver Projetos <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <a href="#sobre">
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white/10"
              >
                Sobre Mim
              </Button>
            </a>
          </div>
        </div>
        <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
          <div className="relative w-80 h-80 md:w-96 md:h-96">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
            <div className="relative bg-[rgb(56,64,79)] rounded-2xl p-8 shadow-xl border border-white/10">
              <Image
                src="/logo.svg"
                alt="brech Logo"
                width={200}
                height={80}
                className="mx-auto mb-6"
              />
              <div className="grid grid-cols-3 gap-4">
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Tailwind",
                  "Node.js",
                  "UI/UX",
                ].map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="justify-center bg-[rgb(76,84,99)] text-white"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="bg-[rgb(56,64,79)] py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-sky-500/20 text-sky-400 hover:bg-sky-500/20 px-4 py-1 text-sm mb-4">
              Sobre Mim
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Quem está por trás da{" "}
              <span className="text-sky-400">Business Rech</span>
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-2/5">
              <div className="relative w-full max-w-sm">
                {/* Glow effect */}
                <div className="absolute -inset-2 w-full max-w-sm h-[530px] bg-gradient-to-r from-sky-500 to-blue-500 rounded-xl opacity-30 blur-md"></div>

                {/* Imagem responsiva */}
                <div className="relative w-full max-w-sm h-auto rounded-xl overflow-hidden border-2 border-white/10">
                  <Image
                    src="/perfil.jpeg"
                    alt="Desenvolvedor"
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover object-[50%_30%]"
                  />
                </div>
              </div>
            </div>

            <div className="md:w-3/5 space-y-6">
              <h3 className="text-2xl font-bold text-white">
                Engenheiro de Software Apaixonado.
              </h3>
              <p className="text-gray-300">
                Com mais de 5 anos de experiência no desenvolvimento de
                interfaces modernas e responsivas, minha missão é criar
                experiências digitais que não apenas impressionam visualmente,
                mas também oferecem excelente usabilidade e performance.
              </p>
              <p className="text-gray-300">
                Especializado em React, Next.js e TypeScript, tenho trabalhado
                com empresas de diversos segmentos para transformar suas visões
                em realidade digital. Minha abordagem combina princípios sólidos
                de design com as melhores práticas de desenvolvimento.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-sky-500/20 p-3 rounded-lg">
                    <Code2 className="h-5 w-5 text-sky-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Clean Code</h4>
                    <p className="text-gray-400 text-sm">
                      Código limpo e manutenível
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-sky-500/20 p-3 rounded-lg">
                    <Layers className="h-5 w-5 text-sky-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Arquitetura</h4>
                    <p className="text-gray-400 text-sm">Soluções escaláveis</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-sky-500/20 p-3 rounded-lg">
                    <Smartphone className="h-5 w-5 text-sky-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Responsivo</h4>
                    <p className="text-gray-400 text-sm">
                      Design para todos dispositivos
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-sky-500/20 p-3 rounded-lg">
                    <Zap className="h-5 w-5 text-sky-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Performance</h4>
                    <p className="text-gray-400 text-sm">
                      Aplicações rápidas e otimizadas
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="habilidades" className="py-20 bg-[rgb(66,74,89)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-sky-500/20 text-sky-400 hover:bg-sky-500/20 px-4 py-1 text-sm mb-4">
              Habilidades
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Tecnologias e <span className="text-sky-400">Ferramentas</span>
            </h2>
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
              Domínio das tecnologias mais recentes para criar experiências web
              modernas e eficientes
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "HTML5", level: 95 },
              { name: "CSS3/Sass", level: 90 },
              { name: "JavaScript", level: 95 },
              { name: "TypeScript", level: 90 },
              { name: "React", level: 95 },
              { name: "Next.js", level: 85 },
              { name: "Tailwind CSS", level: 90 },
              { name: "Context API", level: 95 },
              { name: "Node.js", level: 70 },
              { name: "Git/GitHub", level: 90 },
              { name: "Figma", level: 80 },
              { name: "Testes", level: 82 },
            ].map((skill) => (
              <Card
                key={skill.name}
                className="bg-[rgb(56,64,79)] border-none shadow-lg"
              >
                <CardContent className="p-6">
                  <h3 className="text-white font-medium mb-3">{skill.name}</h3>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-sky-500 to-sky-400 h-2.5 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <p className="text-right text-sky-400 text-sm mt-1">
                    {skill.level}%
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projetos" className="py-20 bg-[rgb(56,64,79)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-sky-500/20 text-sky-400 hover:bg-sky-500/20 px-4 py-1 text-sm mb-4">
              Projetos
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Meus <span className="text-sky-400">Trabalhos Recentes</span>
            </h2>
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
              Uma seleção dos melhores projetos que demonstram minhas
              habilidades e experiência
            </p>
          </div>

          <ProjectExperience />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[rgb(66,74,89)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-sky-500/20 text-sky-400 hover:bg-sky-500/20 px-4 py-1 text-sm mb-4">
              Depoimentos
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              O que os{" "}
              <span className="text-sky-400">Colegas de trabalho </span>
              Dizem
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Bruno Nascimento",
                role: "Desenvolvedor | HCIA-AI",
                content:
                  "Recomendo muito o Bruno, um habilidoso profissional especializado em React, React Native e TypeScript. Trabalhamos juntos em diversos projetos, e suas competências técnicas e comprometimento sempre foram notáveis.",
                date: "15 de fevereiro de 2024",
              },
              {
                name: "Felippe Costa",
                role: "Suporte Especializado PL TIVIT",
                content:
                  "Tive o prazer de colaborar com Bruno em alguns projetos, onde sua experiência excepcional em React Native e TypeScript se destacou. Sua capacidade de transformar conceitos complexos em soluções elegantes e eficientes, seu foco e dedicação foram inspiradoras para toda equipe, um excelente profissional.",
                date: "12 de fevereiro de 2024",
              },
              {
                name: "Mohamed Nasser El Lakkis",
                role: "Desenvolvedor | Java, React.js, Next.js, React native",
                content:
                  "O Bruno é um excelência companheiro de equipe, sempre disposto a te ajudar e resolver algum problema no código. Super atencioso e proporciona uma excelente convivência em equipe, sendo dinâmico. Bruno sempre foi muito esforçado e comprometido com a equipe.",
                date: "24 de agosto de 2022",
              },
              {
                name: "Antonio Carlos",
                role: "Desenvolvedor Front-End | ReactJS & Next.js | Typescript | JavaScript",
                content: "Manda bem no ReactJS",
                date: "24 de agosto de 2022",
              },
            ].map((recommendation, index) => (
              <Card
                key={index}
                className="bg-[rgb(56,64,79)] border-none shadow-lg"
              >
                <CardContent className="p-8">
                  <div className="flex items-start mb-6">
                    <div className="bg-sky-500 rounded-full p-1.5 mr-4 mt-1 flex-shrink-0">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">
                        {recommendation.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-1">
                        {recommendation.role}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {recommendation.date}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-300">{recommendation.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 bg-[rgb(56,64,79)]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2 space-y-6">
              <Badge className="bg-sky-500/20 text-sky-400 hover:bg-sky-500/20 px-4 py-1 text-sm">
                Contato
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Vamos <span className="text-sky-400">Trabalhar Juntos</span>
              </h2>
              <p className="text-gray-300 max-w-md">
                Estou disponível para projetos freelance, colaborações ou
                oportunidades de trabalho em tempo integral.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-sky-500/20 p-3 rounded-full">
                    <Mail className="h-5 w-5 text-sky-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Email</h4>
                    <p className="text-gray-300">contato@brech.dev</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-sky-500/20 p-3 rounded-full">
                    <Linkedin className="h-5 w-5 text-sky-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">LinkedIn</h4>
                    <p className="text-gray-300">
                      linkedin.com/in/bruno-rech-70291492
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-sky-500/20 p-3 rounded-full">
                    <Github className="h-5 w-5 text-sky-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">GitHub</h4>
                    <p className="text-gray-300">github.com/brunnorech</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <Card className="bg-[rgb(66,74,89)] border-none shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Envie uma mensagem
                  </h3>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-white text-sm">
                          Nome
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="w-full px-4 py-2 bg-[rgb(76,84,99)] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                          placeholder="Seu nome"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-white text-sm">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="w-full px-4 py-2 bg-[rgb(76,84,99)] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-white text-sm">
                        Assunto
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="w-full px-4 py-2 bg-[rgb(76,84,99)] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="Assunto da mensagem"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-white text-sm">
                        Mensagem
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        className="w-full px-4 py-2 bg-[rgb(76,84,99)] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                        placeholder="Sua mensagem aqui..."
                      ></textarea>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-sky-500 hover:bg-sky-600 text-white"
                    >
                      Enviar Mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[rgb(46,54,69)] py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Image
                src="/logo.svg"
                alt="brech Logo"
                width={120}
                height={40}
                className="h-auto"
              />
              <p className="text-gray-400 mt-2 max-w-xs">
                Desenvolvimento frontend de alta qualidade para empresas e
                startups.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
              <div>
                <h4 className="text-white font-medium mb-4">Links Rápidos</h4>
                <ul className="space-y-2">
                  {[
                    "Início",
                    "Sobre",
                    "Habilidades",
                    "Projetos",
                    "Contato",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase()}`}
                        className="text-gray-400 hover:text-sky-400 transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-white font-medium mb-4">Serviços</h4>
                <ul className="space-y-2">
                  {[
                    "Desenvolvimento Web",
                    "UI/UX Design",
                    "Consultoria",
                    "Manutenção",
                    "SEO",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-sky-400 transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-white font-medium mb-4">Legal</h4>
                <ul className="space-y-2">
                  {["Termos de Uso", "Política de Privacidade", "Cookies"].map(
                    (item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-gray-400 hover:text-sky-400 transition-colors"
                        >
                          {item}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </footer>
    </div>
  );
}
