import { faq } from '../content/site'
import { IconPlus } from './Icon'

export function Faq() {
  return (
    <section className="section section--sunken" id="faq" aria-labelledby="faq-title">
      <div className="container container--narrow">
        <div className="section-head" data-reveal>
          <p className="eyebrow">Вопросы</p>
          <h2 id="faq-title">Частые вопросы</h2>
        </div>

        <div className="faq" data-reveal>
          {faq.map((item) => (
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
  )
}
