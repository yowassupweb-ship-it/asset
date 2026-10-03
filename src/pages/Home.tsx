import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { CodeWindow } from '../components/live/CodeWindow'
import { IconArrow } from '../components/Icon'
import { ServiceCard, CtaBand } from '../components/Shared'
import { delay } from '../lib/ui'
import { themeVariants } from '../content/live'
import { services, servicePath } from '../content/services'
import { principles } from '../content/site'
import { prefersReducedMotion, useLiveCode } from '../hooks/useLiveCode'
import { usePageMeta } from '../hooks/usePageMeta'
import { highlightCss } from '../lib/highlight'
import { themeStore } from '../lib/themeStore'
import { bundles } from '../content/extras'

export default function Home() {
  usePageMeta()
  // если стиль уже выбран (переход с другой страницы) — показываем его без автопечати
  const current = themeStore.get()
  const startIndex = Math.max(0, themeVariants.findIndex((v) => v.id === current.id))
  const live = useLiveCode(themeVariants, { autoCount: 5, initialIndex: startIndex, autoplay: current.id === null && !prefersReducedMotion() })
  const { show } = live
  const skip = useRef<string | null>(null)

  // код в окне → стиль сайта
  useEffect(() => {
    const st = themeStore.get()
    if (live.applied === (st.id === null ? themeVariants[0]?.code : st.code)) return
    if (skip.current === live.applied) {
      skip.current = null
      return
    }
    themeStore.set(themeVariants[live.index]?.id ?? null, live.applied, 'live')
  }, [live.applied, live.index])

  // стиль сменили снаружи (кнопка, переход, палитра) → окно показывает его
  useEffect(
    () =>
      themeStore.subscribe(() => {
        const st = themeStore.get()
        if (st.source === 'live') return
        const i = Math.max(0, themeVariants.findIndex((v) => v.id === st.id))
        skip.current = themeVariants[i]?.code ?? null
        show(i)
      }),
    [show],
  )

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__aurora" aria-hidden>
          <i />
          <i />
          <i />
        </div>
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="hero__badge" data-reveal>
              <span className="hero__badge-dot" aria-hidden />
              Digital-студия
            </p>
            <h1 id="hero-title" className="hero__title" data-reveal style={delay(1)}>
              Делаем из digital <span className="hero__accent">актив</span>
            </h1>
            <p className="hero__lead" data-reveal style={delay(2)}>
              Соцсети, сайты, дизайн и автоматизация — в одной студии. Без шума и лишних слов, зато с результатом,
              который можно посчитать.
            </p>
            <div className="hero__actions" data-reveal style={delay(3)}>
              <Link to="/contact" className="btn btn--accent btn--lg" viewTransition>
                Обсудить проект
                <IconArrow width={18} height={18} />
              </Link>
              <Link to="/services" className="btn btn--secondary btn--lg" viewTransition>
                Что мы делаем
              </Link>
            </div>
            <p className="hero__note" data-reveal style={delay(4)}>
              <b>Это не картинка.</b> Справа — настоящие дизайн-токены этого сайта. Код пишется на ваших глазах и
              перекрашивает всю страницу. Кликните в окно и поправьте сами.
            </p>
          </div>

          <div className="hero__visual" data-reveal style={delay(2)}>
            <CodeWindow
              live={live}
              variants={themeVariants}
              fileName="tokens.css"
              highlight={highlightCss}
              label="Редактор дизайн-токенов сайта"
            />
          </div>
        </div>
      </section>


      <section className="section" aria-labelledby="services-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Услуги</p>
            <h2 id="services-title">Четыре направления. Одна система.</h2>
            <p>
              Каждое сильно само по себе — а вместе дают то, чего не добиться по отдельности: целостный бренд,
              который находят, запоминают и выбирают.
            </p>
          </div>
          <div className="services">
            {services.map((s, i) => (
              <ServiceCard key={s.id} s={s} i={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--flush" aria-labelledby="bundles-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Связки</p>
            <h2 id="bundles-title">Вместе — сильнее</h2>
            <p>Типовые комбинации под частые задачи. Собираем под вас: берите ровно то, что нужно.</p>
          </div>
          <div className="bundles">
            {bundles.map((b, i) => (
              <article key={b.title} className="card bundle" data-reveal style={delay(i % 2)}>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
                <ul className="bundle__chips">
                  {b.services.map((id) => {
                    const s = services.find((x) => x.id === id)
                    return s ? (
                      <li key={id}>
                        <Link to={servicePath(s)} viewTransition>{s.short}</Link>
                      </li>
                    ) : null
                  })}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sunken" aria-labelledby="why-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Подход</p>
            <h2 id="why-title">Просто. Прозрачно. По делу.</h2>
          </div>
          <div className="principles">
            {principles.map((p, i) => (
              <div key={p.title} className="principle" data-reveal style={delay(i)}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
          <Link to="/approach" className="link-arrow" viewTransition>
            Как мы работаем <IconArrow width={16} height={16} />
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
