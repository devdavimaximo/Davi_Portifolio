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
    headlineLines: ['Enquanto você explora...', 'eu construo.'],
    description:
      'Especializado em C# e .NET, desenvolvendo aplicações robustas do backend à interface, com foco em arquitetura, performance e escalabilidade.',
    stack: 'C# · ASP.NET · React · JavaScript · PostgreSQL',
    contactCta: 'Ver projetos',
  },
} as const;

export type Dictionary = typeof ptBr;
