'use client'

import { cn } from '@/lib/utils'

// ========== ProcessStatsCard Props ==========
export interface ProcessStatsCardProps {
  /** 卡片标题，如"我发起的"、"待处理" */
  title: string
  /** 统计数值 */
  value: number
  /** 环比变化百分比，正数↑负数↓ */
  trend: number
  /** 变化描述文案，如"较昨日" */
  trendLabel?: string
  /** 数值颜色（Figma 中每张卡片数字颜色不同） */
  valueColor: string
  /** 右下角背景图片 URL */
  bgImage?: string
  /** 附加 className */
  className?: string
}

// ========== ProcessStatsCard 组件 ==========
export function ProcessStatsCard({
  title,
  value,
  trend,
  trendLabel = '较昨日',
  valueColor,
  bgImage,
  className,
}: ProcessStatsCardProps) {
  // 趋势颜色：正向变化（数值上涨）在 Figma 中用红色，下降用绿色
  const trendUp = trend > 0
  const trendColor = trendUp ? '#f7320d' : '#19bd6b'
  const trendArrow = trendUp ? '↑' : '↓'

  return (
    <div
      className={cn(
        'relative flex flex-col overflow-hidden shadow-sm',
        className,
      )}
      style={{
        minHeight: '260px',
        borderRadius: '16px',
        border: '2px solid #FFF',
        background: 'linear-gradient(245deg, #EBF1FF -6.19%, #FFF 51.1%)',
        padding: '20px 20px 20px 24px',
      }}
    >
      {/* ===== 标题 ===== */}
      <span
        className="relative z-10 text-[18px] font-medium leading-[30px]"
        style={{ color: '#101828' }}
      >
        {title}
      </span>

      {/* ===== 数值 ===== */}
      <span
        className="relative z-10 text-[38px] font-bold leading-[44px]" style={{ marginTop: '28px', color: valueColor }}
      >
        {value}
      </span>

      {/* ===== 趋势 ===== */}
      <div className="relative z-10 mt-2 flex items-center gap-1">
        <span
          className="text-[14px] font-normal"
          style={{ color: '#53647c' }}
        >
          {trendLabel}
        </span>
        <span
          className="text-[16px] font-bold"
          style={{ color: trendColor }}
        >
          {trendArrow} {Math.abs(trend)}%
        </span>
      </div>

      {/* ===== 右下角背景图片 ===== */}
      {bgImage && (
        <img
          src={bgImage}
          alt=""
          className="pointer-events-none absolute object-cover" style={{ right: '14px', bottom: '4px' }}
        />
      )}
    </div>
  )
}
