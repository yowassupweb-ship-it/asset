import { useEffect, useState } from 'react'

export interface NavSection {
  id: string
  label: string
}

/** Липкая навигация по разделам страницы услуги с подсветкой текущего. */
export function ServiceNav({ sections }: { sections: NavSection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? '')

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((e): e is HTMLElement => !!e)
    if (!('IntersectionObserver' in window) || els.length === 0) return
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (hit) setActive(hit.target.id)
      },
      { rootMargin: '-25% 0px -65% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [sections])

  return (
    <nav className="subnav" aria-label="Разделы страницы">
      <div className="container subnav__inner">
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="subnav__link" aria-current={active === s.id ? 'true' : undefined}>
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
