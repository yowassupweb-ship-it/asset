import { CtaBand, PageHero } from '../components/Shared'
import { delay } from '../lib/ui'
import { notDoing, principles, process } from '../content/site'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Approach() {
  usePageMeta('Подход', 'Как работает студия Ассет: принципы, этапы и то, чего мы не делаем.')
  return (
    <>
      <PageHero
        eyebrow="Подход"
        title="Мы не продаём услуги. Мы решаем задачи."
        lead="Без жаргона, воды и красивых слайдов вместо работы. Просто, прозрачно и с вниманием к деталям — как хороший продукт."
      />

      <section className="section section--flush">
        <div className="container">
          <div className="principles principles--big">
            {principles.map((p, i) => (
              <div key={p.title} className="principle" data-reveal style={delay(i)}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sunken" aria-labelledby="proc-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Процесс</p>
            <h2 id="proc-title">Как проходит работа</h2>
          </div>
          <ol className="steps">
            {process.map((s, i) => (
              <li key={s.title} className="step" data-reveal style={delay(i)}>
                <span className="step__num" aria-hidden>{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="not-title">
        <div className="container container--narrow">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Честно</p>
            <h2 id="not-title">Чего мы не делаем</h2>
          </div>
          <ul className="nots">
            {notDoing.map((t, i) => (
              <li key={t} data-reveal style={delay(i)}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
