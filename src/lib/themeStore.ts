import { useSyncExternalStore } from 'react'
import { themeVariants } from '../content/live'
import { prepareCss } from './css'

/**
 * Общее хранилище «стиля сайта».
 * Источники: live — окно с кодом на главной, random — смена при переходе/по кнопке, reset — системный.
 */
export type StyleSource = 'live' | 'random' | 'reset'

interface State {
  id: string | null
  code: string
  source: StyleSource
  locked: boolean
}

const LOCK_KEY = 'asset-style-lock'

function readLock() {
  try {
    return localStorage.getItem(LOCK_KEY) === '1'
  } catch {
    return false
  }
}

let state: State = { id: null, code: '', source: 'reset', locked: typeof window !== 'undefined' && readLock() }
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
  el.textContent = prepareCss(code)
}

export const themeStore = {
  get: () => state,
  subscribe(l: () => void) {
    listeners.add(l)
    return () => {
      listeners.delete(l)
    }
  },
  /** Применить код (из окна редактора). */
  set(id: string | null, code: string, source: StyleSource) {
    if (state.code === code && state.id === id) return
    paint(code)
    commit({ ...state, id, code, source })
  },
  /** Случайный стиль, отличный от текущего. */
  randomize() {
    const pool = themeVariants.filter((v) => v.id !== state.id)
    const v = pool[Math.floor(Math.random() * pool.length)]
    if (v) this.set(v.id, v.code, 'random')
  },
  /** Смена при переходе между страницами (если стиль не зафиксирован). */
  randomizeOnNavigate() {
    if (!state.locked) this.randomize()
  },
  reset() {
    if (state.id === null && state.code === '') return
    paint('')
    commit({ ...state, id: null, code: '', source: 'reset' })
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

export const styleLabel = (id: string | null) => themeVariants.find((v) => v.id === id)?.label ?? 'Системный'
