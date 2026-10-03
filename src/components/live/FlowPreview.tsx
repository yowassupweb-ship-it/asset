import { Fragment } from 'react'

interface Step {
  kind: 'trigger' | 'step'
  system: string
  action: string
}

function parseFlow(code: string) {
  const lines = code.split('\n')
  const title = lines.find((l) => l.startsWith('#'))?.replace(/^#\s*/, '') ?? 'Сценарий'
  const steps: Step[] = []
  for (const l of lines) {
    const t = l.trim()
    if (t.startsWith('когда:')) {
      const v = t.slice(6).trim()
      if (v) steps.push({ kind: 'trigger', system: 'Триггер', action: v })
    } else if (t.startsWith('→')) {
      const [sys, ...rest] = t.slice(1).split(':')
      const action = rest.join(':').trim()
      if (sys?.trim() && action) steps.push({ kind: 'step', system: sys.trim(), action })
    }
  }
  return { title, steps }
}

/** Цепочка шагов, построенная из текста сценария. */
export function FlowPreview({ code }: { code: string }) {
  const { title, steps } = parseFlow(code)
  return (
    <div className="flow pv-frame" role="img" aria-label={`Схема автоматизации: ${title}`}>
      <p className="plan__title">{title}</p>
      <ol className="flow__list">
        {steps.map((s, i) => (
          <Fragment key={`${s.system}-${s.action}`}>
            {i > 0 && <li className="flow__link" aria-hidden />}
            <li className="flow__node" data-kind={s.kind}>
              <span className="flow__sys">{s.system}</span>
              <span className="flow__act">{s.action}</span>
            </li>
          </Fragment>
        ))}
      </ol>
    </div>
  )
}
