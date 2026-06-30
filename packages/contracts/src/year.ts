import { z } from "zod";

import { CONSTRAINTS } from "./constraints";

/**
 * The coin year/date model (PRD §36.2). A single freetext field cannot be sorted
 * chronologically, searched by range, or used as a publish gate, so a coin date is
 * stored as a human display string plus signed integer sort keys.
 *
 * - `year_start` / `year_end`: signed years. BCE is negative (50 BCE = -50), CE/AD
 *   positive. `year_end` is null for a single year, set for a range/reign.
 * - Sorting uses `year_start`, then `year_end`.
 * - "Has a date" (publish gate) is satisfied when `year_start` is set OR
 *   `date_display` is non-empty.
 */
export const DATE_PRECISION_VALUES = ["exact", "circa", "range", "unknown"] as const;

export const datePrecisionSchema = z.enum(DATE_PRECISION_VALUES);

export type DatePrecision = z.infer<typeof datePrecisionSchema>;

export const yearDateSchema = z
  .object({
    date_display: z
      .string()
      .trim()
      .min(CONSTRAINTS.dateDisplay.min)
      .max(CONSTRAINTS.dateDisplay.max),
    year_start: z.number().int().nullable(),
    year_end: z.number().int().nullable(),
    date_precision: datePrecisionSchema,
  })
  .refine((v) => v.year_end === null || v.year_start === null || v.year_end >= v.year_start, {
    message: "year_end must be greater than or equal to year_start",
    path: ["year_end"],
  });

export type YearDate = z.infer<typeof yearDateSchema>;

/** Just the machine-readable result of parsing a date string. */
export interface ParsedYear {
  year_start: number | null;
  year_end: number | null;
  date_precision: DatePrecision;
}

const UNKNOWN: ParsedYear = { year_start: null, year_end: null, date_precision: "unknown" };

const CIRCA_RE = /\b(c|ca|circa|approx|around)\b\.?/i;
const ERA_RE = /\b(bce|bc|ce|ad)\b/i;

function eraSign(era: string): -1 | 1 {
  const e = era.toLowerCase();
  return e === "bc" || e === "bce" ? -1 : 1;
}

function extractPart(part: string): { value: number | null; sign: -1 | 1 | null } {
  const eraMatch = ERA_RE.exec(part);
  const sign = eraMatch ? eraSign(eraMatch[1] as string) : null;
  const numMatch = /\d+/.exec(part);
  const value = numMatch ? Number.parseInt(numMatch[0], 10) : null;
  return { value, sign };
}

/**
 * Best-effort parse of a freeform date string into signed year sort keys.
 * Returns nulls + `unknown` precision when nothing parseable is found; callers
 * should let users override the result manually (§36.2).
 *
 * Examples: `1909` → exact 1909; `117–138 CE` → range 117..138;
 * `circa 50 BCE` → circa -50; `50 BCE – 20 CE` → range -50..20.
 */
export function parseYearDate(input: string): ParsedYear {
  const raw = input.trim();
  if (!raw) return UNKNOWN;

  const isCirca = CIRCA_RE.test(raw);

  // Normalize range separators (figure/en/em dashes and the word "to") to a hyphen.
  const normalized = raw.replace(/[‒-―]/g, "-").replace(/\bto\b/gi, "-");

  const parts = normalized
    .split("-")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  const extracted = parts
    .map(extractPart)
    .filter((p): p is { value: number; sign: -1 | 1 | null } => p.value !== null);

  if (extracted.length === 0) return UNKNOWN;

  // If only some parts carry an era (e.g. "117–138 CE"), apply the known era to the rest.
  const knownSign = extracted.find((e) => e.sign !== null)?.sign ?? 1;
  const years = extracted.map((e) => (e.sign ?? knownSign) * e.value).sort((a, b) => a - b);

  const yearStart = years[0] ?? null;
  const yearEnd = years.length > 1 ? (years[years.length - 1] ?? null) : null;

  let precision: DatePrecision;
  if (isCirca) precision = "circa";
  else if (yearEnd !== null && yearEnd !== yearStart) precision = "range";
  else precision = "exact";

  return { year_start: yearStart, year_end: yearEnd, date_precision: precision };
}

/** Whether a coin has a usable date for the public publish gate (§9.4). */
export function hasDate(input: {
  year_start?: number | null;
  date_display?: string | null;
}): boolean {
  return (
    (input.year_start !== null && input.year_start !== undefined) ||
    (typeof input.date_display === "string" && input.date_display.trim().length > 0)
  );
}
