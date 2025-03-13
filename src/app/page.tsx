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
  ExternalLink,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[rgb(66,74,89)]">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="w-48">
          <Image
            src="/logo.svg"
            alt="BRDEV Logo"
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
                className="text-white hover:text-green-400 transition-colors"
              >
                {item}
              </a>
            )
          )}
        </nav>
        <a href={"#contato"}>
          <Button className="bg-green-500 hover:bg-green-600 text-white">
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
          <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/20 px-4 py-1 text-sm">
            Desenvolvedor Fullstack
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Transformando ideias em{" "}
            <span className="text-green-400">experiências digitais</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-md">
            Desenvolvimento frontend de alta qualidade com foco em performance,
            acessibilidade e design moderno.
          </p>
          <div className="flex space-x-4 pt-4">
            <a href="#projetos">
              <Button className="bg-green-500 hover:bg-green-600 text-white">
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
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
            <div className="relative bg-[rgb(56,64,79)] rounded-2xl p-8 shadow-xl border border-white/10">
              <Image
                src="/logo.svg"
                alt="BRDEV Logo"
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
            <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/20 px-4 py-1 text-sm mb-4">
              Sobre Mim
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Quem está por trás da{" "}
              <span className="text-green-400">BRDEV</span>
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-2/5">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl opacity-30 blur-lg"></div>
                <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-white/10">
                  <Image
                    src="/perfil.jpeg"
                    alt="Desenvolvedor"
                    width={500}
                    height={500}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="md:w-3/5 space-y-6">
              <h3 className="text-2xl font-bold text-white">
                Desenvolvedor Frontend Apaixonado
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
                  <div className="bg-green-500/20 p-3 rounded-lg">
                    <Code2 className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Clean Code</h4>
                    <p className="text-gray-400 text-sm">
                      Código limpo e manutenível
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-green-500/20 p-3 rounded-lg">
                    <Layers className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Arquitetura</h4>
                    <p className="text-gray-400 text-sm">Soluções escaláveis</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-green-500/20 p-3 rounded-lg">
                    <Smartphone className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Responsivo</h4>
                    <p className="text-gray-400 text-sm">
                      Design para todos dispositivos
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-green-500/20 p-3 rounded-lg">
                    <Zap className="h-5 w-5 text-green-400" />
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

      {/* Skills Section */}
      <section id="habilidades" className="py-20 bg-[rgb(66,74,89)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/20 px-4 py-1 text-sm mb-4">
              Habilidades
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Tecnologias e <span className="text-green-400">Ferramentas</span>
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
                      className="bg-gradient-to-r from-green-500 to-green-400 h-2.5 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <p className="text-right text-green-400 text-sm mt-1">
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
            <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/20 px-4 py-1 text-sm mb-4">
              Projetos
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Meus <span className="text-green-400">Trabalhos Recentes</span>
            </h2>
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
              Uma seleção dos melhores projetos que demonstram minhas
              habilidades e experiência
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-commerce Moderno",
                description:
                  "Plataforma de e-commerce completa com carrinho, pagamentos e área do cliente",
                image: "/placeholder.svg?height=400&width=600",
                tags: ["React", "Next.js", "Stripe", "Tailwind"],
              },
              {
                title: "Dashboard Analítico",
                description:
                  "Painel administrativo com visualizações de dados e relatórios em tempo real",
                image: "/placeholder.svg?height=400&width=600",
                tags: ["TypeScript", "React", "Chart.js", "Redux"],
              },
              {
                title: "Aplicativo de Finanças",
                description:
                  "Aplicativo para controle financeiro pessoal com gráficos e categorização",
                image: "/placeholder.svg?height=400&width=600",
                tags: ["React", "Firebase", "Styled Components"],
              },
              {
                title: "Rede Social",
                description:
                  "Plataforma de rede social com feed, perfis e sistema de mensagens",
                image: "/placeholder.svg?height=400&width=600",
                tags: ["Next.js", "MongoDB", "Socket.io", "Tailwind"],
              },
              {
                title: "Plataforma Educacional",
                description:
                  "Sistema de cursos online com vídeos, quizzes e certificados",
                image: "/placeholder.svg?height=400&width=600",
                tags: ["React", "Node.js", "PostgreSQL", "AWS"],
              },
              {
                title: "Aplicativo de Delivery",
                description:
                  "Aplicativo para pedidos de comida com rastreamento em tempo real",
                image: "/placeholder.svg?height=400&width=600",
                tags: ["React Native", "Redux", "Google Maps API"],
              },
            ].map((project, index) => (
              <Card
                key={index}
                className="overflow-hidden border-none bg-[rgb(66,74,89)] shadow-xl group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgb(66,74,89)] to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="sm"
                      className="bg-green-500 hover:bg-green-600 text-white rounded-full"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 text-sm">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-green-500/20 text-green-400"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              Ver Todos os Projetos <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[rgb(66,74,89)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/20 px-4 py-1 text-sm mb-4">
              Depoimentos
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              O que os <span className="text-green-400">Clientes Dizem</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Ana Silva",
                role: "CEO, TechStart",
                content:
                  "Trabalhar com a BRDEV foi uma experiência incrível. O profissionalismo e a qualidade do trabalho superaram todas as nossas expectativas.",
                image: "/placeholder.svg?height=100&width=100",
              },
              {
                name: "Carlos Mendes",
                role: "Diretor de Marketing, InnovateBR",
                content:
                  "O redesign do nosso site aumentou significativamente nossas conversões. A atenção aos detalhes e a experiência do usuário são impecáveis.",
                image: "/placeholder.svg?height=100&width=100",
              },
              {
                name: "Juliana Costa",
                role: "Fundadora, EduTech",
                content:
                  "Nossa plataforma educacional ganhou vida com o trabalho da BRDEV. A interface intuitiva e responsiva recebeu elogios de todos os usuários.",
                image: "/placeholder.svg?height=100&width=100",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="bg-[rgb(56,64,79)] border-none shadow-lg"
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="relative w-12 h-12 mr-4">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={100}
                        height={100}
                        className="rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                        <svg
                          width="8"
                          height="8"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-medium">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">{testimonial.content}</p>
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
              <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/20 px-4 py-1 text-sm">
                Contato
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Vamos <span className="text-green-400">Trabalhar Juntos</span>
              </h2>
              <p className="text-gray-300 max-w-md">
                Estou disponível para projetos freelance, colaborações ou
                oportunidades de trabalho em tempo integral.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-500/20 p-3 rounded-full">
                    <Mail className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Email</h4>
                    <p className="text-gray-300">contato@brdev.com.br</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-green-500/20 p-3 rounded-full">
                    <Linkedin className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">LinkedIn</h4>
                    <p className="text-gray-300">linkedin.com/in/brdev</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-green-500/20 p-3 rounded-full">
                    <Github className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">GitHub</h4>
                    <p className="text-gray-300">github.com/brdev</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <h3 className="text-white font-medium mb-4">
                  Me siga nas redes sociais
                </h3>
                <div className="flex space-x-4">
                  {["twitter", "instagram", "facebook", "youtube"].map(
                    (social) => (
                      <a
                        key={social}
                        href={`https://${social}.com`}
                        className="bg-[rgb(66,74,89)] p-3 rounded-full hover:bg-green-500/20 transition-colors"
                      >
                        <span className="sr-only">{social}</span>
                        <svg
                          className="h-5 w-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                        </svg>
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <Card className="bg-[rgb(66,74,89)] border-none shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Envie uma mensagem
                  </h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-white text-sm">
                          Nome
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-2 bg-[rgb(76,84,99)] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
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
                          className="w-full px-4 py-2 bg-[rgb(76,84,99)] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
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
                        className="w-full px-4 py-2 bg-[rgb(76,84,99)] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Assunto da mensagem"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-white text-sm">
                        Mensagem
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        className="w-full px-4 py-2 bg-[rgb(76,84,99)] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                        placeholder="Sua mensagem aqui..."
                      ></textarea>
                    </div>

                    <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
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
                alt="BRDEV Logo"
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
                        className="text-gray-400 hover:text-green-400 transition-colors"
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
                        className="text-gray-400 hover:text-green-400 transition-colors"
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
                          className="text-gray-400 hover:text-green-400 transition-colors"
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

          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} BRDEV. Todos os direitos reservados.
            </p>
            <p className="text-gray-400 text-sm">
              Desenvolvido com ❤️ em React e Next.js
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
