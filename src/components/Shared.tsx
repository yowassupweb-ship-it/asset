import { Link } from 'react-router'
import type { ReactNode } from 'react'
import { services, servicePath, type Service } from '../content/services'
import { IconArrow, IconCheck, ServiceIcon } from './Icon'

import { delay } from '../lib/ui'

export function PageHero({ eyebrow, title, lead, children }: { eyebrow: string; title: ReactNode; lead?: ReactNode; children?: ReactNode }) {
  return (
    <header className="page-hero">
      <div className="page-hero__glow" aria-hidden />
      <div className="container page-hero__inner">
        <p className="eyebrow" data-reveal>{eyebrow}</p>
        <h1 data-reveal style={delay(1)}>{title}</h1>
        {lead && <p className="page-hero__lead" data-reveal style={delay(2)}>{lead}</p>}
        {children && <div data-reveal style={delay(3)}>{children}</div>}
      </div>
    </header>
  )
}

export function AppIcon({ name }: { name: Service['icon'] }) {
  return (
    <div className="app-icon" data-kind={name}>
      {/* Замена на GPT-иконку: <img src={`/brand/icon-${name}.png`} alt="" /> */}
      <ServiceIcon name={name} />
    </div>
  )
}

export function ServiceCard({ s, i = 0 }: { s: Service; i?: number }) {
  return (
    <Link to={servicePath(s)} className="card service" data-reveal style={delay(i)} viewTransition>
      <AppIcon name={s.icon} />
      <h3 className="service__title">{s.title}</h3>
      <p className="service__hook">{s.hook}</p>
      <p className="service__desc">{s.description}</p>
      <ul className="service__list">
        {s.features.map((f) => (
          <li key={f}>
            <IconCheck width={16} height={16} />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <span className="service__more">
        Подробнее <IconArrow width={16} height={16} />
      </span>
    </Link>
  )
}

export function CtaBand({ title = 'Обсудим ваш проект?', text = 'Пара строк о задаче — и мы вернёмся с идеями и понятным планом.' }: { title?: string; text?: string }) {
  return (
    <section className="section section--tight">
      <div className="container">
        <div className="cta" data-reveal>
          <div>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <Link to="/contact" className="btn btn--accent btn--lg" viewTransition>
            Обсудить проект <IconArrow width={18} height={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export function OtherServices({ current }: { current: string }) {
  const rest = services.filter((s) => s.id !== current)
  return (
    <section className="section section--sunken">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">Ещё</p>
          <h2>Лучше работает вместе</h2>
        </div>
        <div className="services services--3">
          {rest.map((s, i) => (
            <ServiceCard key={s.id} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function RelatedServices({ items }: { items: import('../content/extras').RelatedService[] }) {
  return (
    <div className="related">
      {items.map((r, i) => {
        const target = r.link ? services.find((s) => s.id === r.link) : undefined
        return (
          <article key={r.title} className="card related__item" data-reveal style={delay(i % 3)}>
            <h3>{r.title}</h3>
            <p>{r.text}</p>
            <ul>
              {r.includes.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            {target && (
              <Link to={servicePath(target)} className="related__link" viewTransition>
                Подробнее в услуге «{target.short}» <IconArrow width={14} height={14} />
              </Link>
            )}
          </article>
        )
      })}
    </div>
  )
}
