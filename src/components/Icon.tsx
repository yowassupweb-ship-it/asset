import type { SVGProps } from 'react'
import type { IconName } from '../content/services'

/**
 * Временные иконки (SF Symbols-подобные, 1.75px stroke).
 * Финальные — из docs/ASSETS-BRIEF.md: положите PNG/SVG в public/brand/
 * и замените <ServiceIcon /> на <img> (см. README).
 */

type P = SVGProps<SVGSVGElement>

const base: P = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export const BoltPath = 'M13.4 2.2 4.8 13.4h6.1l-1 8.4 9.2-11.6h-6.2z'

export function IconBolt(p: P) {
  return (
    <svg {...p} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d={BoltPath} />
    </svg>
  )
}

export function IconSocial(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H11l-4.2 3.6c-.5.4-1.3.1-1.3-.6V16h-.0A2.5 2.5 0 0 1 4 13.5z" />
      <path d="M8.5 8.5h7M8.5 11.5h4" />
    </svg>
  )
}

export function IconWeb(p: P) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
      <path d="m10 14 2 2 3-3.5" />
    </svg>
  )
}

export function IconAutomation(p: P) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="3.5" width="6.5" height="6.5" rx="2" />
      <rect x="14.5" y="14" width="6.5" height="6.5" rx="2" />
      <path d="M9.5 6.75H14a3 3 0 0 1 3 3V14" />
      <path d="M3 17.25h4.5M5.25 15v4.5" />
    </svg>
  )
}

export function IconDesign(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3.2 20.8 12 12 20.8c-.6.6-1.6.6-2.2 0L3.2 14.2c-.6-.6-.6-1.6 0-2.2z" />
      <path d="M9.5 9.5 6 6M14 6h.01" />
      <circle cx="12" cy="12" r="1.4" />
    </svg>
  )
}

export function IconSun(p: P) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </svg>
  )
}

export function IconMoon(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" />
    </svg>
  )
}

export function IconArrow(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function IconCheck(p: P) {
  return (
    <svg {...base} strokeWidth={2.25} {...p}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  )
}

export function IconPlus(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function IconMenu(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M4 8h16M4 16h16" />
    </svg>
  )
}

export function IconClose(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  )
}

export function ServiceIcon({ name, ...p }: { name: IconName } & P) {
  if (name === 'social') return <IconSocial {...p} />
  if (name === 'web') return <IconWeb {...p} />
  if (name === 'design') return <IconDesign {...p} />
  return <IconAutomation {...p} />
}
