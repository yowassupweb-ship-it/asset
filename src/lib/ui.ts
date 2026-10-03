import type { CSSProperties } from 'react'

/** Задержка появления (stagger) через CSS-переменную --i. */
export const delay = (i: number): CSSProperties => ({ '--i': i }) as CSSProperties
