'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * ResourceBarChart — 资源概览 3D 圆柱堆叠图
 *
 * 用于应用中心页2 / 资源概览。
 *
 * 设计稿是真实 3D 圆柱效果：
 *   每根柱子由「顶椭圆 + 深蓝段（对象总数）+ 中分隔椭圆 + 浅蓝段（监控对象数）+ 底椭圆」组成。
 *   不依赖 Recharts —— 它内置 Bar 没有椭圆顶/底，强行实现反而更繁琐。
 *
 * 横向铺满策略：
 *   用 ResizeObserver 测出容器实际宽度作为 viewBox 宽度，柱子按真实像素绘制，
 *   不再依赖 preserveAspectRatio 缩放，因此文字不会被拉伸/压扁。
 *   外层卡片自带 24px 内边距 → 图自然与卡片左右各保持 24px 间距。
 *
 * 颜色按设计稿取色：
 *   - 深蓝段：#3F7DEE → #80B0FF（圆柱光照效果，左右暗中间亮）
 *   - 浅蓝段：#6FC8FF → #BFE6FF
 *   - 顶/中/底椭圆：高亮色，强化 3D 圆柱断面感
 */

export interface ResourceBarPoint {
  /** 资源类型，例如「基础设施」 */
  category: string
  /** 对象总数（深蓝 + 浅蓝两段叠加后的总高度） */
  total: number
  /** 已监控对象数（浅蓝段高度） */
  monitored: number
}

interface ResourceBarChartProps {
  data: ResourceBarPoint[]
  height?: number
}

export function ResourceBarChart({ data, height = 280 }: ResourceBarChartProps) {
  // ===== 容器实测宽度，让 SVG 横向铺满又不拉伸文字 =====
  const wrapRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(700)

  useEffect(() => {
    if (!wrapRef.current) return
    const el = wrapRef.current
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width)
      if (w > 0) setWidth(w)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // ===== 画布内边距（左侧仅给 Y 轴数字 32px；右侧贴齐卡片内边） =====
  const VB_W = width
  const VB_H = height
  const PAD_L = 32
  const PAD_R = 0
  const PAD_T = 50
  const PAD_B = 34
  const CHART_W = Math.max(0, VB_W - PAD_L - PAD_R)
  const CHART_H = Math.max(0, VB_H - PAD_T - PAD_B)

  // ===== Y 轴刻度（向上取到 25 的整数倍） =====
  const dataMax = Math.max(0, ...data.map((d) => d.total))
  const niceMax = Math.max(100, Math.ceil(dataMax / 25) * 25)
  const yTicks = [0, niceMax * 0.25, niceMax * 0.5, niceMax * 0.75, niceMax]

  // ===== 柱子布局 =====
  const colW = data.length > 0 ? CHART_W / data.length : 0
  const BAR_W = 22
  const rx = BAR_W / 2 // 椭圆水平半径
  const ry = 4 // 椭圆垂直半径（决定 3D 厚度）

  function yToPx(v: number) {
    return PAD_T + CHART_H - (v / niceMax) * CHART_H
  }

  return (
    <div ref={wrapRef} className="w-full" style={{ height: `${height}px` }}>
      <svg
        width={VB_W}
        height={VB_H}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="block"
      >
        <defs>
          {/* 深蓝段：横向渐变，左暗 → 中亮 → 右暗，模拟圆柱受光 */}
          <linearGradient id="cyl-top" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3F7DEE" />
            <stop offset="50%" stopColor="#80B0FF" />
            <stop offset="100%" stopColor="#3F7DEE" />
          </linearGradient>
          {/* 浅蓝段：横向渐变 */}
          <linearGradient id="cyl-bot" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6FC8FF" />
            <stop offset="50%" stopColor="#BFE6FF" />
            <stop offset="100%" stopColor="#6FC8FF" />
          </linearGradient>
        </defs>

        {/* ===== Y 轴单位（最顶行的"个"，与右侧图例同一水平线上） ===== */}
        <text
          x={PAD_L - 8}
          y={PAD_T - 26}
          fontSize="12"
          fill="#8a9ab3"
          textAnchor="end"
        >
          个
        </text>

        {/* ===== 横向网格 + Y 轴刻度（标签居网格线左侧） ===== */}
        {yTicks.map((t) => (
          <g key={t}>
            <line
              x1={PAD_L}
              y1={yToPx(t)}
              x2={VB_W - PAD_R}
              y2={yToPx(t)}
              stroke="#E5ECF6"
              strokeDasharray="4 4"
            />
            <text
              x={PAD_L - 8}
              y={yToPx(t) + 4}
              fontSize="12"
              fill="#8a9ab3"
              textAnchor="end"
            >
              {t}
            </text>
          </g>
        ))}

        {/* ===== 图例（右上角，贴卡片右边；与左侧"个"同一水平线） ===== */}
        <g transform={`translate(${VB_W - 220}, ${PAD_T - 42})`}>
          <rect x="0" y="0" width="12" height="12" rx="2" fill="#4683FF" />
          <text x="20" y="10" fontSize="13" fill="#667180">
            对象总数
          </text>
          <rect x="100" y="0" width="12" height="12" rx="2" fill="#7CD0FF" />
          <text x="120" y="10" fontSize="13" fill="#667180">
            监控对象总数
          </text>
        </g>

        {/* ===== 柱子（每根柱子从底到顶分 5 层） ===== */}
        {data.map((d, i) => {
          const cx = PAD_L + colW * (i + 0.5)
          const yBottom = yToPx(0)
          const yMid = yToPx(d.monitored)
          const yTop = yToPx(d.total)

          return (
            <g key={d.category}>
              {/* (1) 浅蓝矩形（monitored 段，从底到中间分隔线） */}
              <rect
                x={cx - BAR_W / 2}
                y={yMid}
                width={BAR_W}
                height={Math.max(0, yBottom - yMid)}
                fill="url(#cyl-bot)"
              />
              {/* (2) 底椭圆（浅蓝段底面） */}
              <ellipse cx={cx} cy={yBottom} rx={rx} ry={ry} fill="#A4DCFF" />
              {/* (3) 深蓝矩形（total - monitored 段） */}
              <rect
                x={cx - BAR_W / 2}
                y={yTop}
                width={BAR_W}
                height={Math.max(0, yMid - yTop)}
                fill="url(#cyl-top)"
              />
              {/* (4) 中分隔椭圆（深蓝段底面 / 浅蓝段顶面） */}
              <ellipse cx={cx} cy={yMid} rx={rx} ry={ry} fill="#A8C8FF" />
              {/* (5) 顶椭圆（深蓝段顶面 highlight） */}
              <ellipse cx={cx} cy={yTop} rx={rx} ry={ry} fill="#9CBFFF" />

              {/* X 轴类目标签（文字顶距 0 虚线约 20px：基线偏移 = 20 + 字号一半 10 ≈ 30） */}
              <text
                x={cx}
                y={yBottom + 30}
                fontSize="13"
                fill="#667180"
                textAnchor="middle"
              >
                {d.category}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
