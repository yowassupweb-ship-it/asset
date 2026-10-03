import { Link } from 'react-router'
import { services, servicePath } from '../content/services'
import { site } from '../content/site'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo />
          <p>Студия, которая превращает digital в актив: соцсети, дизайн, сайты и автоматизация.</p>
        </div>
        <nav aria-label="Услуги">
          <h2 className="footer__h">Услуги</h2>
          <ul>
            {services.map((s) => (
              <li key={s.id}>
                <Link to={servicePath(s)}>{s.short}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Студия">
          <h2 className="footer__h">Студия</h2>
          <ul>
            <li><Link to="/approach">Подход</Link></li>
            <li><Link to="/portfolio">Портфолио</Link></li>
            <li><Link to="/contact">Контакты</Link></li>
          </ul>
        </nav>
        <div>
          <h2 className="footer__h">Связь</h2>
          <ul>
            <li><a href={`mailto:${site.contacts.email}`}>{site.contacts.email}</a></li>
            <li><a href={site.contacts.telegram} target="_blank" rel="noopener noreferrer">{site.contacts.telegramLabel}</a></li>
          </ul>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} {site.name}. Сделано с напряжением ⚡</span>
        <a href="#top">Наверх ↑</a>
      </div>
    </footer>
  )
}
