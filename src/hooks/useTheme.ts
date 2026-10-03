import { useCallback, useState } from 'react'

export type Theme = 'light' | 'dark'

const KEY = 'asset-theme'

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function currentTheme(): Theme {
  const attr = document.documentElement.dataset.theme
  return attr === 'light' || attr === 'dark' ? attr : systemTheme()
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(currentTheme)

  const toggle = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(KEY, next)
    } catch {
      /* приватный режим — не критично */
    }
    setTheme(next)
  }, [theme])

  return { theme, toggle }
}
