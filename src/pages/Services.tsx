import { CtaBand, PageHero, ServiceCard } from '../components/Shared'
import { services } from '../content/services'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Services() {
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
      <CtaBand />
    </>
  )
}
