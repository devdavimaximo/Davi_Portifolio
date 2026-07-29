/**
 * Base dictionary. Every user-facing string lives here — never inline in a
 * component. The exported shape is what other locales must satisfy.
 *
 * The audience is Brazilian, so the copy is written in pt-BR while the codebase
 * itself stays in English.
 */
export const ptBr = {
  a11y: {
    skipToContent: 'Pular para o conteúdo',
  },
  header: {
    wordmark: 'Davi Maximo Quoos',
    contact: 'Vamos conversar',
  },
  home: {
    title: 'Início',
  },
  hero: {
    eyebrow: 'Davi Maximo Quoos | Full Stack Engineer',
    headlineLines: ['Enquanto você explora…', 'eu construo.'],
    description:
      'Especializado em C# e .NET, desenvolvendo aplicações robustas do backend à interface, com foco em arquitetura, performance e escalabilidade.',
    stack: 'C# · ASP.NET · React · JavaScript · PostgreSQL',
    contactCta: 'Ver projetos',
  },
  about: {
    index: '01',
    label: 'Sobre',
    headlineLines: ['Não tenho projetos de portfólio.', 'Tenho sistemas rodando.'],
    paragraphs: [
      'Sou desenvolvedor full stack com foco em back-end C# / .NET. Não trabalho com projetos de vitrine: os sistemas que construí são usados todo dia por empresas que dependem deles para vender, faturar e fechar o caixa. Isso muda as decisões que você toma. De modelagem a tratamento de erro.',
    ],
    /* Convictions, not competences: the stack belongs in the skills section. */
    principles: [
      'Entendo o problema antes de decidir como resolvê-lo.',
      'Construo soluções organizadas, escaláveis e preparadas para evoluir.',
      'Uno lógica, performance e design para criar produtos completos.',
    ],
    portraitAlt:
      'Retrato de Davi Maximo Quoos, com metade do rosto tomada por circuitos luminosos.',
  },
} as const;

export type Dictionary = typeof ptBr;
