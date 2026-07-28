import { ViteReactSSG } from 'vite-react-ssg';

import { routes } from './app/routes';
import './styles/index.css';

/**
 * Entry point. At build time `vite-react-ssg` walks `routes` and writes the
 * static HTML for each one; in the browser React hydrates that HTML and the app
 * is fully dynamic from there — GSAP and three.js run without restriction.
 */
export const createRoot = ViteReactSSG({ routes });
