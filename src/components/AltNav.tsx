import { ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { brand, navChapters, navSections } from "../data/alternative";
import { useScrollSpy } from "../hooks/useScrollSpy";

export function AltNav() {
  const ids = useMemo(() => navSections.map((section) => section.id), []);
  const activeId = useScrollSpy(ids);
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [openChapter, setOpenChapter] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  const activeSection = navSections.find((section) => section.id === activeId) ?? navSections[0];
  const activeChapter = navChapters.find((chapter) => chapter.sections.some((section) => section.id === activeId));

  useEffect(() => {
    if (!openChapter) return;
    const onPointerDown = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) setOpenChapter(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenChapter(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openChapter]);

  return (
    <nav className="topnav" aria-label="Sections" ref={navRef}>
      <motion.div className="reading-progress" style={{ scaleX: progressScale }} />
      <div className="topnav-inner">
        <span className="brand">{brand}</span>
        <span className="now-indicator" aria-live="polite">
          <em>{activeSection.num}</em> {activeSection.label}
        </span>
        <div className="chapters">
          {navChapters.map((chapter) => {
            const isOpen = openChapter === chapter.id;
            const isActive = activeChapter?.id === chapter.id;
            return (
              <div className="chapter" key={chapter.id}>
                <button
                  type="button"
                  className={`chapter-btn ${isActive ? "active" : ""}`}
                  aria-expanded={isOpen}
                  aria-controls={`chapter-pop-${chapter.id}`}
                  onClick={() => setOpenChapter(isOpen ? null : chapter.id)}
                >
                  {chapter.label}
                  <ChevronDown size={13} aria-hidden="true" />
                </button>
                <div className={`chapter-pop ${isOpen ? "open" : ""}`} id={`chapter-pop-${chapter.id}`}>
                  {chapter.sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className={activeId === section.id ? "active" : undefined}
                      tabIndex={isOpen ? 0 : -1}
                      onClick={() => setOpenChapter(null)}
                    >
                      <em>{section.num}</em>
                      {section.label}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
