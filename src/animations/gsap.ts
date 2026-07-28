import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Single GSAP entry point. Plugins are registered exactly once here; every
 * timeline module imports from this file, never from 'gsap' directly, so no
 * component can forget a registration or double-register.
 */
gsap.registerPlugin(useGSAP, ScrollTrigger);

export { gsap, ScrollTrigger, useGSAP };
