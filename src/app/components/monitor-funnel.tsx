'use client'

/**
 * MonitorFunnel — 监控概览漏斗图
 *
 * 仅用于应用中心页2 / 监控概览模块。
 * 设计稿来源：Figma 应用中心页2 (220:519) — Group 37888
 *
 * 视觉拆解：
 *   - 三段梯形纵向堆叠，颜色由深到浅蓝色
 *   - 顶部右侧标注「对象总数(个) · 12,320」
 *   - 左右各 2 行引线指向漏斗：
 *       左侧：监控总数(个) 10,320  /  产生告警对象数(个) 50
 *       右侧：监控覆盖率 92%      /  产生告警对象比率 0.72%
 *
 * 实现：纯 SVG 描绘梯形 + 绝对定位文字标签。容器固定宽度 720，自适应缩放交给父容器（max-w-full）
 */

interface FunnelData {
  /** 顶部统计：对象总数 */
  totalObjects: number
  /** 左下：监控总数 */
  monitored: number
  /** 右下：监控覆盖率（百分比，例如 92） */
  coverage: number
  /** 左下：产生告警对象数 */
  alertCount: number
  /** 右下：产生告警对象比率（百分比，例如 0.72） */
  alertRate: number
}

export function MonitorFunnel({ data }: { data: FunnelData }) {
  // ===== 漏斗几何参数 =====
  const W = 340 // 漏斗最大宽度
  const H = 230 // 漏斗总高度
  const GAP = 4 // 段间距
  const SEG_H = (H - 2 * GAP) / 3 // 每段高度
  const TOP_W = W
  const BOT_W = W * 0.36 // 漏斗底部最窄处
  const STEP = (TOP_W - BOT_W) / 3 // 每段两侧内缩量

  /** 计算第 i 段的上、下底宽度 */
  const segWidth = (i: number) => ({
    top: TOP_W - i * STEP,
    bottom: TOP_W - (i + 1) * STEP,
  })

  /** 给定 i 段，返回梯形 4 个顶点 SVG path（4 个角带 4px 圆角） */
  const segPath = (i: number) => {
    const { top, bottom } = segWidth(i)
    const yTop = i * (SEG_H + GAP)
    const yBot = yTop + SEG_H
    const cx = W / 2
    const r = 0 // 圆角半径

    // 4 个顶点（顺时针：左上 → 右上 → 右下 → 左下）
    const TL = { x: cx - top / 2, y: yTop }
    const TR = { x: cx + top / 2, y: yTop }
    const BR = { x: cx + bottom / 2, y: yBot }
    const BL = { x: cx - bottom / 2, y: yBot }

    // 梯形腰边稍向内倾斜，圆角沿用半径 r 的近似圆弧（A 命令）即可，视觉上看不出畸变
    return [
      // 左上：从顶边内缩 r 起笔
      `M ${TL.x + r} ${TL.y}`,
      // 顶边
      `L ${TR.x - r} ${TR.y}`,
      // 右上圆角
      `A ${r} ${r} 0 0 1 ${TR.x} ${TR.y + r}`,
      // 右腰
      `L ${BR.x} ${BR.y - r}`,
      // 右下圆角
      `A ${r} ${r} 0 0 1 ${BR.x - r} ${BR.y}`,
      // 底边
      `L ${BL.x + r} ${BL.y}`,
      // 左下圆角
      `A ${r} ${r} 0 0 1 ${BL.x} ${BL.y - r}`,
      // 左腰
      `L ${TL.x} ${TL.y + r}`,
      // 左上圆角
      `A ${r} ${r} 0 0 1 ${TL.x + r} ${TL.y}`,
      'Z',
    ].join(' ')
  }

  const SEG_COLORS = ['#4582EE', '#7BAEFF', '#B6D2FF']

  return (
    <div className="relative mx-auto" style={{ width: '720px', height: '260px' }}>
      {/* 顶部居中：图标 + 对象总数(个) + 数值（整体相对漏斗顶部上移 10px） */}
      <div
        className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2"
        style={{ height: '24px', top: '-10px' }}
      >
        <img
          src="/app-center2/funnel-legend-dot.png"
          alt=""
          className="inline-block h-[14px] w-[14px] select-none"
        />
        <span className="text-[14px]" style={{ color: '#667180' }}>
          对象总数(个)
        </span>
        <span
          className="ml-1 text-[18px] font-bold"
          style={{ color: '#101828' }}
        >
          {data.totalObjects.toLocaleString()}
        </span>
      </div>

      {/* 漏斗 SVG（居中） */}
      <svg
        width={W}
        height={H}
        className="absolute left-1/2 top-[30px] -translate-x-1/2"
      >
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={segPath(i)}
            fill={SEG_COLORS[i]}
            stroke="rgba(255,255,255,0.6)"
            strokeWidth={1}
          />
        ))}
      </svg>

      {/* 引线 + 文字（4 个角，整体相对漏斗段中心略上提，与上一/下一段对齐） */}
      <FunnelLabel
        side="left"
        top="80px"
        title="监控总数(个)"
        value={data.monitored.toLocaleString()}
      />
      <FunnelLabel
        side="right"
        top="80px"
        title="监控覆盖率"
        value={`${data.coverage} %`}
      />
      <FunnelLabel
        side="left"
        top="205px"
        title="产生告警对象数(个)"
        value={data.alertCount.toLocaleString()}
      />
      <FunnelLabel
        side="right"
        top="205px"
        title="产生告警对象比率"
        value={`${data.alertRate} %`}
      />
    </div>
  )
}

// ========== 引线 + 文本标签子组件 ==========
function FunnelLabel({
  side,
  top,
  title,
  value,
}: {
  side: 'left' | 'right'
  top: string
  title: string
  value: string
}) {
  // 引线圆点 + 横线
  const dot = (
    <span
      className="inline-block h-[6px] w-[6px] rounded-full"
      style={{ backgroundColor: '#9DB7E5' }}
    />
  )
  const line = (
    <span
      className="inline-block"
      style={{
        height: '1px',
        width: '36px',
        backgroundColor: '#D1DCEC',
      }}
    />
  )

  if (side === 'left') {
    return (
      <div
        className="absolute flex items-center gap-2"
        style={{ left: '0px', top, width: '180px' }}
      >
        <div className="flex flex-1 flex-col items-end gap-0.5">
          <span className="text-[18px] font-bold" style={{ color: '#101828' }}>
            {value}
          </span>
          <span className="text-[13px]" style={{ color: '#667180' }}>
            {title}
          </span>
        </div>
        {line}
        {dot}
      </div>
    )
  }
  return (
    <div
      className="absolute flex items-center gap-2"
      style={{ right: '0px', top, width: '180px' }}
    >
      {dot}
      {line}
      <div className="flex flex-1 flex-col items-start gap-0.5">
        <span className="text-[18px] font-bold" style={{ color: '#101828' }}>
          {value}
        </span>
        <span className="text-[13px]" style={{ color: '#667180' }}>
          {title}
        </span>
      </div>
    </div>
  )
}
