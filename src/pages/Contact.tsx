import { useState, type FormEvent } from 'react'
import { IconArrow, IconCopy, IconPlus } from '../components/Icon'
import { PageHero } from '../components/Shared'
import { services, type ServiceId } from '../content/services'
import { faq, site } from '../content/site'
import { usePageMeta } from '../hooks/usePageMeta'

/**
 * Форма без бэкенда: собирает письмо в почтовом клиенте.
 * Для приёма заявок на сервере — подключите Formspree / Vercel Function
 * (см. README, «Форма заявок»).
 */
export default function Contact() {
  usePageMeta('Контакты', 'Обсудить проект со студией Ассет: расскажите о задаче — вернёмся с идеями и планом.')
  const [selected, setSelected] = useState<ServiceId[]>([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.contacts.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* буфер недоступен — адрес виден на странице */
    }
  }

  const toggle = (id: ServiceId) => setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]))

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const topics = services.filter((s) => selected.includes(s.id)).map((s) => s.title)
    const body = [name && `Меня зовут ${name}.`, topics.length > 0 && `Интересует: ${topics.join(', ')}.`, message]
      .filter(Boolean)
      .join('\n\n')
    const subject = encodeURIComponent('Заявка с сайта Ассет')
    window.location.href = `mailto:${site.contacts.email}?subject=${subject}&body=${encodeURIComponent(body)}`
  }

  return (
    <>
      <PageHero
        eyebrow="Контакты"
        title="Давайте включим ваш проект"
        lead="Расскажите о задаче в паре строк. Мы вернёмся с вопросами, идеями и понятным планом — без обязательств и без занудства."
      />

      <section className="section section--flush">
        <div className="container contact-grid">
          <form className="card form" onSubmit={onSubmit} data-reveal>
            <fieldset className="form__field">
              <legend>Что вас интересует?</legend>
              <div className="chips">
                {services.map((s) => (
                  <label key={s.id} className="chip">
                    <input type="checkbox" checked={selected.includes(s.id)} onChange={() => toggle(s.id)} />
                    <span>{s.short}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="form__field">
              <span>Как к вам обращаться?</span>
              <input type="text" name="name" autoComplete="name" placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label className="form__field">
              <span>О задаче</span>
              <textarea name="message" rows={4} placeholder="Что хотите сделать и к какому сроку" value={message} onChange={(e) => setMessage(e.target.value)} />
            </label>
            <button type="submit" className="btn btn--accent btn--lg">
              Отправить <IconArrow width={18} height={18} />
            </button>
          </form>

          <aside className="contact-side" data-reveal style={{ '--i': 1 } as React.CSSProperties}>
            <div className="card contact-card">
              <h2>Напрямую</h2>
              <div className="contact-card__row">
                <a href={`mailto:${site.contacts.email}`}>{site.contacts.email}</a>
                <button type="button" className="icon-chip" onClick={copy} aria-label="Скопировать e-mail">
                  <IconCopy width={15} height={15} />
                  <span aria-live="polite">{copied ? 'Скопировано' : 'Копировать'}</span>
                </button>
              </div>
              <a href={site.contacts.telegram} target="_blank" rel="noopener noreferrer">
                Telegram {site.contacts.telegramLabel}
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
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
    </>
  )
}
