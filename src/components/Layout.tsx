import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import { useReveal } from '../hooks/useReveal'
import { themeStore } from '../lib/themeStore'
import { CommandPalette } from './CommandPalette'
import { Footer } from './Footer'
import { Menubar } from './Menubar'

function ScrollProgress() {
  useEffect(() => {
    const el = document.getElementById('progress')
    if (!el) return
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      el.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return <div id="progress" className="progress" aria-hidden />
}

export default function Layout() {
  const { pathname } = useLocation()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const prevPath = useRef(pathname)
  useReveal()

  // при переходе на другую страницу — новый случайный стиль (если не зафиксирован)
  useEffect(() => {
    if (prevPath.current === pathname) return
    prevPath.current = pathname
    window.scrollTo({ top: 0, behavior: 'instant' })
    themeStore.randomizeOnNavigate()
  }, [pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = /input|textarea|select/i.test((e.target as HTMLElement)?.tagName ?? '')
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((v) => !v)
      } else if (e.key === '/' && !typing) {
        e.preventDefault()
        setPaletteOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <a href="#main" className="skip-link">
        Перейти к содержимому
      </a>
      <ScrollProgress />
      <Menubar onSearch={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <main id="main" tabIndex={-1}>
        <span id="top" />
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
