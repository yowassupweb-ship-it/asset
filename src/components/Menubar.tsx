import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { services, servicePath } from '../content/services'
import { useClock } from '../hooks/useClock'
import { useTheme } from '../hooks/useTheme'
import { styleLabel, themeStore, useStyleState } from '../lib/themeStore'
import { IconClose, IconDice, IconLock, IconMenu, IconMoon, IconSearch, IconSun, ServiceIcon } from './Icon'
import { Logo } from './Logo'

const links = [
  { to: '/approach', label: 'Подход' },
  { to: '/portfolio', label: 'Портфолио' },
  { to: '/contact', label: 'Контакты' },
]

const navClass = ({ isActive }: { isActive: boolean }) => `menubar__link${isActive ? ' is-active' : ''}`

/** Строка меню в духе macOS: прозрачное «стекло», логотип слева, часы справа. */
export function Menubar({ onSearch }: { onSearch: () => void }) {
  const [openAt, setOpenAt] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggle } = useTheme()
  const clock = useClock()
  const style = useStyleState()
  const { pathname } = useLocation()
  // меню закрывается само при смене страницы
  const open = openAt === pathname
  const setOpen = (v: boolean | ((x: boolean) => boolean)) =>
    setOpenAt((typeof v === 'function' ? v(open) : v) ? pathname : null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenAt(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`menubar${scrolled ? ' is-scrolled' : ''}`}>
      <div className="menubar__inner container">
        <Link to="/" className="menubar__brand" aria-label="Ассет — на главную" viewTransition>
          <Logo />
        </Link>

        <nav className="menubar__nav" aria-label="Основная навигация">
          <div className="menubar__drop">
            <NavLink to="/services" className={navClass} viewTransition>
              Услуги
            </NavLink>
            <div className="dropdown">
              {services.map((s) => (
                <Link key={s.id} to={servicePath(s)} className="dropdown__item" viewTransition>
                  <ServiceIcon name={s.icon} width={18} height={18} />
                  <span>{s.short}</span>
                </Link>
              ))}
            </div>
          </div>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={navClass} viewTransition>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="menubar__status">
          <div className="stylepill" role="group" aria-label="Стиль сайта">
            <button
              type="button"
              className="stylepill__roll"
              onClick={() => themeStore.randomize()}
              title="Случайный стиль"
            >
              <IconDice width={16} height={16} />
              <span>{styleLabel(style.id)}</span>
            </button>
            <button
              type="button"
              className="stylepill__lock"
              aria-pressed={style.locked}
              onClick={() => themeStore.setLocked(!style.locked)}
              aria-label={style.locked ? 'Стиль зафиксирован: не менять при переходах' : 'Менять стиль при переходах между страницами'}
              title={style.locked ? 'Зафиксирован' : 'Менять при переходах'}
            >
              <IconLock open={!style.locked} width={15} height={15} />
            </button>
          </div>
          <button type="button" className="menubar__icon-btn" onClick={onSearch} aria-label="Быстрый поиск (Ctrl K)" title="Поиск · Ctrl K">
            <IconSearch width={18} height={18} />
          </button>
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
          <Link to="/contact" className="btn btn--accent btn--sm menubar__cta" viewTransition>
            Обсудить проект
          </Link>
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
          <Link to="/services" className="sheet__link">
            Все услуги
          </Link>
          {services.map((s) => (
            <Link key={s.id} to={servicePath(s)} className="sheet__link sheet__link--sub">
              <ServiceIcon name={s.icon} width={18} height={18} />
              {s.short}
            </Link>
          ))}
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="sheet__link">
              {l.label}
            </Link>
          ))}
          <button type="button" className="sheet__link sheet__style" onClick={() => themeStore.randomize()}>
            <IconDice width={18} height={18} /> Сменить стиль · {styleLabel(style.id)}
          </button>
          <Link to="/contact" className="btn btn--accent btn--lg">
            Обсудить проект
          </Link>
        </nav>
      </div>
    </header>
  )
}
