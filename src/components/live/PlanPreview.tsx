const DAYS = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

interface Post {
  day: string
  format: string
  title: string
}

function parsePlan(code: string) {
  const lines = code.split('\n')
  const title = lines.find((l) => l.startsWith('#'))?.replace(/^#\s*/, '') ?? 'Контент-план'
  const posts: Post[] = []
  for (const l of lines) {
    if (l.startsWith('#') || !l.includes('|')) continue
    const [day, format, ...rest] = l.split('|').map((s) => s.trim())
    const t = rest.join('|').trim()
    if (day && format && t && DAYS.includes(day.toLowerCase())) posts.push({ day: day.toLowerCase(), format, title: t })
  }
  return { title, posts }
}

const kind = (f: string) => {
  const k = f.toLowerCase()
  if (k.startsWith('reel')) return 'reels'
  if (k.startsWith('стор')) return 'story'
  if (k.startsWith('кар')) return 'carousel'
  return 'post'
}

/** Недельный календарь публикаций, построенный из текста плана. */
export function PlanPreview({ code }: { code: string }) {
  const { title, posts } = parsePlan(code)
  return (
    <div className="plan pv-frame" role="img" aria-label={`Календарь контент-плана: ${title}`}>
      <p className="plan__title">{title}</p>
      <div className="plan__grid">
        {DAYS.map((d) => {
          const p = posts.filter((x) => x.day === d)
          return (
            <div key={d} className="plan__col">
              <span className="plan__day">{d}</span>
              {p.map((x) => (
                <div key={x.title} className="plan__post" data-kind={kind(x.format)}>
                  <small>{x.format}</small>
                  <span>{x.title}</span>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
