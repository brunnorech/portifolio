import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";

export default function ProjectExperience() {
  const experiences = [
    {
      company: "Renner SA",
      position: "Desenvolvedor Front-end",
      period: "abril 2023 — fevereiro 2025",
      location: "Remoto",
      description:
        "Desenvolvimento do app e site do cliente Renner S/A, utilizando React, React Native e TypeScript. Implementação de testes unitários, Storybook e integrações com API Rest e GraphQL. Aplicação de patterns como Compound Components, Providers e HOC.",
      tags: [
        "React",
        "React Native",
        "TypeScript",
        "Unit Tests",
        "Storybook",
        "REST API",
        "GraphQL",
      ],
      url: "#",
    },
    {
      company: "Nova Tendência",
      position: "Desenvolvedor Front-end",
      period: "novembro 2022 — março 2023",
      location: "Remoto",
      description:
        "Desenvolvimento de aplicações web responsivas utilizando React, TypeScript e Styled-Components.",
      tags: ["React", "TypeScript", "Styled-Components", "Responsive Design"],
    },
    {
      company: "Deliver IT",
      position: "Desenvolvedor Front-end",
      period: "abril 2022 — novembro 2022",
      location: "Remoto",
      description:
        "Desenvolvimento de soluções bancárias para o cliente utilizando NextJS com TypeScript e Styled Components seguindo a metodologia ágil Scrum.",
      tags: [
        "Next.js",
        "TypeScript",
        "Styled-Components",
        "Scrum",
        "Banking Solutions",
      ],
    },
    {
      company: "KapMug",
      position: "Desenvolvedor Front-end",
      period: "abril 2019 — abril 2022",
      location: "São Paulo",
      description:
        "Desenvolvimento de aplicações utilizando JavaScript (ReactJS, React Native, Node.js, Ramda) e MongoDB. Experiência em testes E2E com Detox em projetos React Native. Implementação de APIs com GraphQL e REST. Publicação de aplicativos nas lojas App Store e Google Play.",
      tags: [
        "React",
        "React Native",
        "Node.js",
        "MongoDB",
        "GraphQL",
        "REST API",
        "Detox",
        "App Store",
        "Google Play",
      ],
    },
  ];

  return (
    <div className="relative w-full">
      <div className="flex overflow-x-auto pb-6 gap-6 snap-x snap-mandatory scroll-smooth scrollbar-hide">
        {experiences.map((experience, index) => (
          <Card
            key={index}
            className="overflow-hidden border-none bg-[rgb(66,74,89)] shadow-xl group flex-shrink-0 w-[350px] snap-start"
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white">
                  {experience.company}
                </h3>
              </div>

              <div className="mb-4">
                <p className="text-sky-400 font-medium">
                  {experience.position}
                </p>
                <p className="text-gray-300 text-sm">
                  {experience.period} • {experience.location}
                </p>
              </div>

              <p className="text-gray-300 mb-4 text-sm">
                {experience.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {experience.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-sky-500/20 text-sky-400"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="absolute left-0 top-0 bottom-6 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-6 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
    </div>
  );
}
