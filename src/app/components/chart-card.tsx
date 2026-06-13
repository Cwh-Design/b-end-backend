'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

// ========== ChartCard Props ==========
export interface ChartCardProps {
  /** 卡片标题 */
  title: string
  /** 标题旁的图标（可选） */
  icon?: ReactNode
  /** 标题右侧操作区（如时间筛选下拉） */
  actions?: ReactNode
  /** 图表或内容 */
  children: ReactNode
  /** 底部图例（可选） */
  legend?: ReactNode
  /** 附加 className */
  className?: string
  /** 内容区 className */
  contentClassName?: string
}

/**
 * ChartCard — 通用图表卡片容器
 *
 * 用于数据中心、报表中心等页面的图表展示。
 * 复用与 AppFavorites / TodoList 一致的卡片结构：
 * 标题栏 + 分割线 + 内容区
 */
export function ChartCard({
  title,
  icon,
  actions,
  children,
  legend,
  className,
  contentClassName,
}: ChartCardProps) {
  return (
    <div
      className={cn('flex flex-col rounded-xl bg-white p-5 shadow-sm', className)}
    >
      {/* ===== 标题栏 ===== */}
      <div className="mb-4 flex items-center">
        {/* 左侧：图标 + 标题 */}
        <div className="flex items-center gap-2">
          {icon && (
            <div
              className="flex h-[26px] w-[26px] items-center justify-center rounded-md"
              style={{ backgroundColor: '#f0f6ff' }}
            >
              {icon}
            </div>
          )}
          <h3
            className="text-[18px] font-bold leading-[23px]"
            style={{ color: '#101828' }}
          >
            {title}
          </h3>
        </div>

        {/* 右侧：操作区 */}
        {actions && <div className="ml-auto">{actions}</div>}
      </div>

      {/* ===== 分割线 ===== */}
      <div
        className="mb-4 h-px w-full shrink-0"
        style={{ backgroundColor: '#e7eaf0' }}
      />

      {/* ===== 图表内容区 ===== */}
      <div className={cn('flex-1', contentClassName)}>
        {children}
      </div>

      {/* ===== 底部图例 ===== */}
      {legend && (
        <div className="mt-4 flex items-center justify-center gap-6">
          {legend}
        </div>
      )}
    </div>
  )
}
