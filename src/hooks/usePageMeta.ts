import { useEffect } from 'react'
import { site } from '../content/site'

/** Заголовок и description страницы (SPA без SSR). */
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${site.name}` : `${site.name} — соцсети, сайты, дизайн и автоматизация`
    if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}
