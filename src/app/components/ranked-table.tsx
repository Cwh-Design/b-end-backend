'use client'

import { cn } from '@/lib/utils'
import { RankBadge } from './rank-badge'
import { BarValue } from './bar-value'

/**
 * RankedTable — 通用 Top-N 排名表
 *
 * 适用：
 *   - 数据中心页1 — 部门进出次数和人数统计 / 各部门OA审批单统计
 *   - 应用中心页2 — 告警按应用分布 / 告警按对象分布
 *
 * 列结构由 columns 配置：
 *   - text 列：纯文字
 *   - rank 列：自动渲染奖牌徽章
 *   - bar  列：进度条 + 数字
 */

export type RankedTableColumn<T> = {
  /** 表头标题 */
  title: string
  /** 列宽百分比，例如 '15%'；不传则等分 */
  width?: string
  /** 文字水平左内边距覆写 */
  paddingLeft?: string
  /** 文字水平右内边距覆写（默认 12px / pr-3） */
  paddingRight?: string
} & (
  | { kind: 'rank'; getValue: (row: T) => number }
  | { kind: 'text'; render: (row: T) => React.ReactNode }
  | {
      kind: 'bar'
      getValue: (row: T) => number
      max: number
      color?: string
      barWidth?: number | 'fill'
      align?: 'left' | 'right'
    }
)

interface RankedTableProps<T> {
  /** 卡片标题 */
  title: string
  /** 数据 */
  rows: T[]
  /** 列配置 */
  columns: RankedTableColumn<T>[]
  /** 行 key 取值，默认用 index */
  rowKey?: (row: T, index: number) => string | number
  /** 卡片附加 className */
  className?: string
}

export function RankedTable<T>({
  title,
  rows,
  columns,
  rowKey,
  className,
}: RankedTableProps<T>) {
  return (
    <div
      className={cn('rounded-2xl bg-white shadow-sm', className)}
      style={{ border: '2px solid #ffffff', padding: '20px 24px' }}
    >
      <h3
        className="mb-4 text-[18px] font-bold leading-[28px]"
        style={{ color: '#101828' }}
      >
        {title}
      </h3>
      <table className="w-full table-fixed">
        <thead>
          <tr
            className="text-[14px]"
            style={{ color: '#667180', backgroundColor: '#F0F4FA' }}
          >
            {columns.map((col, i) => {
              // bar 列若 align='right'，表头同步右对齐，与下方进度条/数字对齐
              const isBarRight = col.kind === 'bar' && col.align === 'right'
              return (
                <th
                  key={i}
                  className={`h-10 font-normal ${isBarRight ? 'text-right' : 'text-left'}`}
                  style={{
                    width: col.width,
                    paddingLeft: col.paddingLeft ?? (i === 0 ? '28px' : '24px'),
                    paddingRight: col.paddingRight ?? '12px',
                  }}
                >
                  {col.title}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={rowKey ? rowKey(row, rowIdx) : rowIdx}
              className="border-t transition-colors hover:bg-[#f8fafc]"
              style={{ borderColor: '#f1f4f9' }}
            >
              {columns.map((col, i) => (
                <td
                  key={i}
                  className="py-3"
                  style={{
                    paddingLeft: col.paddingLeft ?? (i === 0 ? '28px' : '24px'),
                    paddingRight: col.paddingRight ?? '12px',
                    color: '#101828',
                  }}
                >
                  {col.kind === 'rank' && <RankBadge rank={col.getValue(row)} />}
                  {col.kind === 'text' && col.render(row)}
                  {col.kind === 'bar' && (
                    <BarValue
                      value={col.getValue(row)}
                      max={col.max}
                      color={col.color}
                      barWidth={col.barWidth}
                      align={col.align}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
