'use client'

import type { TopStatCard as TopStatCardType } from '@/mock/data-center2'

/**
 * 顶部统计卡片 — 数据中心页2
 *
 * 设计稿：左侧六边形蓝色图标(切图) + 中间标题 + 右侧数字
 */

// ========== 图标映射（指向 public/data-center2 下的设计稿切图 PNG） ==========
const ICON_MAP: Record<TopStatCardType['iconKey'], string> = {
  tenant: '/data-center2/icon-tenant.png',
  'cloud-app': '/data-center2/icon-cloud-app.png',
  idle: '/data-center2/icon-idle.png',
  bottleneck: '/data-center2/icon-bottleneck.png',
  recycle: '/data-center2/icon-recycle.png',
}

// ========== 图标尺寸映射（每张 PNG 原始比例不同） ==========
const ICON_SIZE_MAP: Record<
  TopStatCardType['iconKey'],
  { width: string; height: string }
> = {
  tenant: { width: '46px', height: '51px' },
  'cloud-app': { width: '46px', height: '51px' },
  idle: { width: '46px', height: '51px' },
  bottleneck: { width: '50px', height: '51px' },
  recycle: { width: '50px', height: '51px' },
}

interface TopStatCardProps {
  data: TopStatCardType
}

export function TopStatCard({ data }: TopStatCardProps) {
  return (
    <div
      className="flex items-center bg-white transition-shadow hover:shadow-[0_4px_6px_0_rgba(128,153,187,0.20)]"
      style={{
        borderRadius: '12px',
        padding: '20px 28px',
        border: '2px solid #ffffff',
        gap: '18px',
      }}
    >
      {/* 左侧六边形图标（设计稿切图） */}
      <img
        src={ICON_MAP[data.iconKey]}
        alt={data.title}
        className="shrink-0"
        style={{
          width: ICON_SIZE_MAP[data.iconKey].width,
          height: ICON_SIZE_MAP[data.iconKey].height,
        }}
      />

      {/* 右侧数据：标题 + 数字 */}
      <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
        <span className="text-[16px]" style={{ color: '#101828' }}>
          {data.title}
        </span>
        <span
          className="text-[24px] font-bold leading-none"
          style={{ color: '#101828', paddingRight: '8px' }}
        >
          {data.value}
        </span>
      </div>
    </div>
  )
}
