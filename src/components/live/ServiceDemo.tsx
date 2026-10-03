import type { ReactNode } from 'react'
import { brandVariants, flowVariants, planVariants, siteVariants, type Variant } from '../../content/live'
import type { ServiceId } from '../../content/services'
import { useLiveCode } from '../../hooks/useLiveCode'
import { highlightCss, highlightPlan, type Highlighter } from '../../lib/highlight'
import { BrandBoard } from './BrandBoard'
import { CodeWindow } from './CodeWindow'
import { FlowPreview } from './FlowPreview'
import { MiniSite } from './MiniSite'
import { PlanPreview } from './PlanPreview'

interface Config {
  variants: Variant[]
  fileName: string
  highlight: Highlighter
  label: string
  preview: (code: string) => ReactNode
}

const configs: Record<ServiceId, Config> = {
  smm: {
    variants: planVariants,
    fileName: 'контент-план.txt',
    highlight: highlightPlan,
    label: 'Редактор контент-плана',
    preview: (c) => <PlanPreview code={c} />,
  },
  web: {
    variants: siteVariants,
    fileName: 'layout.css',
    highlight: highlightCss,
    label: 'Редактор CSS макета',
    preview: (c) => <MiniSite code={c} />,
  },
  design: {
    variants: brandVariants,
    fileName: 'brand.css',
    highlight: highlightCss,
    label: 'Редактор CSS бренда',
    preview: (c) => <BrandBoard code={c} />,
  },
  automation: {
    variants: flowVariants,
    fileName: 'сценарий.flow',
    highlight: highlightPlan,
    label: 'Редактор сценария автоматизации',
    preview: (c) => <FlowPreview code={c} />,
  },
}

/** «Живая» демонстрация услуги: код слева переписывается и перестраивает превью справа. */
export function ServiceDemo({ id }: { id: ServiceId }) {
  const cfg = configs[id]
  const live = useLiveCode(cfg.variants)
  return (
    <div className="demo">
      <CodeWindow live={live} variants={cfg.variants} fileName={cfg.fileName} highlight={cfg.highlight} label={cfg.label} />
      <div className="demo__preview">{cfg.preview(live.preview)}</div>
    </div>
  )
}
