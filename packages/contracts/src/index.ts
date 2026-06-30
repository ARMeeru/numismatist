// Placeholder for the shared domain layer.
//
// The §36 data-model schemas (Zod) — visibility, coin image types, the year/date
// model, validation constraints, and publish-gate rules — land in `feat/contracts`.
// Until then this module only proves the package wiring (typecheck + tests).
export const CONTRACTS_PACKAGE = "@numismatist/contracts" as const;
