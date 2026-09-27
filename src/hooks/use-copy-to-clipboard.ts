import { useCallback, useEffect, useRef, useState } from 'react';

export type CopyStatus = 'idle' | 'copied' | 'failed';

/**
 * How long the outcome stays on screen before the control reads as it did.
 * Reading time, not motion: long enough to take in one word, short enough that
 * a second copy does not look like it is still showing the first.
 */
const RESET_AFTER_MS = 2000;

/**
 * Copies text and reports how it went, then settles back to `idle`.
 *
 * Failure is a state rather than silence: the Clipboard API is missing outside
 * secure contexts and can be refused by permissions, and a button that does
 * nothing when pressed is worse than one that says it could not. The caller
 * keeps a plain link beside it, so there is always another way to the text.
 *
 * The pending reset is cleared on unmount and whenever a new copy starts, so a
 * quick second press is not reset by the first press's timer.
 */
export function useCopyToClipboard(): {
  readonly status: CopyStatus;
  readonly copy: (text: string) => Promise<void>;
} {
  const [status, setStatus] = useState<CopyStatus>('idle');
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const copy = useCallback(async (text: string) => {
    window.clearTimeout(resetTimer.current);

    try {
      await navigator.clipboard.writeText(text);
      setStatus('copied');
    } catch {
      setStatus('failed');
    }

    resetTimer.current = window.setTimeout(
      () => setStatus('idle'),
      RESET_AFTER_MS,
    );
  }, []);

  return { status, copy };
}
