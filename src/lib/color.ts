/** Небольшие цветовые утилиты для генерации тем и контролов консоли. */

export type RGB = [number, number, number]

export function hexToRgb(hex: string): RGB | null {
  const m = hex.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)
  if (!m) return null
  let h = m[1]!
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}

export const rgbToHex = ([r, g, b]: RGB) =>
  '#' + [r, g, b].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('')

/** Смешивает a и b: t=0 → a, t=1 → b. */
export function mix(a: string, b: string, t: number): string {
  const x = hexToRgb(a)
  const y = hexToRgb(b)
  if (!x || !y) return a
  return rgbToHex([x[0] + (y[0] - x[0]) * t, x[1] + (y[1] - x[1]) * t, x[2] + (y[2] - x[2]) * t])
}

export function luminance(hex: string): number {
  const c = hexToRgb(hex) ?? [0, 0, 0]
  const f = (v: number) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2])
}

export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((p, q) => q - p) as [number, number]
  return (hi + 0.05) / (lo + 0.05)
}

/** Цвет текста (чёрный/белый) с лучшим контрастом на заданном фоне. */
export const readableOn = (bg: string) => (contrast(bg, '#000000') >= contrast(bg, '#ffffff') ? '#0c0c0f' : '#ffffff')

/** Подгоняет цвет под нужный контраст с фоном, двигая его к чёрному/белому. */
export function ensureContrast(fg: string, bg: string, min = 4.5): string {
  const target = luminance(bg) > 0.4 ? '#000000' : '#ffffff'
  let out = fg
  for (let i = 0; i < 20 && contrast(out, bg) < min; i++) out = mix(out, target, 0.08)
  return out
}

export const isDark = (hex: string) => luminance(hex) < 0.25
