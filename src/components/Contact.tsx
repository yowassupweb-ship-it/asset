import { useState, type FormEvent } from 'react'
import { services, site, type ServiceId } from '../content/site'
import { IconArrow } from './Icon'

/**
 * Форма без бэкенда: собирает письмо в почтовом клиенте.
 * Для приёма заявок на сервере — подключите Formspree / Vercel Function
 * (см. README, «Форма заявок»).
 */
export function Contact() {
  const [selected, setSelected] = useState<ServiceId[]>([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const toggle = (id: ServiceId) =>
    setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]))

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const topics = services.filter((s) => selected.includes(s.id)).map((s) => s.title)
    const body = [
      name && `Меня зовут ${name}.`,
      topics.length > 0 && `Интересует: ${topics.join(', ')}.`,
      message,
    ]
      .filter(Boolean)
      .join('\n\n')
    const subject = encodeURIComponent('Заявка с сайта Ассет')
    window.location.href = `mailto:${site.contacts.email}?subject=${subject}&body=${encodeURIComponent(body)}`
  }

  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact card" data-reveal>
          <div className="contact__glow" aria-hidden />
          <div className="contact__intro">
            <p className="eyebrow">Контакты</p>
            <h2 id="contact-title">Давайте включим ваш проект</h2>
            <p>
              Расскажите о задаче в паре строк. Мы вернёмся с вопросами, идеями и понятным планом — без обязательств и
              без занудства.
            </p>
            <ul className="contact__links">
              <li>
                <a href={`mailto:${site.contacts.email}`}>{site.contacts.email}</a>
              </li>
              <li>
                <a href={site.contacts.telegram} target="_blank" rel="noopener noreferrer">
                  Telegram {site.contacts.telegramLabel}
                </a>
              </li>
            </ul>
          </div>

          <form className="form" onSubmit={onSubmit}>
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
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label className="form__field">
              <span>О задаче</span>
              <textarea
                name="message"
                rows={4}
                placeholder="Что хотите сделать и к какому сроку"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>

            <button type="submit" className="btn btn--accent btn--lg">
              Отправить
              <IconArrow width={18} height={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
