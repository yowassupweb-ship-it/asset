import { useEffect, useState } from 'react'

const fmt = new Intl.DateTimeFormat('ru-RU', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
})

/** Часы в стиле строки меню macOS. Обновляются раз в минуту. */
export function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(id)
  }, [])
  return fmt.format(now).replace(',', '')
}
