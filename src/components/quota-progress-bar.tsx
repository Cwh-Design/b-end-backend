'use client'

import type { QuotaRow } from '@/mock/data-center2'

/**
 * 配额三段堆叠进度条 — 数据中心页2
 *
 * 设计稿结构：
 * 顶部：维度名称（如 "实例数"）+ 总配额数字（如 "10000"）
 * 中部：水平堆叠进度条 —— 深蓝(已使用) + 浅蓝(已分配) + 浅灰(剩余配额)
 * 底部：图例 —— 三个彩色方块 + 数字标签
 */

interface QuotaProgressBarProps {
  data: QuotaRow
}

export function QuotaProgressBar({ data }: QuotaProgressBarProps) {
  // 三段百分比
  const total = data.quota || 1
  const usedPct = Math.min(100, (data.used / total) * 100)
  const allocatedPct = Math.min(100 - usedPct, (data.allocated / total) * 100)
  const remainPct = Math.max(0, 100 - usedPct - allocatedPct)

  return (
    <div className="flex flex-col" style={{ gap: '8px' }}>
      {/* 顶部：维度名 + 总配额 */}
      <div className="flex items-center gap-2">
        <span
          className="text-[14px]"
          style={{ color: '#667180', minWidth: '40px' }}
        >
          {data.label}
        </span>
        <span
          className="text-[16px] font-bold"
          style={{ color: '#101828' }}
        >
          {data.quota.toLocaleString()}
        </span>
      </div>

      {/* 中部：堆叠进度条 */}
      <div
        className="flex h-2 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: '#E4E7EC' }}
      >
        <div
          className="h-full transition-all"
          style={{ width: `${usedPct}%`, backgroundColor: '#136AF8' }}
        />
        <div
          className="h-full transition-all"
          style={{ width: `${allocatedPct}%`, backgroundColor: '#69B1FF' }}
        />
        <div
          className="h-full transition-all"
          style={{ width: `${remainPct}%`, backgroundColor: 'transparent' }}
        />
      </div>

      {/* 底部图例 */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
        <LegendItem color="#136AF8" label="已使用" value={data.used} />
        <LegendItem
          color="#69B1FF"
          label="已分配"
          value={data.allocated.toLocaleString()}
        />
        <LegendItem
          color="#E4E7EC"
          label="配额"
          value={data.quota.toLocaleString()}
        />
      </div>
    </div>
  )
}

// ========== 图例项 ==========
function LegendItem({
  color,
  label,
  value,
}: {
  color: string
  label: string
  value: number | string
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className="inline-block h-2.5 w-2.5 rounded-[1px]"
        style={{ backgroundColor: color }}
      />
      <span className="text-[13px]" style={{ color: '#667180' }}>
        {label}
      </span>
      <span className="text-[13px] font-medium" style={{ color: '#101828' }}>
        {value}
      </span>
    </div>
  )
}
