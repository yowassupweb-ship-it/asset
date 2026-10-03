import { hexToRgb, mix, ensureContrast, isDark, readableOn, rgbToHex } from './color'

/** Работа с текстом токенов в консоли: чтение, запись и проверка значений. */

const COLOR_TOKENS = ['--bg', '--bg-elevated', '--bg-sunken', '--text', '--accent', '--on-accent', '--link']

export function readToken(code: string, name: string): string | null {
  const m = code.match(new RegExp(`^\\s*${name}\\s*:\\s*([^;\\n]+);?`, 'm'))
  return m?.[1]?.trim() ?? null
}

/** Заменяет значение токена или добавляет строку перед закрывающей скобкой. */
export function writeToken(code: string, name: string, value: string): string {
  const re = new RegExp(`^(\\s*${name}\\s*:\\s*)[^;\\n]*(;?)`, 'm')
  if (re.test(code)) return code.replace(re, `$1${value};`)
  const close = code.lastIndexOf('}')
  const head = close === -1 ? code + '\n' : code.slice(0, close)
  return `${head.replace(/\s*$/, '\n')}  ${name}: ${value};\n${close === -1 ? '' : code.slice(close)}`
}

export interface TokenError {
  line: number
  message: string
}

function isValidToken(name: string, value: string): boolean {
  const v = value.trim()
  if (COLOR_TOKENS.includes(name)) {
    if (/var\(/.test(v)) return true
    return typeof CSS === 'undefined' || !('supports' in CSS) || CSS.supports('color', v)
  }
  if (name === '--shape') return Number.isFinite(Number(v)) && Number(v) >= 0
  return true
}

const lastValid = new Map<string, string>()

/**
 * Перед применением заменяет невалидные значения на последние рабочие:
 * недописанный или неверный цвет не должен «ронять» оформление сайта.
 */
export function sanitizeTokens(code: string): string {
  return code
    .split('\n')
    .map((line) => {
      const m = line.match(/^(\s*)(--[\w-]+)(\s*:\s*)([^;]+)(;.*)$/)
      if (!m) return line
      const [, ind, name, sep, val, rest] = m as unknown as [string, string, string, string, string, string]
      if (isValidToken(name, val)) {
        lastValid.set(name, val.trim())
        return line
      }
      const prev = lastValid.get(name)
      return prev ? `${ind}${name}${sep}${prev}${rest}` : ''
    })
    .join('\n')
}

/** Подсказки об ошибках: недописанный цвет, неверное число. */
export function validateTokens(code: string): TokenError[] {
  const errors: TokenError[] = []
  code.split('\n').forEach((line, i) => {
    const m = line.match(/^\s*(--[\w-]+)\s*:\s*([^;]+);/)
    if (!m) return
    const [, name, value] = m as unknown as [string, string, string]
    if (isValidToken(name, value)) return
    errors.push({
      line: i + 1,
      message: name === '--shape' ? '--shape — число от 0 до 2.5' : `«${value.trim()}» — не цвет, оставляем прежнее значение`,
    })
  })
  return errors
}

/** Меняет фон и подбирает под него приподнятую/утопленную поверхности. */
export function applyBg(code: string, hex: string): string {
  const dark = isDark(hex)
  const elevated = dark ? mix(hex, '#ffffff', 0.07) : mix(hex, '#ffffff', 0.7)
  const sunken = dark ? mix(hex, '#000000', 0.4) : mix(hex, '#000000', 0.045)
  let out = writeToken(code, '--bg', hex)
  out = writeToken(out, '--bg-elevated', elevated)
  out = writeToken(out, '--bg-sunken', sunken)
  out = out.replace(/color-scheme:\s*\w+/, `color-scheme: ${dark ? 'dark' : 'light'}`)
  return out
}

/** Меняет акцент вместе с читаемым цветом текста на нём и ссылкой. */
export function applyAccent(code: string, hex: string): string {
  const bg = readToken(code, '--bg') ?? '#ffffff'
  let out = writeToken(code, '--accent', hex)
  out = writeToken(out, '--on-accent', readableOn(hex))
  out = writeToken(out, '--link', ensureContrast(hex, hexToRgb(bg) ? bg : '#ffffff'))
  return out
}

export function applyText(code: string, hex: string): string {
  return writeToken(code, '--text', hex)
}

export function applyShape(code: string, value: number): string {
  return writeToken(code, '--shape', String(Math.round(value * 100) / 100))
}

/** Для input[type=color] нужен #rrggbb. */
export function toHex6(value: string | null, fallback = '#000000'): string {
  if (!value) return fallback
  const rgb = hexToRgb(value)
  return rgb ? rgbToHex(rgb) : fallback
}
