'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

// ========== 列定义 ==========
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DataTableColumn<T = any> {
  /** 列标识 */
  key: string
  /** 列标题 */
  title: string
  /** 列宽度（可传 px 或百分比） */
  width?: string
  /** 自定义渲染 */
  render?: (value: unknown, row: T, index: number) => ReactNode
  /** 对齐方式 */
  align?: 'left' | 'center' | 'right'
}

// ========== DataTable Props ==========
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DataTableProps<T = any> {
  /** 表格数据 */
  data: T[]
  /** 列定义 */
  columns: DataTableColumn<T>[]
  /** 行唯一 key 字段名 */
  rowKey?: string
  /** 表格标题 */
  title?: string
  /** 标题旁的图标 */
  titleIcon?: ReactNode
  /** 标题右侧操作区 */
  titleActions?: ReactNode
  /** 空状态文案 */
  emptyText?: string
  /** 表格行 hover 回调 */
  onRowClick?: (row: T, index: number) => void
  /** 附加 className */
  className?: string
}

/**
 * DataTable — 通用数据表格组件
 *
 * 用于数据中心、报表中心、应用中心等页面的表格展示。
 * 表头使用浅蓝背景 (#f0f6ff)，表体行 hover 浅灰背景。
 */
export function DataTable<T>({
  data,
  columns,
  rowKey,
  title,
  titleIcon,
  titleActions,
  emptyText = '暂无数据',
  onRowClick,
  className,
}: DataTableProps<T>) {
  return (
    <div
      className={cn('flex flex-col rounded-2xl bg-white shadow-sm', className)}
      style={{ border: '2px solid #ffffff', padding: '20px' }}
    >
      {/* ===== 标题栏 ===== */}
      {title && (
        <div className="mb-4 flex items-center">
          <div className="flex items-center gap-2">
            {titleIcon && (
              <div
                className="flex h-[26px] w-[26px] items-center justify-center rounded-md"
                style={{ backgroundColor: '#f0f6ff' }}
              >
                {titleIcon}
              </div>
            )}
            <h3
              className="text-[20px] font-bold leading-[30px]"
              style={{ color: '#101828' }}
            >
              {title}
            </h3>
          </div>
          {titleActions && <div className="ml-auto">{titleActions}</div>}
        </div>
      )}

      {/* ===== 表格 ===== */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {/* 表头 */}
          <thead>
            <tr
              style={{ backgroundColor: '#f0f6ff', height: '44px' }}
            >
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 text-[16px] font-medium first:pl-5 last:pr-5"
                  style={{
                    width: col.width,
                    textAlign: col.align ?? 'left',
                    color: '#667180',
                  }}
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>

          {/* 表体 */}
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-16 text-center text-[14px]"
                  style={{ color: '#8a9ab3' }}
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              data.map((row, index) => {
                const rowAny = row as Record<string, unknown>
                const key = rowKey ? String(rowAny[rowKey]) : index
                return (
                  <tr
                    key={key}
                    onClick={() => onRowClick?.(row, index)}
                    className={cn(
                      'transition-colors hover:bg-[#f8fafc]',
                      onRowClick && 'cursor-pointer',
                    )}
                    style={{ height: '48px' }}
                  >
                    {columns.map((col) => {
                      const value = rowAny[col.key]
                      return (
                        <td
                          key={col.key}
                          className="px-4 text-[14px] first:pl-5 last:pr-5"
                          style={{
                            textAlign: col.align ?? 'left',
                            color: index === 0 ? '#101828' : '#667180',
                          }}
                        >
                          {col.render
                            ? col.render(value, row, index)
                            : (value as ReactNode) ?? '-'}
                        </td>
                      )
                    })}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ===== 底部分页（预留） ===== */}
      {/* TODO: 对接分页器组件 */}
    </div>
  )
}
