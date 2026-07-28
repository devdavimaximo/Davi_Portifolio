import type { RouteRecord } from 'vite-react-ssg';

import { RootLayout } from './RootLayout';
import HomePage from './pages/HomePage';

/**
 * Route table. Every entry listed here is pre-rendered to static HTML at build
 * time and picked up by the sitemap generator, so a new public page is a single
 * addition to this array.
 *
 * Heavy routes (3D scenes, large media) must be added with `lazy` so they stay
 * out of the initial bundle.
 */
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [{ index: true, element: <HomePage /> }],
  },
];
