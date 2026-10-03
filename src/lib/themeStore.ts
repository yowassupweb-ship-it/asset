import { useSyncExternalStore } from 'react'
import { buildThemeCode, themeIds, themeVariantsFor, type Mode } from '../content/live'
import { prepareCss } from './css'
import { sanitizeTokens } from './tokens'

/**
 * Общее хранилище стиля сайта: тема (акцент) × режим (светлый/тёмный) + код консоли.
 * Источники изменений: live — консоль на главной, random — случайная смена, user — выбор вручную.
 */
export type StyleSource = 'live' | 'random' | 'user' | 'init'

interface State {
  theme: string
  mode: Mode
  code: string
  source: StyleSource
  locked: boolean
}

const LOCK_KEY = 'asset-style-lock'
const MODE_KEY = 'asset-theme'

function readLock() {
  try {
    return localStorage.getItem(LOCK_KEY) === '1'
  } catch {
    return false
  }
}

function initialMode(): Mode {
  if (typeof document === 'undefined') return 'light'
  const attr = document.documentElement.dataset.theme
  if (attr === 'light' || attr === 'dark') return attr
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const mode0 = initialMode()
let state: State = {
  theme: 'volt',
  mode: mode0,
  code: buildThemeCode('volt', mode0),
  source: 'init',
  locked: typeof window !== 'undefined' && readLock(),
}
const listeners = new Set<() => void>()
let fadeTimer: number | undefined

function commit(next: State) {
  state = next
  listeners.forEach((l) => l())
}

/** Пишет CSS в <style id="live-theme"> и включает плавный переход на 1.4 с. */
function paint(code: string) {
  const root = document.documentElement
  let el = document.getElementById('live-theme') as HTMLStyleElement | null
  if (!el) {
    el = document.createElement('style')
    el.id = 'live-theme'
    document.head.appendChild(el)
  }
  root.dataset.liveFade = ''
  window.clearTimeout(fadeTimer)
  fadeTimer = window.setTimeout(() => delete root.dataset.liveFade, 1400)
  el.textContent = prepareCss(sanitizeTokens(code))
}

export const themeStore = {
  get: () => state,
  subscribe(l: () => void) {
    listeners.add(l)
    return () => {
      listeners.delete(l)
    }
  },

  /** Применить код (консоль, ручная правка). */
  set(theme: string, code: string, source: StyleSource) {
    if (state.code === code && state.theme === theme) return
    paint(code)
    commit({ ...state, theme, code, source })
  },

  /** Выбрать тему в текущем режиме. */
  setTheme(theme: string, source: StyleSource = 'user') {
    this.set(theme, buildThemeCode(theme, state.mode), source)
  },

  /** Переключить светлый/тёмный режим, сохранив тему. */
  setMode(mode: Mode) {
    if (mode === state.mode) return
    document.documentElement.dataset.theme = mode
    try {
      localStorage.setItem(MODE_KEY, mode)
    } catch {
      /* приватный режим — не критично */
    }
    const code = buildThemeCode(state.theme, mode)
    paint(code)
    commit({ ...state, mode, code, source: 'user' })
  },

  /** Случайная тема, отличная от текущей (режим не трогаем). */
  randomize() {
    const pool = themeIds.filter((id) => id !== state.theme)
    const id = pool[Math.floor(Math.random() * pool.length)]
    if (id) this.setTheme(id, 'random')
  },

  /** Смена при переходе между страницами (если стиль не зафиксирован). */
  randomizeOnNavigate() {
    if (!state.locked) this.randomize()
  },

  /** Вернуться к фирменной теме Volt. */
  reset() {
    this.setTheme('volt', 'user')
  },

  setLocked(locked: boolean) {
    try {
      localStorage.setItem(LOCK_KEY, locked ? '1' : '0')
    } catch {
      /* не критично */
    }
    commit({ ...state, locked })
  },
}

export const useStyleState = () => useSyncExternalStore(themeStore.subscribe, themeStore.get, themeStore.get)

export const styleLabel = (id: string) => themeVariantsFor('light').find((v) => v.id === id)?.label ?? id
