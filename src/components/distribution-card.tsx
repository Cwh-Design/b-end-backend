'use client'

import type {
  LeaveDistributionGroup,
  LeaveLevel,
  LeaveDistributionRow,
} from '@/mock/leave-report'

/**
 * 请假分布卡片 — 报表中心页 / 请假统计
 *
 * 设计稿：报表中心页 (207:143) — Group 37962 (787×619)
 *
 * 结构：
 *   - 顶部 121px 标题区：主标题 + 副标题 + 右侧装饰背景图
 *   - 4 行分布行（每行 88px），用 1px 分隔线分割
 *   - 每行：左侧标题 + 副标题 → 中间人员标签 chip → 右侧「数字 + 人」
 *   - 4 行有语义色：red(≥3次) / orange(=3次) / blue(=2次) / green(=1次)
 *
 * 复用：
 *   - 不复用现有 chart-card / data-table，因为视觉风格特殊（顶部带插画 + 行内色块）
 *   - 人员标签 chip 抽成 PersonTag 子组件，颜色由 LeaveLevel 控制
 */

// ========== 语义色映射 ==========
const LEVEL_PALETTE: Record<
  LeaveLevel,
  {
    /** 整行背景渐变 */
    rowBg: string
    /** 整行描边色 */
    rowBorder: string
    /** 整行圆角 */
    rowRadius: string
    /** 标签描边/文字色 */
    chip: string
    /** 数字色 */
    accent: string
  }
> = {
  danger: {
    rowBg: 'linear-gradient(90deg, #FCF0F0 0%, #FCF2F2 100%)',
    rowBorder: '#FFDBDB',
    rowRadius: '8px',
    chip: '#F7320D',
    accent: '#F7320D',
  },
  warning: {
    rowBg: 'linear-gradient(90deg, #FFFBF2 0%, #FFFBF2 100%)',
    rowBorder: '#FAE8CD',
    rowRadius: '8px',
    chip: '#FF9500',
    accent: '#FF9500',
  },
  info: {
    rowBg: 'linear-gradient(90deg, #F2F8FF 0%, #F2F8FF 100%)',
    rowBorder: '#C8DFFA',
    rowRadius: '8px',
    chip: '#046ED9',
    accent: '#046ED9',
  },
  success: {
    rowBg: 'linear-gradient(90deg, #F2FCF6 0%, #F2FCF6 100%)',
    rowBorder: '#CBF7D9',
    rowRadius: '8px',
    chip: '#19BD6B',
    accent: '#19BD6B',
  },
}

// ========== 单个人员标签 chip (52×26) ==========
function PersonTag({ name, level }: { name: string; level: LeaveLevel }) {
  const color = LEVEL_PALETTE[level].chip
  return (
    <span
      className="inline-flex h-[26px] items-center justify-center rounded-full border bg-white text-[13px] leading-none"
      style={{
        borderColor: color,
        color,
        padding: '0 12px',
        minWidth: '52px',
      }}
    >
      {name}
    </span>
  )
}

// ========== 单行分布行 (747×88) ==========
function DistributionRow({ row }: { row: LeaveDistributionRow }) {
  const palette = LEVEL_PALETTE[row.level]
  return (
    <div
      className="flex items-center justify-between"
      style={{
        background: palette.rowBg,
        border: `1px solid ${palette.rowBorder}`,
        borderRadius: palette.rowRadius,
        height: '98px',
        padding: '0 20px',
        boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.32)',
      }}
    >
      {/* 左侧：标题 + 副标题 */}
      <div className="flex shrink-0 flex-col gap-1">
        <span
          className="text-[18px] leading-[27px]"
          style={{ color: '#101828' }}
        >
          {row.title}
        </span>
        <span className="text-[14px] leading-[21px]" style={{ color: '#667180' }}>
          {row.subtitle}
        </span>
      </div>

      {/* 中间 + 右侧：人员标签 + 数字 */}
      <div className="flex items-center gap-2">
        <div className="flex flex-wrap items-center justify-end gap-2">
          {row.members.map((name, i) => (
            <PersonTag key={i} name={name} level={row.level} />
          ))}
        </div>
        <div
          className="ml-3 flex shrink-0 items-baseline gap-1"
          style={{ color: palette.accent }}
        >
          <span className="text-[24px] font-bold leading-none">{row.count}</span>
          <span className="text-[14px] leading-none">人</span>
        </div>
      </div>
    </div>
  )
}

// ========== 卡片整体 ==========
export function LeaveDistributionCard({ data }: { data: LeaveDistributionGroup }) {
  return (
    <div
      className="relative flex flex-col overflow-hidden rounded-2xl bg-white"
      style={{
        border: '2px solid #ffffff',
        padding: '24px',
        gap: '20px',
      }}
    >
      {/* 顶部标题区（含右侧装饰背景） */}
      <div
        className="relative flex flex-col justify-center overflow-hidden"
        style={{
          height: '121px',
          padding: '24px 28px',
          marginTop: '-21px',
          marginLeft: '-22px',
          marginRight: '-22px',
          background: 'linear-gradient(90deg, #F7FBFF 18%, #F0F5FC 100%)',
          borderTopLeftRadius: '11px',
          borderTopRightRadius: '11px',
        }}
      >
        <img
          src={data.bgImage}
          alt=""
          className="pointer-events-none absolute select-none"
          style={{
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            height: '140%',
            objectFit: 'contain',
          }}
        />
        <div className="relative z-10 flex flex-col gap-1">
          <span
            className="text-[22px] font-bold leading-[33px]"
            style={{ color: '#101828' }}
          >
            {data.title}
          </span>
          <span
            className="text-[14px] leading-[21px]"
            style={{ color: '#667180' }}
          >
            {data.subtitle}
          </span>
        </div>
      </div>

      {/* 4 行分布数据 */}
      <div
        className="flex flex-col"
        style={{ marginLeft: '-4px', marginRight: '-4px', gap: '18px' }}
      >
        {data.rows.map((row, i) => (
          <div key={i}>
            <DistributionRow row={row} />
            {i < data.rows.length - 1 && (
              <div
                style={{
                  height: '0.5px',
                  backgroundColor: '#E4ECF7',
                  marginTop: '18px',
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
