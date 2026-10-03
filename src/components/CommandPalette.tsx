import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { services, servicePath } from '../content/services'
import { site } from '../content/site'
import { themeStore } from '../lib/themeStore'
import { IconArrow, IconDice, IconMoon, IconSearch, ServiceIcon } from './Icon'

interface Item {
  id: string
  group: string
  label: string
  hint?: string
  keywords?: string
  icon: ReactNode
  run: () => void
}

/** Палитра команд в духе Spotlight: ⌘K / Ctrl+K. */
export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const input = useRef<HTMLInputElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  const items = useMemo<Item[]>(() => {
    const go = (to: string) => () => navigate(to, { viewTransition: true })
    const page = (id: string, label: string, to: string, kw = ''): Item => ({
      id, group: 'Страницы', label, keywords: kw, icon: <IconArrow width={18} height={18} />, run: go(to),
    })
    return [
      page('home', 'Главная', '/', 'home старт'),
      page('services', 'Все услуги', '/services', 'услуги'),
      ...services.map<Item>((s) => ({
        id: s.id, group: 'Услуги', label: s.title, hint: s.hook, keywords: s.short,
        icon: <ServiceIcon name={s.icon} width={18} height={18} />, run: go(servicePath(s)),
      })),
      page('approach', 'Подход', '/approach', 'как работаем процесс'),
      page('portfolio', 'Портфолио', '/portfolio', 'кейсы работы'),
      page('contact', 'Контакты', '/contact', 'связаться написать заявка'),
      {
        id: 'random', group: 'Действия', label: 'Сменить стиль сайта', hint: 'Случайная тема', keywords: 'тема цвет random',
        icon: <IconDice width={18} height={18} />, run: () => themeStore.randomize(),
      },
      {
        id: 'reset', group: 'Действия', label: 'Тема Volt (фирменная)', keywords: 'сбросить тема вернуть',
        icon: <IconMoon width={18} height={18} />, run: () => themeStore.reset(),
      },
      {
        id: 'mode', group: 'Действия', label: 'Светлая / тёмная тема', hint: 'Переключить режим', keywords: 'dark light режим ночь',
        icon: <IconMoon width={18} height={18} />, run: () => themeStore.setMode(themeStore.get().mode === 'dark' ? 'light' : 'dark'),
      },
      {
        id: 'mail', group: 'Действия', label: 'Написать на почту', hint: site.contacts.email, keywords: 'email письмо',
        icon: <IconArrow width={18} height={18} />, run: () => { window.location.href = `mailto:${site.contacts.email}` },
      },
    ]
  }, [navigate])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((i) => `${i.label} ${i.keywords ?? ''} ${i.group}`.toLowerCase().includes(q))
  }, [items, query])

  useEffect(() => {
    if (!open) return
    returnFocus.current = document.activeElement as HTMLElement | null
    input.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
      returnFocus.current?.focus?.()
    }
  }, [open])

  if (!open) return null

  const choose = (item?: Item) => {
    if (!item) return
    onClose()
    item.run()
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(filtered.length - 1, a + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(0, a - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      choose(filtered[active])
    } else if (e.key === 'Tab') {
      e.preventDefault() // фокус остаётся в поле, навигация стрелками
    }
  }

  let lastGroup = ''
  return (
    <div className="palette" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="palette__box" role="dialog" aria-modal="true" aria-label="Быстрый переход" onKeyDown={onKey}>
        <div className="palette__field">
          <IconSearch width={20} height={20} aria-hidden />
          <input
            ref={input}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
            placeholder="Куда перейти или что сделать?"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={filtered[active] ? `pal-${filtered[active].id}` : undefined}
            aria-label="Поиск по сайту"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd>Esc</kbd>
        </div>
        <ul className="palette__list" id="palette-list" role="listbox">
          {filtered.length === 0 && <li className="palette__empty">Ничего не найдено — попробуйте «услуги» или «контакты»</li>}
          {filtered.map((item, i) => {
            const header = item.group !== lastGroup ? item.group : null
            lastGroup = item.group
            return (
              <li key={item.id} role="presentation">
                {header && <div className="palette__group">{header}</div>}
                <div
                  id={`pal-${item.id}`}
                  role="option"
                  aria-selected={i === active}
                  className="palette__item"
                  onMouseMove={() => setActive(i)}
                  onClick={() => choose(item)}
                >
                  <span className="palette__icon">{item.icon}</span>
                  <span className="palette__label">{item.label}</span>
                  {item.hint && <span className="palette__hint">{item.hint}</span>}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
