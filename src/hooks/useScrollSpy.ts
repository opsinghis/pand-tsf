import { useEffect, useState } from "react";

/**
 * IntersectionObserver-based scrollspy: a section becomes active when it
 * enters the upper band of the viewport. No layout reads on scroll.
 */
export function useScrollSpy(ids: string[]): string {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    setActive(ids[0]);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px" }
    );
    for (const id of ids) {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    }

    // The last section may never reach the active band on short pages;
    // treat "scrolled to bottom" as the final section being active.
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        setActive(ids[ids.length - 1]);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [ids]);

  return active;
}
