import { useCallback, useEffect, useRef, useState } from 'react'
import type { Variant } from '../content/live'

type Phase = 'typing' | 'hold' | 'erase'

interface Options {
  /** Автозапуск печати. По умолчанию — если пользователь не просил уменьшить движение. */
  autoplay?: boolean
  startDelay?: number
  /** Сколько первых вариантов проходит автопоказ (остальные — только по клику). */
  autoCount?: number
  /** С какого варианта начинать (например, тот, что сейчас применён к сайту). */
  initialIndex?: number
}

const TYPE_MS = 42
const ERASE_STEP_MS = 90
const HOLD_MS = 8000

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * «Живой» код: печатает варианты по кругу, стирает, печатает следующий.
 * Пользователь может поставить на паузу и править текст руками.
 */
export function useLiveCode(variants: Variant[], { autoplay, startDelay = 4000, autoCount, initialIndex = 0 }: Options = {}) {
  const reduce = prefersReducedMotion()
  const shouldPlay = autoplay ?? !reduce
  const [index, setIndex] = useState(initialIndex)
  // окно никогда не пустое: стартуем с первого варианта, дальше он стирается и идёт следующий
  const [text, setText] = useState(() => variants[initialIndex]?.code ?? '')
  const [phase, setPhase] = useState<Phase>(shouldPlay ? 'hold' : 'typing')
  const [playing, setPlaying] = useState(shouldPlay)
  // вне поля зрения / вкладка скрыта — печать приостановлена, но режим не меняется
  const [suspended, setSuspended] = useState(false)
  // последний полностью написанный вариант: именно он применяется к странице
  const [settled, setSettled] = useState(() => variants[initialIndex]?.code ?? '')
  const first = useRef(true)

  useEffect(() => {
    if (!playing || suspended) return
    const target = variants[index]?.code ?? ''
    let timer: number

    if (phase === 'typing') {
      if (text.length >= target.length) {
        timer = window.setTimeout(() => {
          setSettled(target)
          setPhase('hold')
        }, 0)
      } else {
        timer = window.setTimeout(() => {
          // небольшие «рывки» делают печать живой; отступы и пробелы идут пачкой
          let n = 1 + Math.floor(Math.random() * 2)
          while (target[text.length + n - 1] === ' ' && text.length + n < target.length) n++
          setText(target.slice(0, text.length + n))
        }, TYPE_MS)
      }
    } else if (phase === 'hold') {
      timer = window.setTimeout(() => {
        first.current = false
        setPhase('erase')
      }, first.current ? startDelay : HOLD_MS)
    } else {
      if (text.length === 0) {
        timer = window.setTimeout(() => {
          if (index + 1 >= (autoCount ?? variants.length)) {
            // один круг показан — возвращаемся к первому варианту и останавливаемся
            setIndex(0)
            setText(variants[0]?.code ?? '')
            setSettled(variants[0]?.code ?? '')
            setPlaying(false)
          } else {
            setIndex(index + 1)
          }
          setPhase('typing')
        }, 0)
      } else {
        // стираем построчно, как будто выделили и удалили
        timer = window.setTimeout(() => {
          const cut = text.lastIndexOf('\n', text.length - 2)
          setText(cut === -1 ? '' : text.slice(0, cut + 1))
        }, ERASE_STEP_MS)
      }
    }
    return () => window.clearTimeout(timer)
  }, [playing, suspended, phase, text, index, variants, startDelay, autoCount])

  /** Выбор варианта: перепечатываем с нуля (или сразу показываем при reduced motion). */
  const select = useCallback(
    (i: number) => {
      first.current = false
      setIndex(i)
      if (reduce) {
        setText(variants[i]?.code ?? '')
        setSettled(variants[i]?.code ?? '')
        setPlaying(false)
      } else {
        setText('')
        setPhase('typing')
        setPlaying(true)
      }
    },
    [variants, reduce],
  )

  /** Мгновенно показать вариант без печати (когда стиль сменили снаружи). */
  const show = useCallback(
    (i: number, code?: string) => {
      const next = code ?? variants[i]?.code ?? ''
      setIndex(i)
      setText(next)
      setSettled(next)
      setPhase('typing')
      setPlaying(false)
    },
    [variants],
  )

  const pause = useCallback(() => setPlaying(false), [])
  const toggle = useCallback(() => {
    setPlaying((p) => {
      if (!p) {
        // запуск: печатаем текущий вариант заново
        setText('')
        setPhase('typing')
      }
      return !p
    })
  }, [])

  const onEdit = useCallback((value: string) => {
    setText(value)
    setSettled(value)
  }, [])

  /** Для превью услуг: пока печатается — показываем только завершённые строки. */
  const lines = text.slice(0, text.lastIndexOf('\n') + 1)
  const preview = !playing ? text : phase === 'typing' ? lines : (variants[index]?.code ?? text)
  /** Для страницы целиком: меняется только когда вариант дописан. */
  const applied = playing ? settled : text

  return { index, text, onEdit, playing, pause, toggle, select, show, phase, preview, applied, setSuspended }
}

export type LiveCode = ReturnType<typeof useLiveCode>
