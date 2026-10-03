import type { ReactNode } from 'react'

export type Highlighter = (line: string) => ReactNode

const VALUE_TOKENS = /(#[0-9a-fA-F]{3,8}\b|"[^"]*"|var\([^)]*\)|-?\d*\.?\d+(?:rem|px|em|%|deg|fr)?\b)/g

function value(text: string): ReactNode[] {
  return text.split(VALUE_TOKENS).map((part, i) => {
    if (!part) return null
    if (/^#[0-9a-fA-F]{3,8}$/.test(part)) return <span key={i} className="tok-color">{part}</span>
    if (part.startsWith('"')) return <span key={i} className="tok-str">{part}</span>
    if (part.startsWith('var(')) return <span key={i} className="tok-fn">{part}</span>
    if (/^-?\d*\.?\d+(?:rem|px|em|%|deg|fr)?$/.test(part)) return <span key={i} className="tok-num">{part}</span>
    return part
  })
}

/** Подсветка CSS построчно (достаточно для демо-кода). */
export const highlightCss: Highlighter = (line) => {
  if (/^\s*\/\*/.test(line)) return <span className="tok-com">{line}</span>
  const sel = line.match(/^(\s*)([^:{};]+?)(\s*\{)\s*$/)
  if (sel)
    return (
      <>
        {sel[1]}
        <span className="tok-sel">{sel[2]}</span>
        <span className="tok-pun">{sel[3]}</span>
      </>
    )
  const decl = line.match(/^(\s*)([-\w]+)(\s*:\s*)(.*?)(;?)\s*$/)
  if (decl) {
    const sep = decl[3] ?? ''
    const val = decl[4] ?? ''
    // квадратик цвета рисуем фоном самого пробела: ширина текста не меняется
    const swatch = /^#[0-9a-fA-F]{3,8}$/.test(val) && sep.endsWith(' ')
    return (
      <>
        {decl[1]}
        <span className="tok-prop">{decl[2]}</span>
        {swatch ? (
          <>
            <span className="tok-pun">{sep.slice(0, -1)}</span>
            <span className="tok-sw" style={{ '--c': val } as React.CSSProperties}>{' '}</span>
          </>
        ) : (
          <span className="tok-pun">{sep}</span>
        )}
        {value(val)}
        <span className="tok-pun">{decl[5]}</span>
      </>
    )
  }
  // однострочное правило: .logo { rotate: 8deg; }
  const one = line.match(/^(\s*)([^{]+?)(\s*\{\s*)([-\w]+)(\s*:\s*)(.*?)(;?)(\s*\}?)\s*$/)
  if (one)
    return (
      <>
        {one[1]}
        <span className="tok-sel">{one[2]}</span>
        <span className="tok-pun">{one[3]}</span>
        <span className="tok-prop">{one[4]}</span>
        <span className="tok-pun">{one[5]}</span>
        {value(one[6] ?? '')}
        <span className="tok-pun">{one[7]}{one[8]}</span>
      </>
    )
  return <span className="tok-pun">{line}</span>
}

/** Подсветка простого «плана»: комментарии, разделители, стрелки. */
export const highlightPlan: Highlighter = (line) => {
  if (line.startsWith('#')) return <span className="tok-com">{line}</span>
  if (line.includes('|')) {
    const parts = line.split('|')
    return (
      <>
        {parts.map((p, i) => (
          <span key={i}>
            {i > 0 && <span className="tok-pun">|</span>}
            <span className={i === 0 ? 'tok-sel' : i === 1 ? 'tok-prop' : 'tok-str'}>{p}</span>
          </span>
        ))}
      </>
    )
  }
  const flow = line.match(/^(когда:|→)(\s*)([^:]+)(:?)(.*)$/)
  if (flow)
    return (
      <>
        <span className="tok-sel">{flow[1]}</span>
        {flow[2]}
        <span className="tok-prop">{flow[3]}</span>
        <span className="tok-pun">{flow[4]}</span>
        <span className="tok-str">{flow[5]}</span>
      </>
    )
  return <span className="tok-pun">{line}</span>
}
