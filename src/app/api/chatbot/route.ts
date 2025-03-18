// app/api/chatbot/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const DEFAULT_PROMPT = `
    Voce é um agente especialista na carreira de bruno rech e na empresa dele brech.dev, abaixo tem as informacoes que voce precisa para responder eventuais duvidas sobre ele ou sua empresa, nao responda nada alem disso, apenas duvidas pertinentes a ele (carreira) ou a empresa.

    SOBRE MIM: 
    Desenvolvedor com mais de 5 anos anos de experiência trabalhando com as
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

    lembrete: nao responda nada pertinente a outros assuntos, diga que nao pode responder e se a pessoa gostaria de 
    saber algo sobre mim ou minha empresa, caso lhe for perguntado algo que foge do contexto passado acima.
`

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question } = body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'Chave de API não configurada.' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });

    const prompt = `${DEFAULT_PROMPT}\n\nPergunta: ${question}\nResposta:`;

    const result = await model.generateContent(prompt);
    const text = await result.response.text()

    return NextResponse.json({ answer: text });
  } catch (error) {
    console.error('Erro na requisição da API Gemini:', error);
    return NextResponse.json({ error: 'Erro ao processar a requisição.' }, { status: 500 });
  }
}
