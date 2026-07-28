import type { Application } from '@splinetool/runtime';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';

import { usePointerAutoplay } from '../../animations/use-pointer-autoplay';
import { useInView } from '../../hooks/use-in-view';
import { useReducedMotion } from '../../hooks/use-reduced-motion';
import styles from './HeroSection.module.css';

const Spline = lazy(() => import('@splinetool/react-spline'));

/** The interactive block-building scene the hero was designed around. */
const SCENE_URL =
  'https://prod.spline.design/dJqTIQ-tE3ULUPMi/scene.splinecode';

/** `navigator.connection` is not in lib.dom yet — typed minimally here. */
interface ConnectionAwareNavigator extends Navigator {
  readonly connection?: { readonly saveData?: boolean };
}

/** Data-saver visitors keep the styled backdrop and skip the 3D entirely. */
function prefersLightweightExperience(): boolean {
  return (navigator as ConnectionAwareNavigator).connection?.saveData === true;
}

/**
 * Decorative 3D backdrop of the hero: the Spline block-grid scene that
 * assembles under the pointer (mouse or touch drag).
 *
 * The runtime chunk is mounted from an effect, so it never runs during
 * pre-render and never enters the initial bundle — crawlers and the first
 * paint only see the pre-rendered HTML. Reduced-motion and data-saver
 * visitors get the calm gradient backdrop with no WebGL at all, and the
 * render loop is stopped whenever the hero leaves the viewport.
 *
 * On touch devices the scene plays itself until the first real touch, since
 * there is no hover to build the blocks with.
 */
export function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sceneEnabled, setSceneEnabled] = useState(false);
  const [application, setApplication] = useState<Application | null>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(containerRef);

  useEffect(() => {
    if (!prefersLightweightExperience()) setSceneEnabled(true);
  }, []);

  useEffect(() => {
    if (!application) return;
    if (inView) {
      application.play();
    } else {
      application.stop();
    }
  }, [application, inView]);

  usePointerAutoplay(containerRef, application !== null && inView);

  return (
    <div ref={containerRef} className={styles.background} aria-hidden="true">
      {sceneEnabled && !reducedMotion && (
        <Suspense fallback={null}>
          <Spline
            scene={SCENE_URL}
            onLoad={setApplication}
            className={[
              styles.splineCanvas,
              application ? styles.splineCanvasReady : '',
            ].join(' ')}
          />
        </Suspense>
      )}
      <div className={styles.vignette} />
    </div>
  );
}
