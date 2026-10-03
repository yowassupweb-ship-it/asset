import { useCallback, useEffect, useRef, useState } from 'react'
import type { Variant } from '../content/live'

type Phase = 'typing' | 'hold' | 'erase'

interface Options {
  /** Автозапуск печати. По умолчанию — если пользователь не просил уменьшить движение. */
  autoplay?: boolean
  startDelay?: number
}

const TYPE_MS = 24
const ERASE_MS = 14
const HOLD_MS = 3600

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * «Живой» код: печатает варианты по кругу, стирает, печатает следующий.
 * Пользователь может поставить на паузу и править текст руками.
 */
export function useLiveCode(variants: Variant[], { autoplay, startDelay = 700 }: Options = {}) {
  const reduce = prefersReducedMotion()
  const shouldPlay = autoplay ?? !reduce
  const [index, setIndex] = useState(0)
  const [text, setText] = useState(() => (shouldPlay ? '' : (variants[0]?.code ?? '')))
  const [phase, setPhase] = useState<Phase>('typing')
  const [playing, setPlaying] = useState(shouldPlay)
  const first = useRef(true)

  useEffect(() => {
    if (!playing) return
    const target = variants[index]?.code ?? ''
    let timer: number

    if (phase === 'typing') {
      if (text.length >= target.length) {
        timer = window.setTimeout(() => setPhase('hold'), 0)
      } else {
        const delay = first.current ? startDelay : TYPE_MS
        timer = window.setTimeout(() => {
          first.current = false
          // небольшие «рывки» делают печать живой; отступы и пробелы идут пачкой
          let n = 2 + Math.floor(Math.random() * 2)
          while (target[text.length + n - 1] === ' ' && text.length + n < target.length) n++
          setText(target.slice(0, text.length + n))
        }, delay)
      }
    } else if (phase === 'hold') {
      timer = window.setTimeout(() => setPhase('erase'), HOLD_MS)
    } else {
      if (text.length === 0) {
        timer = window.setTimeout(() => {
          setIndex((i) => (i + 1) % variants.length)
          setPhase('typing')
        }, 0)
      } else {
        // стираем построчно, как будто выделили и удалили
        timer = window.setTimeout(() => {
          const cut = text.lastIndexOf('\n', text.length - 2)
          setText(cut === -1 ? '' : text.slice(0, cut + 1))
        }, ERASE_MS * 5)
      }
    }
    return () => window.clearTimeout(timer)
  }, [playing, phase, text, index, variants, startDelay])

  /** Выбор варианта: перепечатываем с нуля (или сразу показываем при reduced motion). */
  const select = useCallback(
    (i: number) => {
      first.current = false
      setIndex(i)
      if (reduce) {
        setText(variants[i]?.code ?? '')
        setPlaying(false)
      } else {
        setText('')
        setPhase('typing')
        setPlaying(true)
      }
    },
    [variants, reduce],
  )

  const pause = useCallback(() => setPlaying(false), [])
  const toggle = useCallback(() => {
    setPlaying((p) => {
      if (!p) {
        // продолжаем: допечатываем текущий вариант
        setText((t) => (variants[index]?.code.startsWith(t) ? t : ''))
        setPhase('typing')
      }
      return !p
    })
  }, [index, variants])

  return { index, text, setText, playing, pause, toggle, select, phase, typing: playing && phase === 'typing' }
}

export type LiveCode = ReturnType<typeof useLiveCode>
