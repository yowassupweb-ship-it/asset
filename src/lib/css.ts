/**
 * Безопасная подготовка пользовательского CSS из «живых» окон.
 * Применяем только завершённые объявления (до последней «;»), чтобы при печати
 * страница не мигала из-за недописанных значений.
 */
export function prepareCss(code: string): string {
  const cleaned = code
    .replace(/@import[^;]*;?/gi, '')
    .replace(/url\s*\([^)]*\)/gi, '')
    .replace(/expression\s*\([^)]*\)/gi, '')
    .replace(/<\/?style[^>]*>/gi, '')
  const cut = cleaned.slice(0, cleaned.lastIndexOf(';') + 1)
  const open = (cut.match(/{/g) ?? []).length - (cut.match(/}/g) ?? []).length
  return cut + '}'.repeat(Math.max(0, open))
}

/** Оборачивает код во вложенный селектор, чтобы он действовал только внутри превью. */
export function scopeCss(code: string, scope: string): string {
  const css = prepareCss(code)
  return css ? `${scope} { ${css} }` : ''
}
