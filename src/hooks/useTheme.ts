import { themeStore, useStyleState } from '../lib/themeStore'

/** Светлый/тёмный режим — часть общего стиля сайта (см. themeStore). */
export function useTheme() {
  const { mode } = useStyleState()
  return { theme: mode, toggle: () => themeStore.setMode(mode === 'dark' ? 'light' : 'dark') }
}
