import { useEffect } from 'react'

/**
 * Плавное появление элементов с [data-reveal].
 * MutationObserver подхватывает и те, что смонтировались позже (смена страницы, lazy).
 */
export function useReveal() {
  useEffect(() => {
    const root = document.getElementById('root')
    if (!root) return
    if (!('IntersectionObserver' in window)) {
      root.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
    )
    const scan = (node: ParentNode) =>
      node.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)').forEach((el) => io.observe(el))
    scan(root)
    const mo = new MutationObserver((list) => {
      for (const m of list) m.addedNodes.forEach((n) => n instanceof HTMLElement && (n.matches('[data-reveal]') && io.observe(n), scan(n)))
    })
    mo.observe(root, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
}
