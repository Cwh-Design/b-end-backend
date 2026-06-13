'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

// ========== 导入 SVG 素材 ==========
import appFavoritesSvg from '@/assets/workbench/app-favorites.svg'
import appTableSvg from '@/assets/workbench/app-table.svg'
import appApplicationSvg from '@/assets/workbench/app-application.svg'
import appFinanceSvg from '@/assets/workbench/app-finance.svg'
import appSalesSvg from '@/assets/workbench/app-sales.svg'
import appBiddingSvg from '@/assets/workbench/app-bidding.svg'
import appDevSvg from '@/assets/workbench/app-dev.svg'

// ========== 图标 Key 映射 ==========
export type AppIconKey = 'table' | 'app' | 'finance' | 'sales' | 'contract' | 'dev'

const APP_ICON_MAP: Record<AppIconKey, string> = {
  table: appTableSvg.src,
  app: appApplicationSvg.src,
  finance: appFinanceSvg.src,
  sales: appSalesSvg.src,
  contract: appBiddingSvg.src,
  dev: appDevSvg.src,
}

// ========== AppIconCard Props ==========
export interface AppIconCardProps {
  /** 应用名称 */
  name: string
  /** 图标 key */
  iconKey: AppIconKey
  /** 图标背景色（非选中态） */
  bgColor?: string
  /** 是否选中 */
  active?: boolean
  /** 点击回调 */
  onClick?: () => void
  /** 附加 className */
  className?: string
}

/** 选中态样式常量 */
const ACTIVE_BG = '#f0f6ff'
const ACTIVE_ICON = '#0274ff'
const DEFAULT_BG = '#f5f7fa'

// ========== AppIconCard（可复用的应用图标卡片） ==========
export function AppIconCard({
  name,
  iconKey,
  bgColor = DEFAULT_BG,
  active = false,
  onClick,
  className,
}: AppIconCardProps) {
  const iconSrc = APP_ICON_MAP[iconKey]

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-center gap-[13px] transition-opacity hover:opacity-80',
        className,
      )}
    >
      <div
        className="flex h-[48px] w-[48px] items-center justify-center transition-all"
        style={{
          borderRadius: '6px',
          border: active ? '1px solid #0274FF' : '1px solid transparent',
          backgroundColor: active ? '#F0F6FF' : bgColor,
          boxShadow: active ? '0 6px 6px 0 rgba(2, 116, 255, 0.10)' : 'none',
        }}
      >
        {iconSrc && (
          <img
            src={iconSrc}
            alt={name}
            className="h-[22px] w-[22px]"
            style={{
              filter: active
                ? 'brightness(0) saturate(100%) invert(27%) sepia(83%) saturate(6037%) hue-rotate(207deg) brightness(100%) contrast(106%)'
                : 'brightness(0) saturate(100%) invert(55%) sepia(12%) saturate(620%) hue-rotate(178deg) brightness(94%) contrast(85%)',
            }}
          />
        )}
      </div>
      <span
        className="text-[14px] font-medium leading-[23px] text-center transition-colors"
        style={{ color: active ? ACTIVE_ICON : '#101828' }}
      >
        {name}
      </span>
    </button>
  )
}

// ========== AppFavorites Props ==========
export interface AppFavoritesProps {
  /** 区域标题 */
  title?: string
  /** 应用列表 */
  apps: AppIconCardProps[]
  /** 是否显示"添加"按钮 */
  showAdd?: boolean
  /** 外部控制选中索引 */
  activeIndex?: number
  /** 选中回调 */
  onActiveChange?: (index: number) => void
  /** 附加 className */
  className?: string
}

// ========== AppFavorites（应用收藏区域） ==========
export function AppFavorites({
  title = '应用收藏',
  apps,
  showAdd = true,
  activeIndex: controlledIndex,
  onActiveChange,
  className,
}: AppFavoritesProps) {
  const [internalIndex, setInternalIndex] = useState<number | null>(0)
  const activeIndex = controlledIndex ?? internalIndex

  const handleSelect = (index: number) => {
    setInternalIndex(index)
    onActiveChange?.(index)
  }

  return (
    <div
      className={cn('rounded-xl bg-white p-5 shadow-sm', className)}
    >
      {/* ===== 标题栏 ===== */}
      <div className="mb-4 flex items-center gap-2">
        <img
          src={appFavoritesSvg.src}
          alt="应用收藏"
          className="h-[26px] w-[26px]"
        />
        <h3
          className="text-[18px] font-bold leading-[23px]"
          style={{ color: '#101828' }}
        >
          {title}
        </h3>
      </div>

      {/* ===== 分割线 ===== */}
      <div
        className="mb-4 h-px w-full"
        style={{ backgroundColor: '#e7eaf0' }}
      />

      {/* ===== 应用卡片横向排列 ===== */}
      {/* TODO: 对接收藏应用点击跳转 */}
      <div className="flex flex-wrap items-start gap-x-10 gap-y-4">
        {apps.map((app, index) => (
          <AppIconCard
            key={`${app.name}-${index}`}
            name={app.name}
            iconKey={app.iconKey}
            bgColor={app.bgColor}
            active={activeIndex === index}
            onClick={() => handleSelect(index)}
          />
        ))}

        {/* 添加按钮 */}
        {showAdd && (
          <button
            className="flex flex-col items-center gap-[13px] transition-opacity hover:opacity-70"
            // TODO: 对接添加应用弹窗
          >
            <div
              className="flex h-[48px] w-[48px] items-center justify-center rounded-xl border-2 border-dashed"
              style={{ borderColor: '#d8e2f0' }}
            >
              <Plus className="h-[19px] w-[19px]" style={{ color: '#8a9ab3' }} />
            </div>
            <span
              className="text-[14px] font-medium leading-[23px]"
              style={{ color: '#8a9ab3' }}
            >
              添加
            </span>
          </button>
        )}
      </div>
    </div>
  )
}
