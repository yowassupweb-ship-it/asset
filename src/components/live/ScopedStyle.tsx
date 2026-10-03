import { scopeCss } from '../../lib/css'

/** Стили превью, ограниченные контейнером .pv-scope (вложенный CSS). */
export function ScopedStyle({ code }: { code: string }) {
  return <style>{scopeCss(code, '.pv-scope')}</style>
}
