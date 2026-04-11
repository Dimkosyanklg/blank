/**
 * Общая тёмная палитра приложения (фон, текст, бренд, состояния).
 */
export const palette = {
  bgApp: "#07080c",
  bgElevated: "#10141c",
  bgTabsWell: "rgba(0, 0, 0, 0.35)",
  bgInput: "rgba(255, 255, 255, 0.04)",
  bgTabActive: "rgba(255, 255, 255, 0.08)",

  textPrimary: "#e8eaef",
  textMuted: "#8b92a5",
  textPlaceholder: "rgba(139, 146, 165, 0.65)",

  borderDefault: "rgba(255, 255, 255, 0.07)",
  borderTabInset: "rgba(255, 255, 255, 0.06)",

  brand: "#8b5cf6",
  brandHover: "#a78bfa",
  brandSecondary: "#6366f1",
  brandAlpha18: "rgba(139, 92, 246, 0.18)",
  brandAlpha28: "rgba(139, 92, 246, 0.28)",
  brandAlpha35: "rgba(139, 92, 246, 0.35)",
  brandAlpha55: "rgba(139, 92, 246, 0.55)",

  atmosphereCyan: "rgba(34, 211, 238, 0.06)",

  danger: "#f87171",
  dangerAlpha45: "rgba(248, 113, 113, 0.45)",
  dangerAlpha65: "rgba(248, 113, 113, 0.65)",
  dangerAlpha15: "rgba(248, 113, 113, 0.15)",

  white: "#ffffff",
  shadowDeep: "rgba(0, 0, 0, 0.45)",
} as const;

export type Palette = typeof palette;
