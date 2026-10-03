import { site } from '../content/site'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <Logo />
        <p>
          © {new Date().getFullYear()} {site.name}. Сделано с напряжением ⚡
        </p>
        <a href="#top" className="footer__up">
          Наверх ↑
        </a>
      </div>
    </footer>
  )
}
