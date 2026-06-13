'use client'

import { useState } from 'react'
import { FileText, FileCheck, UserPlus, BarChart3, Receipt, Package } from 'lucide-react'
import { cn } from '@/lib/utils'

// ========== 导入 SVG 素材 ==========
import recentListSvg from '@/assets/workbench/recent-list.svg'

// ========== 图标 Key 映射 ==========
export type RecentItemKey = 'file' | 'contract' | 'user' | 'chart' | 'receipt' | 'package'

const RECENT_ICON_MAP: Record<RecentItemKey, typeof FileText> = {
  file: FileText,
  contract: FileCheck,
  user: UserPlus,
  chart: BarChart3,
  receipt: Receipt,
  package: Package,
}

// ========== RecentItem Props ==========
export interface RecentItemProps {
  /** 标题 */
  title: string
  /** 时间描述 */
  time: string
  /** 图标 key */
  iconKey: RecentItemKey
  /** 图标容器背景色 */
  iconBg?: string
  /** 图标颜色 */
  iconColor?: string
  /** 是否高亮激活 */
  active?: boolean
  /** 点击回调 */
  onClick?: () => void
  /** 附加 className */
  className?: string
}

/** 选中态样式常量 */
const ACTIVE_BG = '#f0f6ff'
const ACTIVE_ICON = '#0274ff'

// ========== RecentItem（可复用的最近使用项） ==========
export function RecentItem({
  title,
  time,
  iconKey,
  iconBg = '#f5f7fa',
  iconColor = '#64748b',
  active,
  onClick,
  className,
}: RecentItemProps) {
  const Icon = RECENT_ICON_MAP[iconKey]

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-4 rounded-lg p-0 transition-all hover:bg-[#f8fafc]',
        className,
      )}
      style={{
        backgroundColor: active ? '#FFF' : undefined,
        border: active ? '1px solid #0274FF' : '1px solid transparent',
        filter: active ? 'drop-shadow(0 6px 6px rgba(2, 116, 255, 0.10))' : undefined,
      }}
    >
      <div
        className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-lg transition-colors"
        style={{ backgroundColor: active ? ACTIVE_BG : iconBg }}
      >
        <Icon
          className={cn('h-[26px] w-[26px] transition-colors', active && 'scale-110')}
          style={{ color: active ? ACTIVE_ICON : iconColor }}
        />
      </div>
      <div className="flex flex-col gap-[2px] overflow-hidden text-left">
        <span
          className="truncate text-[14px] font-medium leading-[23px] transition-colors"
          style={{ color: active ? ACTIVE_ICON : '#101828' }}
        >
          {title}
        </span>
        <span
          className="text-[12px] font-normal leading-[23px]"
          style={{ color: '#8f9eb2' }}
        >
          {time}
        </span>
      </div>
    </button>
  )
}

// ========== RecentList Tab 类型 ==========
export type RecentTab = 'apps' | 'functions'

// ========== RecentList Props ==========
export interface RecentListProps {
  /** 区域标题 */
  title?: string
  /** 当前激活的 Tab */
  activeTab?: RecentTab
  /** Tab 切换回调 */
  onTabChange?: (tab: RecentTab) => void
  /** 最近使用数据列表 */
  items: RecentItemProps[]
  /** 外部控制选中索引 */
  activeIndex?: number | null
  /** 选中回调 */
  onActiveChange?: (index: number | null) => void
  /** 附加 className */
  className?: string
}

// ========== RecentList（最近使用区域） ==========
export function RecentList({
  title = '最近使用',
  activeTab: controlledTab,
  onTabChange,
  items,
  activeIndex: controlledIndex,
  onActiveChange,
  className,
}: RecentListProps) {
  const [internalTab, setInternalTab] = useState<RecentTab>('apps')
  const [internalIndex, setInternalIndex] = useState<number | null>(null)
  const activeTab = controlledTab ?? internalTab
  const activeIndex = controlledIndex ?? internalIndex

  const handleTabChange = (tab: RecentTab) => {
    setInternalTab(tab)
    onTabChange?.(tab)
  }

  const handleSelect = (index: number) => {
    setInternalIndex(index)
    onActiveChange?.(index)
  }

  return (
    <div
      className={cn('rounded-xl bg-white p-5 shadow-sm', className)}
    >
      {/* ===== 标题栏 ===== */}
      <div className="mb-4 flex items-center gap-8">
        <div className="flex items-center gap-2">
          <img
            src={recentListSvg.src}
            alt="最近使用"
            className="h-[26px] w-[26px]"
          />
          <h3
            className="text-[18px] font-bold leading-[22px]"
            style={{ color: '#101828' }}
          >
            {title}
          </h3>
        </div>

        {/* Tab 切换 */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => handleTabChange('apps')}
            className="relative pb-1 text-[14px] font-bold leading-[23px] transition-colors"
            style={{
              color: activeTab === 'apps' ? '#0274ff' : '#667180',
            }}
          >
            应用项
            {activeTab === 'apps' && (
              <span
                className="absolute bottom-0 left-0 h-[2px] w-full rounded-full"
                style={{ backgroundColor: '#0274ff' }}
              />
            )}
          </button>
          <button
            onClick={() => handleTabChange('functions')}
            className="relative pb-1 text-[14px] font-normal leading-[23px] transition-colors"
            style={{
              color: activeTab === 'functions' ? '#0274ff' : '#667180',
            }}
          >
            功能项
            {activeTab === 'functions' && (
              <span
                className="absolute bottom-0 left-0 h-[2px] w-full rounded-full"
                style={{ backgroundColor: '#0274ff' }}
              />
            )}
          </button>
        </div>
      </div>

      {/* ===== 分割线 ===== */}
      <div
        className="mb-4 h-px w-full"
        style={{ backgroundColor: '#e7eaf0' }}
      />

      {/* ===== 4 列网格 ===== */}
      {/* TODO: 对接后端最近使用 API，根据 activeTab 筛选应用/功能 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4" style={{ gap: '14px' }}>
        {items.map((item, index) => (
          <RecentItem
            key={`${item.title}-${index}`}
            title={item.title}
            time={item.time}
            iconKey={item.iconKey}
            iconBg={item.iconBg}
            iconColor={item.iconColor}
            active={activeIndex === index}
            onClick={() => handleSelect(index)}
          />
        ))}
      </div>
    </div>
  )
}
