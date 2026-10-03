import { useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router'
import { CodeWindow } from '../components/live/CodeWindow'
import { IconArrow } from '../components/Icon'
import { ServiceCard, CtaBand } from '../components/Shared'
import { delay } from '../lib/ui'
import { themeVariantsFor } from '../content/live'
import { services, servicePath } from '../content/services'
import { principles } from '../content/site'
import { prefersReducedMotion, useLiveCode } from '../hooks/useLiveCode'
import { usePageMeta } from '../hooks/usePageMeta'
import { highlightCss } from '../lib/highlight'
import { themeStore, useStyleState } from '../lib/themeStore'
import { bundles } from '../content/extras'

export default function Home() {
  usePageMeta()
  const style = useStyleState()
  const variants = useMemo(() => themeVariantsFor(style.mode), [style.mode])
  // автопоказ только при первом заходе; если стиль уже выбран (переход, кнопка) — показываем его как есть
  const untouched = themeStore.get().source === 'init'
  const startIndex = Math.max(0, variants.findIndex((v) => v.id === style.theme))
  const live = useLiveCode(variants, { autoCount: 5, initialIndex: startIndex, autoplay: untouched && !prefersReducedMotion() })
  const { show } = live
  const skip = useRef<string | null>(null)

  // код в консоли → стиль сайта (ручные правки — с небольшой задержкой, чтобы не мигало на каждый символ)
  useEffect(() => {
    const st = themeStore.get()
    if (live.applied === st.code) {
      skip.current = null
      return
    }
    if (skip.current === live.applied) {
      skip.current = null
      return
    }
    const push = () => themeStore.set(variants[live.index]?.id ?? st.theme, live.applied, 'live')
    if (live.playing) {
      push()
      return
    }
    const t = window.setTimeout(push, 220)
    return () => window.clearTimeout(t)
  }, [live.applied, live.index, live.playing, variants])

  // стиль сменили снаружи (кнопка, переход, палитра, переключатель режима) → консоль показывает его
  useEffect(
    () =>
      themeStore.subscribe(() => {
        const st = themeStore.get()
        if (st.source === 'live') return
        const i = Math.max(0, themeVariantsFor(st.mode).findIndex((v) => v.id === st.theme))
        skip.current = st.code
        show(i, st.code)
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
              Студия для бизнеса
            </p>
            <h1 id="hero-title" className="hero__title" data-reveal style={delay(1)}>
              Чтобы вас находили. И <span className="hero__accent">выбирали.</span>
            </h1>
            <p className="hero__lead" data-reveal style={delay(2)}>
              Ведём соцсети, делаем сайты и дизайн, настраиваем автоматизацию. Всё в одной студии, понятно и без лишних
              слов.
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
              <b>Это не картинка.</b> Справа — настоящие настройки оформления этого сайта. Код печатается сам и
              перекрашивает всю страницу. Нажмите на него и поправьте сами.
            </p>
          </div>

          <div className="hero__visual" data-reveal style={delay(2)}>
            <CodeWindow
              live={live}
              variants={variants}
              fileName="tokens.css"
              highlight={highlightCss}
              label="Редактор настроек оформления сайта"
              tokens
              mode={{ value: style.mode, onChange: (m) => themeStore.setMode(m) }}
            />
          </div>
        </div>
      </section>


      <section className="section" aria-labelledby="services-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Услуги</p>
            <h2 id="services-title">Четыре направления. Одна команда.</h2>
            <p>
              Каждое хорошо работает само по себе, а вместе они дают больше: вас легче найти, проще запомнить и
              приятнее выбрать.
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
            <h2 id="bundles-title">Вместе — удобнее</h2>
            <p>Частые сочетания под типичные задачи. Мы соберём под вас: берите только то, что нужно.</p>
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
            <h2 id="why-title">Просто. Понятно. По делу.</h2>
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
