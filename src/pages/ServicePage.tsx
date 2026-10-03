import { Link, useParams } from 'react-router'
import { IconArrow, IconPlus } from '../components/Icon'
import { ServiceDemo } from '../components/live/ServiceDemo'
import { ServiceNav } from '../components/ServiceNav'
import { AppIcon, CtaBand, OtherServices, RelatedServices } from '../components/Shared'
import { serviceExtras } from '../content/extras'
import { delay } from '../lib/ui'
import { serviceBySlug } from '../content/services'
import { usePageMeta } from '../hooks/usePageMeta'
import NotFound from './NotFound'

export default function ServicePage() {
  const { slug } = useParams()
  const s = serviceBySlug(slug)
  usePageMeta(s?.page.metaTitle, s?.page.metaDescription)
  if (!s) return <NotFound />
  const p = s.page
  const x = serviceExtras[s.id]
  const sections = [
    { id: 'idea', label: 'Идея' },
    { id: 'live', label: 'Вживую' },
    { id: 'inside', label: 'Что внутри' },
    { id: 'process', label: 'Процесс' },
    { id: 'related', label: 'Сопутствующие' },
    { id: 'faq', label: 'Вопросы' },
  ]

  return (
    <>
      <header className="page-hero">
        <div className="page-hero__glow" aria-hidden />
        <div className="container page-hero__inner page-hero__inner--art">
          <div className="page-hero__art" aria-hidden data-reveal style={delay(2)}>
            <i />
            <i />
            <AppIcon name={s.icon} />
          </div>
          <nav className="crumbs" aria-label="Хлебные крошки" data-reveal>
            <Link to="/services" viewTransition>Услуги</Link>
            <span aria-hidden>/</span>
            <span aria-current="page">{s.short}</span>
          </nav>
          <h1 data-reveal style={delay(2)}>{p.headline}</h1>
          <p className="page-hero__lead" data-reveal style={delay(3)}>{p.lead}</p>
          <div className="hero__actions" data-reveal style={delay(4)}>
            <Link to="/contact" className="btn btn--accent btn--lg" viewTransition>
              Обсудить проект <IconArrow width={18} height={18} />
            </Link>
          </div>
          <dl className="facts" data-reveal style={delay(5)}>
            {x.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <ServiceNav sections={sections} />

      <section className="section section--flush" id="idea">
        <div className="container manifesto">
          <p className="eyebrow" data-reveal>Идея</p>
          <div className="manifesto__text">
            {p.manifesto.map((t, i) => (
              <p key={i} data-reveal style={delay(i + 1)}>{t}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="live" aria-labelledby="demo-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Вживую</p>
            <h2 id="demo-title">{p.demoTitle}</h2>
            <p>{p.demoText}</p>
          </div>
          <div data-reveal>
            <ServiceDemo id={s.id} />
          </div>
        </div>
      </section>

      <section className="section section--sunken" id="inside" aria-labelledby="inside-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Что внутри</p>
            <h2 id="inside-title">Из чего складывается результат</h2>
          </div>
          <div className="deliverables">
            {p.deliverables.map((d, i) => (
              <div key={d.title} className="card deliverable" data-reveal style={delay(i % 3)}>
                <span className="deliverable__n" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="process" aria-labelledby="steps-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Как это проходит</p>
            <h2 id="steps-title">Четыре шага без сюрпризов</h2>
          </div>
          <ol className="steps">
            {p.steps.map((st, i) => (
              <li key={st.title} className="step" data-reveal style={delay(i)}>
                <span className="step__num" aria-hidden>{i + 1}</span>
                <h3>{st.title}</h3>
                <p>{st.text}</p>
              </li>
            ))}
          </ol>
          <div className="forwhom" data-reveal>
            <h3>Кому подойдёт</h3>
            <ul>
              {p.forWhom.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--sunken" id="related" aria-labelledby="related-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Сопутствующие услуги</p>
            <h2 id="related-title">Что ещё часто берут вместе с этим</h2>
            <p>Это не навязанный допсервис, а продолжение задачи. Подключаем по одному — в тот момент, когда они действительно нужны.</p>
          </div>
          <RelatedServices items={x.related} />
        </div>
      </section>

      <section className="section" id="faq" aria-labelledby="sfaq-title">
        <div className="container container--narrow">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Вопросы</p>
            <h2 id="sfaq-title">Что обычно спрашивают</h2>
          </div>
          <div className="faq" data-reveal>
            {x.faq.map((item) => (
              <details key={item.q} className="faq__item" name="faq">
                <summary>
                  <span>{item.q}</span>
                  <IconPlus className="faq__icon" width={20} height={20} />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <OtherServices current={s.id} />
      <CtaBand />
    </>
  )
}
