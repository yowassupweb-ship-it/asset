import { CtaBand, PageHero } from '../components/Shared'
import { usePageMeta } from '../hooks/usePageMeta'

/**
 * Заполните массив `cases` — заглушка заменится сеткой карточек.
 * image — путь из public/, например '/portfolio/case-1.webp'.
 */
interface Case {
  title: string
  category: string
  href: string
  image: string
}

const cases: Case[] = []

export default function Portfolio() {
  usePageMeta('Портфолио', 'Кейсы студии Ассет: соцсети, сайты, дизайн и автоматизация.')
  return (
    <>
      <PageHero
        eyebrow="Портфолио"
        title="Лучшие работы — скоро здесь"
        lead="Собираем кейсы, которыми не стыдно гордиться: с задачей, решением и честными цифрами. Пока готовим витрину — расскажем о проектах лично."
      />

      <section className="section section--flush">
        <div className="container">
          {cases.length > 0 ? (
            <ul className="cases">
              {cases.map((c) => (
                <li key={c.title}>
                  <a href={c.href} className="card case" data-spotlight>
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
                  {[0, 1, 2, 3, 4, 5].map((n) => (
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

      <CtaBand title="Хотите стать первым кейсом?" text="Берём ограниченное число проектов, чтобы каждый получился показательным." />
    </>
  )
}
