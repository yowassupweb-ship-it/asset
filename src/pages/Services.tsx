import { useState } from 'react'
import { CtaBand, PageHero, RelatedServices, ServiceCard } from '../components/Shared'
import { serviceExtras } from '../content/extras'
import { services } from '../content/services'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Services() {
  const [tab, setTab] = useState(services[0]!.id)
  usePageMeta('Услуги', 'Соцсети, сайты, дизайн и автоматизация бизнес-процессов — студия Ассет.')
  return (
    <>
      <PageHero
        eyebrow="Услуги"
        title="Всё, чтобы ваш бренд работал на вас"
        lead="Соцсети дают голос, дизайн — лицо, сайт — дом, автоматизация — скорость. Берите любое направление отдельно или собирайте систему целиком."
      />
      <section className="section section--flush">
        <div className="container">
          <div className="services">
            {services.map((s, i) => (
              <ServiceCard key={s.id} s={s} i={i} />
            ))}
          </div>
        </div>
      </section>
      <section className="section section--sunken" aria-labelledby="rel-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Сопутствующие услуги</p>
            <h2 id="rel-title">Всё, что вырастает вокруг основной задачи</h2>
            <p>Выберите направление — покажем, что чаще всего подключают рядом и что входит в каждую услугу.</p>
          </div>
          <div className="chips tabs" role="group" aria-label="Направление">
            {services.map((sv) => (
              <label key={sv.id} className="chip">
                <input type="radio" name="rel-tab" checked={tab === sv.id} onChange={() => setTab(sv.id)} />
                <span>{sv.short}</span>
              </label>
            ))}
          </div>
          <RelatedServices key={tab} items={serviceExtras[tab].related} />
        </div>
      </section>
      <CtaBand />
    </>
  )
}
