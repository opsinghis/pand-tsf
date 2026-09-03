import { ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { architectureNavChapters, architectureNavSections } from "../data/architecture";
import { brand, navChapters, navSections } from "../data/journey";
import { useScrollSpy } from "../hooks/useScrollSpy";

export type AppPage = "journey" | "architecture";

export function TopNav({ page }: { page: AppPage }) {
  const currentChapters = page === "architecture" ? architectureNavChapters : navChapters;
  const currentSections = page === "architecture" ? architectureNavSections : navSections;
  const ids = useMemo(() => currentSections.map((section) => section.id), [currentSections]);
  const activeId = useScrollSpy(ids);
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [openChapter, setOpenChapter] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  const activeSection = currentSections.find((section) => section.id === activeId) ?? currentSections[0];
  const activeChapter = currentChapters.find((chapter) => chapter.sections.some((section) => section.id === activeId));

  // Close the chapter popover on outside click or Escape.
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
        <div className="page-switch" aria-label="Page selection">
          <a href="#journey" className={page === "journey" ? "active" : undefined} onClick={() => setOpenChapter(null)}>
            Journey
          </a>
          <a href="#architecture" className={page === "architecture" ? "active" : undefined} onClick={() => setOpenChapter(null)}>
            Architecture
          </a>
        </div>
        <span className="now-indicator" aria-live="polite">
          <em>{activeSection.num}</em> {activeSection.label}
        </span>
        <div className="chapters">
          {currentChapters.map((chapter) => {
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
