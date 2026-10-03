import { useEffect } from 'react'
import { prepareCss } from '../../lib/css'

/** Применяет код из окна к настоящему сайту (через <style> с токенами). Снимает при уходе со страницы. */
export function GlobalTheme({ code }: { code: string }) {
  useEffect(() => {
    let el = document.getElementById('live-theme') as HTMLStyleElement | null
    if (!el) {
      el = document.createElement('style')
      el.id = 'live-theme'
      document.head.appendChild(el)
    }
    el.textContent = prepareCss(code)
  }, [code])

  useEffect(() => () => document.getElementById('live-theme')?.remove(), [])
  return null
}
