import type { RouteRecord } from 'vite-react-ssg';

import { CASE_ROUTE_SEGMENT } from '../features/works';
import { RootLayout } from './RootLayout';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';

/**
 * Route table. Every entry listed here is pre-rendered to static HTML at build
 * time and picked up by the sitemap generator, so a new public page is a single
 * addition to this array.
 *
 * Heavy routes (3D scenes, large media) must be added with `lazy` so they stay
 * out of the initial bundle.
 *
 * The case route is dynamic, so the pre-renderer cannot discover its addresses
 * from this table alone — `includedRoutes` in `vite.config.ts` expands it from
 * the published cases.
 */
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: `${CASE_ROUTE_SEGMENT}/:slug`, element: <ProjectPage /> },
    ],
  },
];
