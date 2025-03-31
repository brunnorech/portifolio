"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Code2,
  Layers,
  Smartphone,
  Zap,
  User,
  Mail,
  Linkedin,
  Github,
  Leaf,
  Cloud,
  Sun,
  Wind,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { toast } from "../../components/ui/sonner";
import { Badge } from "../../components/ui/badge";
import SplitText from "@/src/components/ui/splitted-text";
import FadeContent from "@/src/components/ui/fade-content";
import ProjectExperience from "../components/project-experience";

const Footer = () => {
  return (
    <div className="border-t border-[#a8dadc]/30 mt-8 pt-8 text-center">
      <p className="text-[#457b9d]">
        © {new Date().getFullYear()} Business Rech. Todos os direitos
        reservados.
      </p>
    </div>
  );
};

export default function GhibliPortfolio() {
  const [showtextExperience, setShowtextExperience] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const keywords = [
    "experiências mágicas",
    "jornadas visuais",
    "mundos encantados",
  ];

  useEffect(() => {
    if (showtextExperience) {
      const interval = setInterval(() => {
        setIsExiting(true);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % keywords.length);
          setIsExiting(false);
        }, 500);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showtextExperience, keywords.length]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = getFormData(event.currentTarget);

    if (!isValidFormData(formData)) {
      return toast.warning("Preencha todos os campos.");
    }

    await sendEmail(formData);
  };

  const getFormData = (form: HTMLFormElement) => {
    const formData = new FormData(form);
    return {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };
  };

  const isValidFormData = (data: Record<string, FormDataEntryValue | null>) => {
    return Boolean(data.email && data.message && data.subject);
  };

  const sendEmail = async (data: Record<string, FormDataEntryValue | null>) => {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      await response.json();

      if (response.ok) {
        handleSuccess();
      } else {
        handleError();
      }
    } catch (error) {
      console.error(error);
      handleError();
    }
  };

  const handleSuccess = () => {
    formRef.current?.reset();
    toast.success("E-mail enviado com sucesso!", {
      description: "A brech.dev te retornara em breve.",
    });
  };

  const handleError = () => {
    toast.error("Falha ao enviar e-mail!", {
      description: "Tente novamente mais tarde.",
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="fixed top-20 left-10 animate-float opacity-20">
        <Cloud className="text-[#a8dadc] w-16 h-16" />
      </div>
      <div className="fixed top-40 right-20 animate-float-slow opacity-20">
        <Leaf className="text-[#a8dadc] w-12 h-12" />
      </div>
      <div className="fixed bottom-20 left-20 animate-float-reverse opacity-20">
        <Wind className="text-[#a8dadc] w-14 h-14" />
      </div>
      <div className="fixed top-1/3 right-1/4 animate-pulse opacity-20">
        <Sun className="text-[#ffb703] w-20 h-20" />
      </div>

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
          {["Início", "Sobre", "Habilidades", "Projetos"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[#457b9d] hover:text-[#1d3557] transition-colors font-medium"
            >
              {item}
            </a>
          ))}
        </nav>
        <a href={"#contato"}>
          <Button className="bg-[#e76f51] hover:bg-[#e76f51]/90 text-white">
            Contato
          </Button>
        </a>
      </header>

      <section
        id="início"
        className="container mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center"
      >
        <div className="md:w-1/2 space-y-6">
          <SplitText
            text="Transformando ideias em"
            className="text-4xl md:text-6xl font-bold text-[#1d3557]"
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            threshold={0.2}
            delay={50}
            rootMargin="-50px"
            onLetterAnimationComplete={() => setShowtextExperience(true)}
          />
          {showtextExperience && (
            <SplitText
              text={keywords[currentIndex]}
              className="text-4xl md:text-6xl text-[#e76f51] font-bold transition-opacity duration-500"
              animationFrom={{
                opacity: 0,
                transform: "translate3d(0,50px,0)",
              }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              threshold={0.2}
              delay={0}
              isExiting={isExiting}
            />
          )}
          <FadeContent duration={1000} easing="ease-out" initialOpacity={0.5}>
            <p className="text-[#457b9d] text-lg md:text-xl max-w-md">
              Desenvolvimento fullstack de alta qualidade com foco em
              performance, acessibilidade e design inspirado.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#projetos">
                <Button className="bg-[#e76f51] hover:bg-[#e76f51]/90 text-white">
                  Ver Projetos <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="#sobre">
                <Button
                  variant="outline"
                  className="text-[#1d3557] border-[#1d3557] hover:bg-[#1d3557]/10"
                >
                  Sobre Mim
                </Button>
              </a>
            </div>
          </FadeContent>
        </div>

        <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
          <div className="relative w-80 h-80 md:w-96 md:h-96">
            <div className="absolute inset-0 bg-gradient-to-r from-[#a8dadc]/40 to-[#5c9ead]/40 rounded-full blur-3xl"></div>
            <div className="relative bg-[#f0e9d2] rounded-2xl p-8 shadow-xl border border-[#a8dadc]/30">
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
                  "AWS",
                ].map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="justify-center bg-[#a8dadc] text-[#1d3557]"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FadeContent blur duration={1000} easing="ease-out" initialOpacity={0.5}>
        <section id="sobre" className="bg-[#a8dadc]/20 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="bg-[#e76f51]/20 text-[#e76f51] hover:bg-[#e76f51]/20 px-4 py-1 text-sm mb-4">
                Sobre Mim
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1d3557]">
                Quem está por trás da{" "}
                <span className="text-[#e76f51]">Business Rech</span>
              </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="lg:w-2/5">
                <div className="relative w-full max-w-sm">
                  <div className="absolute -inset-2 w-full max-w-sm h-[530px] bg-gradient-to-r from-[#a8dadc] to-[#5c9ead] rounded-xl opacity-30 blur-md"></div>

                  <div className="relative w-full max-w-sm h-auto rounded-xl overflow-hidden border-2 border-white/10">
                    <Image
                      src="/ghibi.jpg"
                      alt="Desenvolvedor"
                      width={400}
                      height={500}
                      className="w-full h-auto object-cover object-[50%_30%]"
                    />
                  </div>
                </div>
              </div>

              <div className="md:w-3/5 space-y-6">
                <h3 className="text-2xl font-bold text-[#1d3557]">
                  Engenheiro de Software Apaixonado
                </h3>
                <p className="text-[#457b9d]">
                  Com mais de 5 anos de experiência no desenvolvimento de
                  interfaces modernas e responsivas, minha missão é criar
                  experiências digitais que não apenas impressionam visualmente,
                  mas também oferecem excelente usabilidade e performance.
                </p>
                <p className="text-[#457b9d]">
                  Especializado em React, Next.js e TypeScript, tenho trabalhado
                  com empresas de diversos segmentos para transformar suas
                  visões em realidade digital. Minha abordagem combina
                  princípios sólidos de design com as melhores práticas de
                  desenvolvimento.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#e76f51]/20 p-3 rounded-lg">
                      <Code2 className="h-5 w-5 text-[#e76f51]" />
                    </div>
                    <div>
                      <h4 className="text-[#1d3557] font-medium">Clean Code</h4>
                      <p className="text-[#457b9d] text-sm">
                        Código limpo e manutenível
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="bg-[#e76f51]/20 p-3 rounded-lg">
                      <Layers className="h-5 w-5 text-[#e76f51]" />
                    </div>
                    <div>
                      <h4 className="text-[#1d3557] font-medium">
                        Arquitetura
                      </h4>
                      <p className="text-[#457b9d] text-sm">
                        Soluções escaláveis
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="bg-[#e76f51]/20 p-3 rounded-lg">
                      <Smartphone className="h-5 w-5 text-[#e76f51]" />
                    </div>
                    <div>
                      <h4 className="text-[#1d3557] font-medium">Responsivo</h4>
                      <p className="text-[#457b9d] text-sm">
                        Design para todos dispositivos
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="bg-[#e76f51]/20 p-3 rounded-lg">
                      <Zap className="h-5 w-5 text-[#e76f51]" />
                    </div>
                    <div>
                      <h4 className="text-[#1d3557] font-medium">
                        Performance
                      </h4>
                      <p className="text-[#457b9d] text-sm">
                        Aplicações rápidas e otimizadas
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeContent>

      <FadeContent
        blur
        duration={500}
        easing="ease-in-out"
        initialOpacity={0.5}
      >
        <section id="habilidades" className="py-20 bg-[#f8f9fa]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="bg-[#e76f51]/20 text-[#e76f51] hover:bg-[#e76f51]/20 px-4 py-1 text-sm mb-4">
                Habilidades
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1d3557]">
                Tecnologias e{" "}
                <span className="text-[#e76f51]">Ferramentas</span>
              </h2>
              <p className="text-[#457b9d] mt-4 max-w-2xl mx-auto">
                Domínio das tecnologias mais recentes para criar experiências
                web modernas e eficientes
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
                  className="bg-[#f0e9d2] border-none shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <h3 className="text-[#1d3557] font-medium mb-3">
                      {skill.name}
                    </h3>
                    <div className="w-full bg-[#a8dadc]/30 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-[#e76f51] to-[#f4a261] h-2.5 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    <p className="text-right text-[#e76f51] text-sm mt-1">
                      {skill.level}%
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </FadeContent>

      <FadeContent blur duration={500} easing="ease-out" initialOpacity={0.5}>
        <section id="projetos" className="py-20 bg-[#a8dadc]/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="bg-[#e76f51]/20 text-[#e76f51] hover:bg-[#e76f51]/20 px-4 py-1 text-sm mb-4">
                Projetos
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1d3557]">
                Meus <span className="text-[#e76f51]">Trabalhos Recentes</span>
              </h2>
              <p className="text-[#457b9d] mt-4 max-w-2xl mx-auto">
                Uma seleção dos melhores projetos que demonstram minhas
                habilidades e experiência
              </p>
            </div>

            <ProjectExperience isGhibli />
          </div>
        </section>
      </FadeContent>

      <FadeContent blur duration={500} easing="ease-out" initialOpacity={0.5}>
        <section className="py-20 bg-[#f8f9fa]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="bg-[#e76f51]/20 text-[#e76f51] hover:bg-[#e76f51]/20 px-4 py-1 text-sm mb-4">
                Depoimentos
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1d3557]">
                O que os{" "}
                <span className="text-[#e76f51]">Colegas de trabalho </span>
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
                  className="bg-[#f0e9d2] border-none shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start mb-6">
                      <div className="bg-[#e76f51] rounded-full p-1.5 mr-4 mt-1 flex-shrink-0">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-[#1d3557] font-medium">
                          {recommendation.name}
                        </h3>
                        <p className="text-[#457b9d] text-sm mb-1">
                          {recommendation.role}
                        </p>
                        <p className="text-[#457b9d]/70 text-xs">
                          {recommendation.date}
                        </p>
                      </div>
                    </div>
                    <p className="text-[#457b9d]">{recommendation.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </FadeContent>

      <FadeContent blur duration={500} easing="ease-out" initialOpacity={0.5}>
        <section id="contato" className="py-20 bg-[#a8dadc]/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-1/2 space-y-6">
                <Badge className="bg-[#e76f51]/20 text-[#e76f51] hover:bg-[#e76f51]/20 px-4 py-1 text-sm">
                  Contato
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1d3557]">
                  Vamos <span className="text-[#e76f51]">Trabalhar Juntos</span>
                </h2>
                <p className="text-[#457b9d] max-w-md">
                  Estou disponível para projetos freelance, colaborações ou
                  oportunidades de trabalho em tempo integral.
                </p>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-[#e76f51]/20 p-3 rounded-full">
                      <Mail className="h-5 w-5 text-[#e76f51]" />
                    </div>
                    <div>
                      <h4 className="text-[#1d3557] font-medium">Email</h4>
                      <p className="text-[#457b9d]">contato@brech.dev</p>
                    </div>
                  </div>

                  <a
                    className="flex mt-4"
                    href="https://www.linkedin.com/in/bruno-rech-70291492/"
                    target="__blank"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-[#e76f51]/20 p-3 rounded-full">
                        <Linkedin className="h-5 w-5 text-[#e76f51]" />
                      </div>
                      <div>
                        <h4 className="text-[#1d3557] font-medium">LinkedIn</h4>
                        <p className="text-[#457b9d]">Bruno Rech</p>
                      </div>
                    </div>
                  </a>

                  <a
                    className="flex mt-4"
                    href="https://github.com/brunnorech"
                    target="__blank"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-[#e76f51]/20 p-3 rounded-full">
                        <Github className="h-5 w-5 text-[#e76f51]" />
                      </div>
                      <div>
                        <h4 className="text-[#1d3557] font-medium">GitHub</h4>
                        <p className="text-[#457b9d]">brunnorech</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="lg:w-1/2">
                <Card className="bg-[#f0e9d2] border-none shadow-xl">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-[#1d3557] mb-6">
                      Envie uma mensagem
                    </h3>
                    <form
                      ref={formRef}
                      className="space-y-4"
                      onSubmit={handleSubmit}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="name"
                            className="text-[#1d3557] text-sm"
                          >
                            Nome
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full px-4 py-2 bg-white border border-[#a8dadc] rounded-md text-[#1d3557] focus:outline-none focus:ring-2 focus:ring-[#e76f51]"
                            placeholder="Seu nome"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="text-[#1d3557] text-sm"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-2 bg-white border border-[#a8dadc] rounded-md text-[#1d3557] focus:outline-none focus:ring-2 focus:ring-[#e76f51]"
                            placeholder="seu@email.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="subject"
                          className="text-[#1d3557] text-sm"
                        >
                          Assunto
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          className="w-full px-4 py-2 bg-white border border-[#a8dadc] rounded-md text-[#1d3557] focus:outline-none focus:ring-2 focus:ring-[#e76f51]"
                          placeholder="Assunto da mensagem"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-[#1d3557] text-sm"
                        >
                          Mensagem
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          className="w-full px-4 py-2 bg-white border border-[#a8dadc] rounded-md text-[#1d3557] focus:outline-none focus:ring-2 focus:ring-[#e76f51] resize-none"
                          placeholder="Sua mensagem aqui..."
                        ></textarea>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-[#e76f51] hover:bg-[#e76f51]/90 text-white"
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
      </FadeContent>

      <footer className="bg-[#1d3557] py-12">
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
              <p className="text-[#a8dadc] mt-2 max-w-xs">
                Desenvolvimento fullstack de alta qualidade para empresas e
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
                        className="text-[#a8dadc] hover:text-[#e76f51] transition-colors"
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
                        className="text-[#a8dadc] hover:text-[#e76f51] transition-colors"
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
                          className="text-[#a8dadc] hover:text-[#e76f51] transition-colors"
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
