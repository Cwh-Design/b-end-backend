'use client'

import { QuotaProgressBar } from './quota-progress-bar'
import type { QuotaGroup as QuotaGroupType } from '@/mock/data-center2'

/**
 * 配额分组容器 — 数据中心页2
 *
 * 设计稿结构：
 * 左侧：浅蓝色窄列（约 28px 宽），蓝色竖排文字标签
 * 右侧：3 行 QuotaProgressBar（实例数 / CPU / 内存）
 */

interface QuotaGroupProps {
  data: QuotaGroupType
}

export function QuotaGroup({ data }: QuotaGroupProps) {
  return (
    <div className="flex items-stretch gap-4">
      {/* 左侧浅蓝色竖排标签 */}
      <div
        className="flex items-center justify-center rounded-md"
        style={{
          width: '40px',
          backgroundColor: '#EAF1FE',
          padding: '12px 4px',
          flex: '0 1 auto',
        }}
      >
        <span
          className="text-[14px] font-medium"
          style={{
            color: '#136AF8',
            writingMode: 'vertical-rl',
            letterSpacing: '4px',
          }}
        >
          {data.label}
        </span>
      </div>

      {/* 右侧 3 行进度条 */}
      <div className="flex flex-1 flex-col justify-between gap-[22px] py-1 min-w-0">
        {data.rows.map((row, idx) => (
          <QuotaProgressBar key={idx} data={row} />
        ))}
      </div>
    </div>
  )
}
