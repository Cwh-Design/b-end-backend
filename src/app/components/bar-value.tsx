'use client'

/**
 * BarValue — 进度条 + 数值
 *
 * 来源：data-center/page.tsx 内的 BarValue，应用中心页2 也要用，抽出共享。
 * 视觉：左侧浅灰底进度条，右侧加粗数字
 *
 * 进度条宽度：默认 'fill'（自适应铺满单元格剩余宽度，数字自动靠右）
 *             也可传具体像素值锁死宽度（数据中心页1 等场景需要 160px 固定）
 */

interface BarValueProps {
  value: number
  /** 占满 100% 的最大值 */
  max: number
  /** 进度条颜色，默认蓝色 */
  color?: string
  /** 进度条宽度：'fill' 自适应铺满 / 具体像素数值 */
  barWidth?: number | 'fill'
  /** 整体水平对齐（仅对固定宽度生效）：left | right */
  align?: 'left' | 'right'
}

export function BarValue({
  value,
  max,
  color = '#0274ff',
  barWidth = 160,
  align = 'left',
}: BarValueProps) {
  const percent = Math.max(4, Math.min(100, (value / max) * 100))
  const fill = barWidth === 'fill'
  return (
    <div
      className={`flex items-center gap-3 ${
        fill ? '' : align === 'right' ? 'justify-end' : ''
      }`}
    >
      <div
        className={`h-1.5 overflow-hidden rounded-full bg-[#f1f4f9] ${fill ? 'flex-1' : 'shrink-0'}`}
        style={fill ? undefined : { width: `${barWidth}px` }}
      >
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
      <span
        className="min-w-[36px] shrink-0 text-right text-[14px] font-bold"
        style={{ color: '#101828' }}
      >
        {value}
      </span>
    </div>
  )
}
