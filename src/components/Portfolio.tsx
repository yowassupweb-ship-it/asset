/**
 * Раздел-заглушка. Когда появятся кейсы — замените `cases` на реальные данные
 * (см. README, «Как добавить портфолио»).
 */
interface Case {
  title: string
  category: string
  href: string
  image: string
}

const cases: Case[] = []

export function Portfolio() {
  return (
    <section className="section" id="portfolio" aria-labelledby="portfolio-title">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">Портфолио</p>
          <h2 id="portfolio-title">Лучшие работы — скоро здесь</h2>
          <p>Собираем кейсы, которыми не стыдно гордиться. Пока готовим витрину — расскажем о проектах лично.</p>
        </div>

        {cases.length > 0 ? (
          <ul className="cases">
            {cases.map((c) => (
              <li key={c.title}>
                <a href={c.href} className="card case">
                  <img src={c.image} alt="" loading="lazy" />
                  <span className="case__cat">{c.category}</span>
                  <span className="case__title">{c.title}</span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="folder" data-reveal>
            <div className="window window--flat" role="img" aria-label="Пустая папка «Кейсы» — скоро здесь появятся проекты">
              <div className="window__bar">
                <span className="window__lights" aria-hidden>
                  <i data-c="close" />
                  <i data-c="min" />
                  <i data-c="max" />
                </span>
                <span className="window__title">Кейсы</span>
              </div>
              <div className="folder__grid" aria-hidden>
                {[0, 1, 2].map((n) => (
                  <div key={n} className="folder__tile">
                    <span />
                    <small>Проект {n + 1}</small>
                  </div>
                ))}
              </div>
              <div className="folder__status">0 объектов · Скоро появятся</div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
