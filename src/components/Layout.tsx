import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { useReveal } from '../hooks/useReveal'
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
  useReveal()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <>
      <a href="#main" className="skip-link">
        Перейти к содержимому
      </a>
      <ScrollProgress />
      <Menubar />
      <main id="main" tabIndex={-1}>
        <span id="top" />
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
