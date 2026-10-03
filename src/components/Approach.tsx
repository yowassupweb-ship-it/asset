import { principles, process } from '../content/site'

export function Approach() {
  return (
    <section className="section section--sunken" id="approach" aria-labelledby="approach-title">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">Подход</p>
          <h2 id="approach-title">Просто. Прозрачно. По делу.</h2>
          <p>Мы не продаём «услуги ради услуг». Мы выстраиваем работу так, чтобы вы всегда понимали, за что платите.</p>
        </div>

        <div className="principles">
          {principles.map((p, i) => (
            <div key={p.title} className="principle" data-reveal style={{ '--i': i } as React.CSSProperties}>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>

        <ol className="steps" aria-label="Как мы работаем">
          {process.map((s, i) => (
            <li key={s.title} className="step" data-reveal style={{ '--i': i } as React.CSSProperties}>
              <span className="step__num" aria-hidden>
                {i + 1}
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
