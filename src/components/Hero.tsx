import { useState } from 'react'
import { services, type ServiceId } from '../content/site'
import { IconArrow, ServiceIcon } from './Icon'

/** Окно в духе Finder: боковая панель + превью выбранной услуги. */
function ServiceWindow() {
  const [active, setActive] = useState<ServiceId>('smm')
  const current = services.find((s) => s.id === active) ?? services[0]!

  return (
    <div className="window" role="group" aria-label="Обзор услуг студии">
      <div className="window__bar">
        <span className="window__lights" aria-hidden>
          <i data-c="close" />
          <i data-c="min" />
          <i data-c="max" />
        </span>
        <span className="window__title">Ассет — Услуги</span>
      </div>

      <div className="window__body">
        <div className="window__sidebar" role="tablist" aria-label="Услуги" aria-orientation="vertical">
          <span className="window__section">Избранное</span>
          {services.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              id={`tab-${s.id}`}
              aria-selected={active === s.id}
              aria-controls="window-panel"
              className="window__item"
              onClick={() => setActive(s.id)}
            >
              <ServiceIcon name={s.icon} width={18} height={18} />
              <span>{s.short}</span>
            </button>
          ))}
        </div>

        <div className="window__panel" role="tabpanel" id="window-panel" aria-labelledby={`tab-${active}`}>
          <div className="window__preview" data-kind={active} aria-hidden>
            {active === 'smm' && <PreviewSocial />}
            {active === 'web' && <PreviewWeb />}
            {active === 'automation' && <PreviewFlow />}
          </div>
          <p className="window__hook">{current.hook}</p>
        </div>
      </div>
    </div>
  )
}

function PreviewSocial() {
  return (
    <div className="pv-social">
      <div className="pv-post pv-post--a">
        <i />
        <b />
        <b />
      </div>
      <div className="pv-post pv-post--b">
        <i />
        <b />
        <b />
      </div>
      <div className="pv-post pv-post--c">
        <i />
        <b />
        <b />
      </div>
    </div>
  )
}

function PreviewWeb() {
  return (
    <div className="pv-web">
      <div className="pv-web__nav">
        <i />
        <b />
        <b />
        <b />
      </div>
      <div className="pv-web__hero">
        <b />
        <b />
        <span />
      </div>
      <div className="pv-web__cards">
        <i />
        <i />
        <i />
      </div>
    </div>
  )
}

function PreviewFlow() {
  return (
    <div className="pv-flow">
      <span className="pv-node pv-node--a" />
      <span className="pv-line" />
      <span className="pv-node pv-node--b" />
      <span className="pv-line" />
      <span className="pv-node pv-node--c" />
    </div>
  )
}

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__glow" aria-hidden />
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__badge" data-reveal>
            <span className="hero__badge-dot" aria-hidden />
            Digital-студия
          </p>
          <h1 id="hero-title" className="hero__title" data-reveal style={{ '--i': 1 } as React.CSSProperties}>
            Делаем из digital <span className="hero__accent">актив</span>
          </h1>
          <p className="hero__lead" data-reveal style={{ '--i': 2 } as React.CSSProperties}>
            Соцсети, сайты и автоматизация — в одной студии. Без шума и лишних слов, зато с результатом, который
            можно посчитать.
          </p>
          <div className="hero__actions" data-reveal style={{ '--i': 3 } as React.CSSProperties}>
            <a href="#contact" className="btn btn--accent btn--lg">
              Обсудить проект
              <IconArrow width={18} height={18} />
            </a>
            <a href="#services" className="btn btn--secondary btn--lg">
              Что мы делаем
            </a>
          </div>
        </div>

        <div className="hero__visual" data-reveal style={{ '--i': 2 } as React.CSSProperties}>
          <ServiceWindow />
        </div>
      </div>
    </section>
  )
}
