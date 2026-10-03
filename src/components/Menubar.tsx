import { useEffect, useState } from 'react'
import { useClock } from '../hooks/useClock'
import { useTheme } from '../hooks/useTheme'
import { IconClose, IconMenu, IconMoon, IconSun } from './Icon'
import { Logo } from './Logo'

const links = [
  { href: '#services', label: 'Услуги' },
  { href: '#approach', label: 'Подход' },
  { href: '#portfolio', label: 'Портфолио' },
  { href: '#faq', label: 'Вопросы' },
]

/** Строка меню в духе macOS: прозрачное «стекло», логотип слева, часы справа. */
export function Menubar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggle } = useTheme()
  const clock = useClock()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`menubar${scrolled ? ' is-scrolled' : ''}`}>
      <div className="menubar__inner container">
        <a href="#top" className="menubar__brand" aria-label="Ассет — на главную" onClick={close}>
          <Logo />
        </a>

        <nav className="menubar__nav" aria-label="Основная навигация">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="menubar__link">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="menubar__status">
          <button
            type="button"
            className="menubar__icon-btn"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}
          >
            {theme === 'dark' ? <IconSun width={18} height={18} /> : <IconMoon width={18} height={18} />}
          </button>
          <time className="menubar__clock" aria-hidden>
            {clock}
          </time>
          <a href="#contact" className="btn btn--accent btn--sm menubar__cta">
            Обсудить проект
          </a>
          <button
            type="button"
            className="menubar__icon-btn menubar__burger"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          >
            {open ? <IconClose width={20} height={20} /> : <IconMenu width={20} height={20} />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="sheet" hidden={!open}>
        <nav className="container sheet__nav" aria-label="Мобильная навигация">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="sheet__link" onClick={close}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn btn--accent btn--lg" onClick={close}>
            Обсудить проект
          </a>
        </nav>
      </div>
    </header>
  )
}
