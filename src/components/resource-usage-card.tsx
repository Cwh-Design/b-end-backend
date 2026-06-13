'use client'

import type { ResourceUsageItem } from '@/mock/data-center2'

/**
 * 资源使用卡片 — 数据中心页2
 *
 * 设计稿：
 * 卡片背景为浅蓝色（带右上角装饰背景图）
 * 左侧：白色圆角方块 + 蓝色图标
 * 中间：标题(CPU/内存/存储) + 单位 + "已申请" + 数字（横向）
 * 右侧：水平绿色进度条 + "近7天平均利用率" + 百分比
 */

// ========== 图标映射 ==========
const ICON_MAP: Record<ResourceUsageItem['type'], string> = {
  cpu: '/data-center2/icon-cpu.svg',
  memory: '/data-center2/icon-memory.svg',
  storage: '/data-center2/icon-storage.svg',
}

interface ResourceUsageCardProps {
  data: ResourceUsageItem
}

export function ResourceUsageCard({ data }: ResourceUsageCardProps) {
  const barColor = '#1AD093'
  const percent = Math.max(0, Math.min(100, data.utilization))

  return (
    <div
      className="relative overflow-hidden transition-shadow hover:shadow-[0_4px_8px_0_rgba(128,153,187,0.20)]"
      style={{
        borderRadius: '6px',
        padding: '20px 24px',
        // 卡片本体背景：从白色渐变到浅蓝透明
        background:
          'linear-gradient(90deg, #FFF 14.86%, rgba(190, 217, 255, 0.00) 100%)',
        border: '1.5px solid #DDE2EB',
      }}
    >
      {/* 右上角装饰背景图（设计稿切图） */}
      <img
        src="/data-center2/bg-usage.png"
        alt=""
        className="pointer-events-none absolute right-0 top-0 h-full select-none opacity-90"
        style={{ width: '100%', objectFit: 'fill', objectPosition: 'right top' }}
      />

      <div className="relative z-10 flex items-center gap-4">
        {/* 左侧白色圆角方块 + 蓝色图标 */}
        <div
          className="flex shrink-0 items-center justify-center"
          style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#F0F7FF',
            borderRadius: '6px',
          }}
        >
          <img
            src={ICON_MAP[data.type]}
            alt={data.title}
            style={{ width: '34px', height: '38px', flex: '0 1 auto' }}
          />
        </div>

        {/* 中间：标题 + 单位 + 已申请 */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-baseline gap-1">
            <span
              className="text-[18px] font-bold leading-none"
              style={{ color: '#101828' }}
            >
              {data.title}
            </span>
            <span className="text-[14px]" style={{ color: '#8a9ab3' }}>
              ({data.unit})
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[14px]" style={{ color: '#667180' }}>
              已申请
            </span>
            <span
              className="text-[20px] font-bold leading-none"
              style={{ color: '#101828' }}
            >
              {data.applied}
            </span>
          </div>
        </div>

        {/* 右侧：进度条 + 利用率 */}
        <div
          className="ml-auto flex flex-1 items-center gap-3"
          style={{ maxWidth: '340px' }}
        >
          <div
            className="h-1.5 flex-1 overflow-hidden rounded-full"
            style={{ backgroundColor: '#C3D5F8' }}
          >
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${percent}%`,
                backgroundColor: barColor,
              }}
            />
          </div>
          <span className="shrink-0 text-[14px]" style={{ color: '#667180' }}>
            近7天平均利用率
          </span>
          <span
            className="shrink-0 text-[16px] font-bold"
            style={{ color: '#101828', minWidth: '46px', textAlign: 'right' }}
          >
            {data.utilization}%
          </span>
        </div>
      </div>
    </div>
  )
}
