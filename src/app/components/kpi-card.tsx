'use client'

/**
 * KpiCard — 通用 KPI 统计卡片
 *
 * 用于多个页面的"图标 + 标题 + 大数字 + 趋势"四联卡：
 *   - 数据中心页1：iconVariant='gradient' (64×64 蓝色渐变 + 白色 icon)
 *   - 应用中心页2：iconVariant='soft'    (48×48 浅蓝色 + 蓝色 icon)
 *   - 报表中心 / 请假管理：iconVariant='gradient' + trendVariant='count'
 *
 * 设计稿上各 KPI 卡视觉差异较小，差异点用 props 控制：
 *   1) 图标风格 iconVariant：gradient | soft
 *   2) 趋势展示 trendVariant：percent (↑15%) | count (15次) | none
 *   3) 趋势文案前缀 trendLabel：默认"较昨日"
 */

interface KpiCardProps {
  /** 标题，例如「对象总数(个)」 */
  title: string
  /** 主数字 */
  value: number | string
  /** 数字后单位（可选，例如 %） */
  unit?: string
  /** 趋势百分比 / 次数；正数 ↑，负数 ↓；undefined 表示不展示 */
  trend?: number
  /** 趋势文案前缀，默认"较昨日" */
  trendLabel?: string
  /** 趋势展示模式 */
  trendVariant?: 'percent' | 'count' | 'none'
  /** 图标 src */
  iconSrc: string
  /** 图标渲染风格 */
  iconVariant?: 'gradient' | 'soft'
}

export function KpiCard({
  title,
  value,
  unit,
  trend,
  trendLabel = '较昨日',
  trendVariant = 'percent',
  iconSrc,
  iconVariant = 'soft',
}: KpiCardProps) {
  // ===== 趋势配色：上涨为红（告警类语义），下跌为绿 =====
  const trendUp = typeof trend === 'number' && trend > 0
  const trendDown = typeof trend === 'number' && trend < 0
  const trendColor = trendUp ? '#f7320d' : trendDown ? '#19bd6b' : '#667180'
  const trendArrow = trendUp ? '↑' : trendDown ? '↓' : ''

  // ===== 趋势文案 =====
  let trendText = ''
  if (typeof trend === 'number' && trendVariant !== 'none') {
    if (trendVariant === 'percent') {
      trendText = `${trendArrow} ${Math.abs(trend)}%`
    } else if (trendVariant === 'count') {
      trendText = `${trendArrow} ${Math.abs(trend)}次`
    }
  }

  // ===== 图标渲染 =====
  const iconBlock =
    iconVariant === 'gradient' ? (
      // 数据中心页1 风格：64×64 蓝色渐变 + 白色 icon
      <div
        className="flex h-[64px] w-[64px] shrink-0 items-center justify-center"
        style={{
          borderRadius: '8px',
          background: 'linear-gradient(180deg, #1476FF 0%, #6DC2FF 100%)',
        }}
      >
        <img
          src={iconSrc}
          alt={title}
          className="h-11 w-11"
          style={{
            filter: 'drop-shadow(0 5px 2px rgba(0, 57, 115, 0.20))',
          }}
        />
      </div>
    ) : (
      // 应用中心页2 风格：56×56 浅蓝色 + 蓝色 icon
      <div
        className="flex h-[56px] w-[56px] shrink-0 items-center justify-center"
        style={{
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #E5F0FE 0%, #DCE9FB 100%)',
        }}
      >
        <img src={iconSrc} alt={title} className="h-7 w-7" />
      </div>
    )

  return (
    <div
      className="flex items-center gap-4 bg-white p-5 transition-shadow hover:shadow-[0_4px_6px_0_rgba(128,153,187,0.20)]"
      style={{
        border: '2px solid #ffffff',
        borderRadius: '12px',
      }}
    >
      {iconBlock}

      {/* 右侧数据 */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-[14px]" style={{ color: '#667180' }}>
          {title}
        </span>
        <div className="flex items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-1">
            <span
              className="text-[26px] font-bold leading-[34px]"
              style={{ color: '#101828' }}
            >
              {typeof value === 'number' ? value.toLocaleString() : value}
            </span>
            {unit && (
              <span className="text-[14px]" style={{ color: '#101828' }}>
                {unit}
              </span>
            )}
          </div>
          {trendText && (
            <div className="flex items-center gap-1.5 pr-1">
              <span className="text-[13px]" style={{ color: '#8a9ab3' }}>
                {trendLabel}
              </span>
              <span
                className="text-[14px] font-bold"
                style={{ color: trendColor }}
              >
                {trendText}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
