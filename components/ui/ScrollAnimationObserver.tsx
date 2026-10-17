'use client';

import { useEffect } from 'react';

/**
 * High-performance, bulletproof scroll reveal animation observer.
 * Ensures every section animates smoothly when scrolled into view,
 * with immediate check on mount and safety fallbacks so NO content ever stays hidden.
 */
export function ScrollAnimationObserver() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkInView = () => {
      const elements = document.querySelectorAll('[data-animate]:not(.animate-active)');
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // If element is already in viewport or within 120px, activate it immediately
        if (rect.top <= windowHeight + 120) {
          el.classList.add('animate-active');
        }
      });
    };

    // Run immediate check
    checkInView();

    let observer: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-active');
              observer?.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.01,
          rootMargin: '100px 0px 100px 0px',
        }
      );

      document.querySelectorAll('[data-animate]').forEach((el) => {
        observer?.observe(el);
      });
    }

    // Handle scroll and resize
    window.addEventListener('scroll', checkInView, { passive: true });
    window.addEventListener('resize', checkInView, { passive: true });

    // Watch for dynamic DOM elements / streaming content
    const mutationObserver = new MutationObserver(() => {
      checkInView();
      if (observer) {
        document.querySelectorAll('[data-animate]:not(.animate-active)').forEach((el) => {
          observer?.observe(el);
        });
      }
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Staggered checks to catch any late hydration
    const t1 = setTimeout(checkInView, 100);
    const t2 = setTimeout(checkInView, 350);

    // Guaranteed safety fallback: reveal everything after 700ms so nothing can ever fail to load
    const safetyTimer = setTimeout(() => {
      document.querySelectorAll('[data-animate]:not(.animate-active)').forEach((el) => {
        el.classList.add('animate-active');
      });
    }, 700);

    return () => {
      window.removeEventListener('scroll', checkInView);
      window.removeEventListener('resize', checkInView);
      mutationObserver.disconnect();
      observer?.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(safetyTimer);
    };
  }, []);

  return null;
}
