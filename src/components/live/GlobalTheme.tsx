import { useEffect, useRef } from 'react'
import { prepareCss } from '../../lib/css'

/**
 * Применяет код из окна к настоящему сайту (через <style> с токенами).
 * Смена плавная: на время перехода включается data-live-fade (см. pages.css).
 * Снимается при уходе со страницы.
 */
export function GlobalTheme({ code }: { code: string }) {
  const first = useRef(true)

  useEffect(() => {
    const root = document.documentElement
    let el = document.getElementById('live-theme') as HTMLStyleElement | null
    if (!el) {
      el = document.createElement('style')
      el.id = 'live-theme'
      document.head.appendChild(el)
    }
    let timer: number | undefined
    if (!first.current) {
      root.dataset.liveFade = ''
      timer = window.setTimeout(() => delete root.dataset.liveFade, 1400)
    }
    first.current = false
    el.textContent = prepareCss(code)
    return () => window.clearTimeout(timer)
  }, [code])

  useEffect(
    () => () => {
      document.getElementById('live-theme')?.remove()
      delete document.documentElement.dataset.liveFade
    },
    [],
  )
  return null
}
