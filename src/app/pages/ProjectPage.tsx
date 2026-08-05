import { Link, useParams } from 'react-router-dom';

import { getProjectBySlug } from '../../content/projects';
import { CaseStudy, caseRoutePath } from '../../features/works';
import { useTranslation } from '../../lib/i18n';
import {
  createBreadcrumbSchema,
  createCreativeWorkSchema,
  Seo,
} from '../../lib/seo';
import styles from './ProjectPage.module.css';

/**
 * One case study, at its own indexable address.
 *
 * The home page keeps the ledger — a scannable row per case that opens in
 * place. This route is what that row points at and what gets shared: the same
 * argument with a `<h1>`, its own metadata and its own structured data.
 */
export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const project = slug ? getProjectBySlug(slug) : undefined;

  /* Only reachable by hand-typing a URL: every link into this route comes from
     a real slug, and the build pre-renders exactly the published ones. */
  if (!project) {
    const { notFound } = t.caseStudy;

    return (
      <>
        <Seo path="/" title={notFound.title} noIndex />
        <div className={styles.missing}>
          <h1>{notFound.title}</h1>
          <p>{notFound.body}</p>
          <Link to="/">{t.caseStudy.back}</Link>
        </div>
      </>
    );
  }

  const path = caseRoutePath(project.slug);

  /* One list, two consumers: the structured data below and the visible trail
     inside <CaseStudy /> are rendered from the same array. */
  const breadcrumb = [
    { name: t.home.title, path: '/' },
    { name: t.works.label, path: '/#works' },
    { name: project.title, path },
  ];

  return (
    <>
      <Seo
        path={path}
        title={project.title}
        description={project.summary}
        type="article"
        jsonLd={[
          createCreativeWorkSchema({
            name: project.title,
            description: project.summary,
            path,
            keywords: project.stack,
          }),
          createBreadcrumbSchema(breadcrumb),
        ]}
      />
      <CaseStudy project={project} breadcrumb={breadcrumb} />
    </>
  );
}
