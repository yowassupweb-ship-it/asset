import { applyAccent, applyBg, applyShape, applyText, readToken, toHex6 } from '../../lib/tokens'

interface Props {
  text: string
  onChange: (next: string) => void
}

/** Живые контролы под кодом: меняют текст токенов — и сайт вместе с ним. */
export function TokenControls({ text, onChange }: Props) {
  const bg = toHex6(readToken(text, '--bg'), '#f5f5f7')
  const fg = toHex6(readToken(text, '--text'), '#0c0c0f')
  const accent = toHex6(readToken(text, '--accent'), '#ffd60a')
  const shape = Number(readToken(text, '--shape') ?? 1)

  return (
    <div className="controls" role="group" aria-label="Быстрые настройки темы">
      <label className="control">
        <input type="color" value={bg} onChange={(e) => onChange(applyBg(text, e.target.value))} />
        <span>Фон</span>
      </label>
      <label className="control">
        <input type="color" value={fg} onChange={(e) => onChange(applyText(text, e.target.value))} />
        <span>Текст</span>
      </label>
      <label className="control">
        <input type="color" value={accent} onChange={(e) => onChange(applyAccent(text, e.target.value))} />
        <span>Акцент</span>
      </label>
      <label className="control control--range">
        <span>Скругление</span>
        <input
          type="range"
          min={0}
          max={2.2}
          step={0.05}
          value={Number.isFinite(shape) ? shape : 1}
          onChange={(e) => onChange(applyShape(text, Number(e.target.value)))}
          aria-valuetext={`${shape}`}
        />
      </label>
    </div>
  )
}
