import type { SkillGroup } from './types';

/**
 * The stack, by layer — ordered from the surface down to the foundation.
 *
 * The order is the argument, not alphabetical and not "most impressive first":
 * the section is drawn as a section *through* the system, descending from what
 * the client actually touches to what holds it up. Reordering these entries
 * changes what that drawing says.
 *
 * Content, not markup — same contract the cases follow: adding a tool must
 * never mean touching a component. The prose lives here rather than in the i18n
 * dictionary for the same reason the case narratives do: it is the portfolio's
 * subject matter, while the dictionary holds the interface around it.
 *
 * Every entry below is claimed by a shipped case or by this site itself.
 * Nothing is listed because it looks good on a list.
 *
 * TODO(F4): drafted from the stacks declared in `projects.ts`, the hero line
 * and this repository. Davi confirms, cuts and completes — particularly the
 * infrastructure layer, which the cases do not evidence.
 */
export const skillGroups: readonly SkillGroup[] = [
  {
    id: 'product',
    label: 'Produto e interface',
    items: ['UI/UX', 'Design system', 'Acessibilidade', 'SEO técnico'],
    note: 'Entender o fluxo real antes de desenhar a tela. Foi o que separou o PDV que a cliente usa do sistema que ela abandonou.',
  },
  {
    id: 'frontend',
    label: 'Front-end',
    items: ['React', 'TypeScript', 'JavaScript', 'TailwindCSS', 'GSAP'],
    note: 'Interface que a equipe usa seis horas por dia. Aqui velocidade de leitura e atalho de teclado valem mais do que efeito visual.',
  },
  {
    id: 'backend',
    label: 'Back-end',
    items: ['C#', 'ASP.NET Core', 'APIs REST', 'Autenticação e permissões'],
    note: 'Onde vive a regra de negócio. É a camada que decide o que pode acontecer e quem enxerga o quê — a parte que, quando erra, erra caro.',
  },
  {
    id: 'data',
    label: 'Dados',
    items: ['PostgreSQL', 'Modelagem relacional', 'Relatórios e indicadores'],
    note: 'Modelagem pensada para a operação durar: um esquema mal resolvido não aparece no primeiro mês, aparece quando já há dado demais para voltar atrás.',
  },
];
