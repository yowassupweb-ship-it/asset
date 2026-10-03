import { useEffect, useId, useRef } from 'react'
import type { Variant } from '../../content/live'
import type { LiveCode } from '../../hooks/useLiveCode'
import type { Highlighter } from '../../lib/highlight'
import { validateTokens } from '../../lib/tokens'
import { TokenControls } from './TokenControls'

interface Props {
  live: LiveCode
  variants: Variant[]
  fileName: string
  highlight: Highlighter
  /** Подпись для скринридеров */
  label: string
  /** Переключатель светлый/тёмный режим (для консоли темы) */
  mode?: { value: 'light' | 'dark'; onChange: (m: 'light' | 'dark') => void }
  /** Быстрые контролы (цвета и скругление) и проверка токенов */
  tokens?: boolean
}

/**
 * Окно редактора в стиле macOS/CodePen. Код печатается автоматически;
 * клик по тексту ставит печать на паузу и даёт править руками.
 */
export function CodeWindow({ live, variants, fileName, highlight, label, mode, tokens }: Props) {
  const id = useId()
  const area = useRef<HTMLTextAreaElement>(null)
  const root = useRef<HTMLDivElement>(null)
  const { setSuspended } = live

  // не печатаем, пока окно вне экрана или вкладка скрыта
  useEffect(() => {
    const el = root.current
    if (!el || !('IntersectionObserver' in window)) return
    let visible = true
    const update = () => setSuspended(!visible || document.hidden)
    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting
      update()
    }, { threshold: 0.35 })
    io.observe(el)
    document.addEventListener('visibilitychange', update)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', update)
    }
  }, [setSuspended])
  const lines = live.text.split('\n')
  const rows = Math.max(...variants.map((v) => v.code.split('\n').length))
  const editing = !live.playing
  const errors = tokens ? validateTokens(live.text) : []
  const cols = Math.max(...variants.flatMap((v) => v.code.split('\n').map((l) => l.length)), ...lines.map((l) => l.length))

  return (
    <div className="code-window" ref={root}>
      <div className="window__bar">
        <span className="window__lights" aria-hidden>
          <i data-c="close" />
          <i data-c="min" />
          <i data-c="max" />
        </span>
        <span className="window__title">{fileName}</span>
        <button
          type="button"
          className="code-window__play"
          onClick={live.toggle}
          aria-label={live.playing ? 'Остановить автопечать' : 'Запустить автопечать'}
          title={live.playing ? 'Пауза' : 'Продолжить'}
        >
          {live.playing ? (
            <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden>
              <rect x="3" y="2.5" width="3.5" height="11" rx="1" />
              <rect x="9.5" y="2.5" width="3.5" height="11" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden>
              <path d="M4 2.8v10.4a.8.8 0 0 0 1.2.7l8.4-5.2a.8.8 0 0 0 0-1.4L5.2 2.1A.8.8 0 0 0 4 2.8z" />
            </svg>
          )}
        </button>
      </div>

      <div className="code-window__tabs" role="group" aria-label="Варианты">
        {variants.map((v, i) => (
          <button
            key={v.id}
            type="button"
            className="code-tab"
            aria-pressed={live.index === i}
            onClick={() => live.select(i)}
          >
            {v.dot && <i className="code-tab__dot" style={{ background: v.dot }} aria-hidden />}
            {v.label}
          </button>
        ))}
      </div>
      {mode && (
        <div className="code-window__mode" role="group" aria-label="Режим темы">
          {(['light', 'dark'] as const).map((m) => (
            <button key={m} type="button" aria-pressed={mode.value === m} onClick={() => mode.onChange(m)}>
              {m === 'light' ? 'Светлая' : 'Тёмная'}
            </button>
          ))}
        </div>
      )}

      <div className="code-window__body" style={{ '--rows': rows } as React.CSSProperties}>
        <div className="code-gutter" aria-hidden>
          {Array.from({ length: Math.max(lines.length, 1) }, (_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>
        <div className="code-edit" style={{ '--cols': cols } as React.CSSProperties}>
          <pre className="code-pre" aria-hidden>
            {lines.map((l, i) => (
              <span key={i} className="code-line">
                {highlight(l)}
                {i === lines.length - 1 && <span className={`code-caret${editing ? '' : ' is-typing'}`} />}
                {'\n'}
              </span>
            ))}
          </pre>
          <textarea
            ref={area}
            id={id}
            className="code-textarea"
            aria-label={label}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            value={live.text}
            readOnly={live.playing}
            rows={lines.length}
            wrap="off"
            onFocus={live.pause}
            onPointerDown={live.pause}
            onChange={(e) => live.onEdit(e.target.value)}
          />
        </div>
      </div>

      {tokens && (
        <TokenControls
          text={live.text}
          onChange={(next) => {
            live.pause()
            live.onEdit(next)
          }}
        />
      )}

      <div className="code-window__foot">
        <span className="code-status" data-live={live.playing} data-error={errors.length > 0} aria-live="polite">
          <i aria-hidden />
          {errors.length > 0
            ? `Строка ${errors[0]!.line}: ${errors[0]!.message}`
            : live.playing
              ? 'Идёт показ'
              : 'Можно править — результат сразу'}
        </span>
        <span className="code-hint">{live.playing ? 'Клик по коду — править самому' : '▶ — запустить показ снова'}</span>
      </div>
    </div>
  )
}
