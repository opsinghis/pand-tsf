import { Code2, Gauge, ShieldCheck, Users } from "lucide-react";
import { motion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import type { Lane, LaneId } from "../data/journey";

export const laneIcons: Record<LaneId, typeof Code2> = {
  technical: Code2,
  people: Users,
  operations: Gauge,
  governance: ShieldCheck
};

export function laneStyle(lane: Lane) {
  return { "--lane": `var(${lane.colorVar})` } as CSSProperties & Record<"--lane", string>;
}

/** Renders **bold** spans in data strings. Content stays plain text in journey.ts. */
export function em(text: string): ReactNode {
  const parts = text.split("**");
  if (parts.length === 1) return text;
  return parts.map((part, index) => (index % 2 === 1 ? <strong key={`${part}-${index}`}>{part}</strong> : part));
}

export function Section({
  id,
  num,
  title,
  className,
  children
}: {
  id: string;
  num: string;
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={className}>
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="sec-num">{num}</span>
          <h2>{title}</h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

export function Reveal({
  children,
  className,
  delay = 0
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const directHashLoad = typeof window !== "undefined" && window.location.hash.length > 1;
  return (
    <motion.div
      className={className}
      initial={directHashLoad ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function PullQuote({ quote, source }: { quote: string; source: string }) {
  return (
    <Reveal className="pull">
      "{quote}"
      <span>{source}</span>
    </Reveal>
  );
}

export function DataTable({
  headers,
  rows
}: {
  headers: string[];
  rows: Array<Array<{ value: string; key: string; active?: boolean; id?: string }>>;
}) {
  return (
    <Reveal className="tablewrap">
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.map((cell) => cell.key).join("-")}>
              {row.map((cell, index) => (
                <td key={cell.key} id={cell.id} className={`${index === 0 ? "keycol" : ""} ${cell.active ? "active-cell" : ""}`}>
                  {cell.value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Reveal>
  );
}

export function FigureBox({
  x,
  y,
  w,
  h,
  fill,
  stroke,
  title,
  lines,
  compact
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  stroke: string;
  title: string;
  lines: string[];
  compact?: boolean;
}) {
  const cx = x + w / 2;
  const titleY = y + (compact ? 24 : 30);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" fill={fill} stroke={stroke} />
      <text x={cx} y={titleY} textAnchor="middle" className="svg-title">
        {title}
      </text>
      {lines.map((line, index) => (
        <text key={line} x={cx} y={titleY + 20 + index * 17} textAnchor="middle" className="svg-small">
          {line}
        </text>
      ))}
    </g>
  );
}
