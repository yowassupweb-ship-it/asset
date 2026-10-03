import { services } from '../content/site'
import { IconCheck, ServiceIcon } from './Icon'

export function Services() {
  return (
    <section className="section" id="services" aria-labelledby="services-title">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">Услуги</p>
          <h2 id="services-title">Три направления. Одна система.</h2>
          <p>
            Каждое направление сильно само по себе — а вместе они дают то, чего не добиться по отдельности: целостный
            бренд, который находят, запоминают и выбирают.
          </p>
        </div>

        <div className="services">
          {services.map((s, i) => (
            <article
              key={s.id}
              className="card service"
              data-reveal
              style={{ '--i': i } as React.CSSProperties}
            >
              <div className="app-icon" data-kind={s.icon}>
                {/* Замена на GPT-иконку: <img src={`/brand/icon-${s.icon}.png`} alt="" /> */}
                <ServiceIcon name={s.icon} />
              </div>
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
              <p className="service__for">{s.forWhom}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
