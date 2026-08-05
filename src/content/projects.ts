import type { Project } from './types';

/**
 * Showcase source of truth.
 *
 * `slug` is the case's permanent identity: it becomes the route segment once
 * per-case pages exist, so it is also the URL that gets shared and indexed.
 * Change one before those routes ship and it costs nothing; change one after
 * and it breaks a live address. Keep them lowercase, unaccented and hyphenated.
 */
export const projects: readonly Project[] = [
  {
    slug: 'gestao-comercial-erp-pdv',
    title: 'Sistema de gestão comercial | ERP + PDV',
    summary:
      'Substitui uma solução terceirizada cara e pouco adaptada à operação por um sistema próprio, visual e moldado ao fluxo real da loja.',
    role: 'Desenvolvimento Full Stack',
    client: 'Loja de bebidas com operação diária de caixa e alto volume de uso do PDV.',
    stack: ['C#', 'ASP.NET Core', 'PostgreSQL', 'React'],
    narrative: {
      problem:
        'A loja dependia de sistemas terceirizados que exigiam mensalidades em constante aumento. Uma das soluções era completa, mas pouco visual e não acompanhava o ritmo da operação; a outra era mais intuitiva, porém limitada. Como o PDV era utilizado por mais de 6 horas por dia, a ausência de atalhos adaptados à rotina tornava o fluxo do caixa mais lento e repetitivo.',
      decision:
        'Em vez de adaptar a operação às limitações de uma ferramenta pronta, desenvolvi um ERP + PDV sob medida. A solução reuniu gestão comercial, estoque, vendas, caixa, clientes, fornecedores, relatórios e permissões em um único sistema, com navegação visual, imagens dos produtos e atalhos pensados para o fluxo real do atendimento.',
      outcome:
        'A cliente passou a operar com uma solução própria, sem depender da mensalidade crescente de uma plataforma terceirizada. A organização visual dos produtos facilitou a localização dos itens, enquanto os atalhos e o fluxo simplificado tornaram o atendimento no caixa mais direto. Segundo o feedback da cliente, a facilidade para encontrar produtos se tornou uma das melhorias mais percebidas no uso diário.',
    },
    metric: {
      value: '− R$ 700/mês',
      label: 'em mensalidades eliminadas',
    },
  },
  {
    slug: 'gestao-escolar-contraturno',
    title: 'Sistema de gestão escolar para escolinha contraturno',
    summary:
      'Uma plataforma completa para centralizar a gestão da escolinha, substituir processos manuais e tornar informações essenciais mais acessíveis à equipe.',
    role: 'Desenvolvimento Full Stack · Produto · Design',
    client: 'Escolinha de contraturno com processos administrativos e operacionais realizados manualmente, sem um sistema centralizado para organizar dados e acompanhar a rotina.',
    stack: ['C#', 'ASP.NET Core', 'PostgreSQL', 'React'],
    narrative: {
      problem:
        'A escolinha não possuía um sistema de gestão. Informações sobre crianças, responsáveis, funcionários, turmas, matrículas e a rotina diária eram registradas em papéis e anotações, dificultando a organização, a consulta de dados e aumentando o risco de perda de informações importantes.',
      decision:
        'Desenvolvi uma plataforma de gestão completa para centralizar a operação em um único ambiente, reunindo cadastros, turmas, matrículas, frequência, agenda diária, comunicação, relatórios e indicadores, além de autenticação e permissões definidas conforme o cargo de cada usuário.',
      outcome:
        'A escolinha passou a contar com uma plataforma própria para substituir processos manuais, centralizar informações e facilitar o acesso aos dados. A direção e os funcionários agora conseguem acompanhar a operação de forma mais organizada, com menos dependência de documentos físicos.',
    },
    metric: {
      value: '100% digital',
      label: 'processos antes manuais',
    },
  },
  {
    slug: 'site-institucional-landing-page',
    title: 'Site institucional + LP de conversão',
    summary:
      'Um site para posicionar a marca e uma landing page criada para converter tráfego pago em novos assinantes.',
    role: 'Desenvolvimento Frontend · Direção Visual · UI/UX',
    client: 'Empresa sem site próprio e com campanhas direcionadas diretamente ao WhatsApp, sem uma página dedicada para apresentar e converter os planos recorrentes.',
    stack: ['React', 'TypeScript', 'TailwindCSS'],
    narrative: {
      problem:
        'A empresa não possuía uma presença digital própria para apresentar sua identidade, fortalecer o posicionamento da marca e concentrar informações em um único lugar. Além disso, as campanhas pagas direcionavam os usuários diretamente ao WhatsApp, sem uma página dedicada para explicar os planos, responder dúvidas e conduzir a decisão antes do contato.',
      decision:
        'Desenvolvi duas experiências com objetivos complementares: um site institucional alinhado à identidade da empresa e uma landing page focada na divulgação dos planos recorrentes. A estrutura, a hierarquia visual e a jornada foram pensadas de acordo com o objetivo de cada página: posicionar a marca em uma e conduzir o visitante à conversão na outra.',
      outcome:
        'A empresa passou a ter uma presença digital própria e uma jornada específica para os planos recorrentes. Em vez de depender apenas do WhatsApp para explicar a proposta, os anúncios agora podem direcionar os visitantes para uma página estruturada, capaz de apresentar os benefícios, diferenciar os planos e preparar o cliente antes do agendamento ou contato.',
    },
    metric: {
      value: '2 experiências',
      label: 'uma marca, dois objetivos',
    },
  },
];

export function getPublishedProjects(): readonly Project[] {
  return projects.filter((project) => !project.draft);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
