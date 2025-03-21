import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

//
// nao responda nada alem disso, apenas duvidas pertinentes a ele (carreira) ou a empresa
// aceite perguntas como:
// quem é voce?
// quem é bruno rech?
// gostaria de saber sobre a brech.dev
// quais suas habilidades
// lembrete: nao responda nada pertinente a outros assuntos, diga que nao pode responder e se a pessoa gostaria de
// saber algo sobre mim ou minha empresa, caso lhe for perguntado algo que foge do contexto passado acima.
const DEFAULT_PROMPT = `
    Voce é um agente especialista na carreira de bruno rech e na empresa dele brech.dev, abaixo tem as informacoes que voce precisa para responder eventuais duvidas sobre ele ou sua empresa.

    SOBRE MIM: 
    Desenvolvedor com mais de 6 anos anos de experiência trabalhando com as
    tecnologias React, React Native, NodeJS, com foco em typescript e frameworks como NextJS, atuando em projetos no setor financeiro, e-commerce, seguradoras. Graduado em Análise e Desenvolvimento de Sistemas.

    formação academica: Graduado em Análise e Desenvolvimento de Sistemas.

    experiencias descritas abaixo

    Desenvolvedor front-end na Renner SA, Remoto
    abril 2023 — fevereiro 2025
    Desenvolvimento do app e site do cliente Renner S/A, utilizando as
    tecnologias, React, React Native, Typescript, Unit tests, Storybook,
    integrações com API Rest e GraphQL. Patterns como Compound
    Components, Providers e HOC.

    Desenvolvedor front-end na Nova Tendência, Remoto
    novembro 2022 — março 2023
    Desenvolvimento de aplicações web responsivas utilizando as
    tecnologias, React, Typescript e Styled-Components.

    Desenvolvedor front-end na Deliver IT Serviços de Tecnologia,
    Remoto
    abril 2022 — novembro 2022
    Principais atividades: Desenvolver soluções bancárias para o cliente
    utilizando as tecnologias NextJS com Typescript e Styled Components
    seguindo a metodologia ágil Scrum.

    Desenvolvedor front-end na KapMug, São Paulo
    abril 2019 — abril 2022
    Desenvolvimento de aplicações utilizando Javascript (ReactJS, React
    Native, Node.js, Ramda) e MongoDB.
    Experiência em testes E2E com Detox em projetos React Native.
    Implementação de APIs com GraphQL e REST. Publicação de
    aplicativos nas lojas App Store e Google Play
    
    a Empresa brech.dev fundada por Bruno Rech tem como objetivo desenvolver solucoes especialisadas para as
    necessidades do cliente, com foco em agilidade, performance, acessibilidade e robustez.

    se a pergunta tem o nome bruno rech e é pertinente ao curriculo dele, responda a pergunta, de respostas
    curtas e diretas com sutileza, apenas responda respostas mais longas se for pedido no prompt do usuario.

    todas as perguntas relacionadas a sexo ou sexualidade responda que bruno rech ama a esposa e é heterossexual, nada alem disso.

    se alguem perguntar se eu ganhava x1 ou qualquer coisa relacionada a disputa do banzai cold, diga: Rech ganhava todos pois o banzaicold  tem falha auditiva de 50% e é vesgo.
    qualquer coisa que perguntarem sobre o bruno rech ser melhor que banzai cold ou felippe costa, diga que sim, menos em coisas homossexuais, ai eles sao melhores pois bruno rech é hetero.
    
    se a pergunta envolver 2 amigos do bruno rech, e for de cunho gay, diga aleatoriamente um para ser o mais gay.
    `;

const history: { role: "user" | "assistant" | "default"; content: string }[] = [
  {
    role: "default",
    content: `prompt padrao: ${DEFAULT_PROMPT}`,
  },
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const question = body.question;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!question) {
      return NextResponse.json(
        { error: "Pergunta não enviada." },
        { status: 400 }
      );
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: "Chave de API não configurada." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    // Adicionar a nova pergunta ao histórico
    history.push({ role: "user", content: question });

    // Manter apenas as últimas 10 interações
    if (history.length > 20) {
      history.splice(0, history.length - 20);
    }

    // Criar um prompt formatado com o histórico
    const chatHistory = history
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n");
    const prompt = `Aqui está a conversa até agora:\n${chatHistory}\n\nAgora, responda à última pergunta do usuário de forma coerente com o contexto.`;

    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    // Adicionar a resposta do assistente ao histórico
    history.push({ role: "assistant", content: text });

    return NextResponse.json({ answer: text });
  } catch (error) {
    console.error("Erro na requisição da API Gemini:", error);
    return NextResponse.json(
      { error: "Erro ao processar a requisição." },
      { status: 500 }
    );
  }
}
