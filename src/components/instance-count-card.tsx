'use client'

import type { InstanceCountItem } from '@/mock/data-center2'

/**
 * 资源实例小卡片 — 数据中心页2
 *
 * 设计稿：左侧蓝色图标(切图) + 右侧数字（大字号）+ 名称
 * 用于：虚拟机 / 云硬盘 / 弹性IP / 虚拟私有云
 */

// ========== 图标映射 ==========
const ICON_MAP: Record<InstanceCountItem['type'], string> = {
  vm: '/data-center2/icon-vm.svg',
  disk: '/data-center2/icon-disk.svg',
  eip: '/data-center2/icon-eip.svg',
  vpc: '/data-center2/icon-vpc.svg',
}

interface InstanceCountCardProps {
  data: InstanceCountItem
}

export function InstanceCountCard({ data }: InstanceCountCardProps) {
  return (
    <div
      className="flex items-center transition-shadow hover:shadow-[0_4px_6px_0_rgba(128,153,187,0.20)]"
      style={{
        borderRadius: '6px',
        padding: '14px 16px',
        border: '1px solid #CFD8E5',
        background: 'linear-gradient(270deg, #FFF 0%, #E8F0FA 100%)',
        gap: '14px',
      }}
    >
      {/* 左侧白色圆角方块 + 图标 */}
      <div
        className="flex shrink-0 items-center justify-center"
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '4px',
          backgroundColor: '#FFFFFF',
        }}
      >
        <img
          src={ICON_MAP[data.type]}
          alt={data.name}
          style={{ width: '32px', height: '32px' }}
        />
      </div>

      <div className="flex min-w-0 flex-col gap-1">
        <span
          className="text-[22px] font-bold leading-none"
          style={{ color: '#101828', paddingBottom: '0px' }}
        >
          {data.count}
        </span>
        <span className="text-[13px]" style={{ color: '#667180' }}>
          {data.name}
        </span>
      </div>
    </div>
  )
}
