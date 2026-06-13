'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AppLayout } from '@/components/layout/app-layout'
import { DateRangePicker } from '@/components/date-range-picker'
import {
  statusOptions,
  groupOptions,
  overviewStats,
  overviewPeriod,
  serverList,
  diagnosisByServer,
  type ServerItem,
  type ServerStatus,
  type DiagnosisGroup,
  type OverviewStatItem,
} from '@/mock/app-center'

/**
 * 应用中心页1 — 服务器巡检报告
 *
 * 对应 Figma 应用中心页1 (213:33113)
 *
 * 页面结构：
 * 1. 标题
 * 2. 筛选条：日期范围 + 状态 + 分组 + 关键字搜索 + 查询
 * 3. 巡检概览：左侧服务器插画 + 5 张统计卡（巡检服务器/任务/正常/警告/严重）
 * 4. 下半屏左右两栏：
 *    - 服务器列表（搜索 + 卡片项 + 选中态）
 *    - 诊断面板（多分组折叠，监控指标默认展开为表格）
 *
 * TODO: 对接 API 后替换 mock；实现日期范围选择、筛选联动、折叠面板切换。
 */
export default function AppCenterPage() {
  // ========== 筛选状态 ==========
  const [startDate, setStartDate] = useState('2025-06-13')
  const [endDate, setEndDate] = useState('2026-02-13')
  const [status, setStatus] = useState(statusOptions[0])
  const [group, setGroup] = useState(groupOptions[0])
  const [keyword, setKeyword] = useState('')

  // ========== 服务器列表搜索 ==========
  const [listKeyword, setListKeyword] = useState('')
  const [activeServerId, setActiveServerId] = useState<string>('cache-01')

  const filteredServers = useMemo(() => {
    if (!listKeyword) return serverList
    return serverList.filter(
      (s) =>
        s.name.includes(listKeyword) ||
        s.ip.includes(listKeyword) ||
        s.group.includes(listKeyword),
    )
  }, [listKeyword])

  // ========== 当前选中服务器的诊断分组（默认展开 "监控指标"） ==========
  const groups: DiagnosisGroup[] =
    diagnosisByServer[activeServerId] ?? diagnosisByServer['cache-01']

  return (
    <AppLayout>
      {/* 让底部两张卡片随视口拉伸，始终距离 main 底部 20px（main 自身有 24px 底 padding，
          这里减去 4px 让最终视觉间距落在 20px）。 */}
      <div
        className="relative flex min-h-0 flex-1 flex-col gap-5"
        style={{ marginBottom: '-4px' }}
      >
        {/* 装饰建筑图：贴在内容区背景层（main 的灰底之上、所有卡片之下），
            视觉位置在巡检概览卡片的上方（即标题/筛选条所在区域的右上角），
            仅作背景装饰、不参与交互。 */}
        <img
          src="/app-center/bg-overview.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute select-none"
          style={{
            top: '-10px',
            right: '0',
            width: '572px',
            height: '146px',
            zIndex: 0,
          }}
        />
        {/* ===== 标题 ===== */}
        <h2
          className="relative z-10 text-[28px] font-bold leading-[42px]"
          style={{ color: '#101828' }}
        >
          服务器巡检报告
        </h2>

        {/* ===== 筛选条 =====
            与上方标题的视觉间距 = 父容器 gap 20px + marginTop 10px = 30px */}
        <div
          className="relative z-10 flex flex-wrap items-center gap-3"
          style={{ marginTop: '10px' }}
        >
          {/* 日期范围 */}
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onChangeStart={setStartDate}
            onChangeEnd={setEndDate}
          />

          {/* 全部状态 */}
          <SelectField value={status} options={statusOptions} onChange={setStatus} width={160} />

          {/* 全部分组 */}
          <SelectField value={group} options={groupOptions} onChange={setGroup} width={160} />

          {/* 关键字搜索 */}
          <div
            className="relative flex h-9 items-center rounded-md border bg-white"
            style={{ width: '260px', borderColor: '#d8e2f0' }}
          >
            <Search
              className="absolute left-3 h-4 w-4 pointer-events-none"
              style={{ color: '#8a9ab3' }}
            />
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="请输入服务器名称/IP"
              className="h-full w-full rounded-md bg-transparent pl-9 pr-3 text-[14px] outline-none"
              style={{ color: '#101828' }}
            />
          </div>

          {/* 查询按钮 */}
          <button
            type="button"
            className="h-9 rounded-md text-[14px] font-medium transition-colors"
            style={{
              width: '80px',
              backgroundColor: '#0274ff',
              color: '#ffffff',
            }}
          >
            查询
          </button>
        </div>

        {/* ===== 巡检概览 ===== */}
        <OverviewCard period={overviewPeriod} stats={overviewStats} />

        {/* ===== 下半屏：服务器列表 + 诊断面板（自适应填充剩余高度） ===== */}
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-5 xl:grid-cols-[505px_minmax(0,1fr)]">
          {/* 左：服务器列表 */}
          <ServerListCard
            servers={filteredServers}
            keyword={listKeyword}
            onKeywordChange={setListKeyword}
            activeId={activeServerId}
            onSelect={setActiveServerId}
          />

          {/* 右：诊断面板 */}
          <DiagnosisCard groups={groups} />
        </div>
      </div>
    </AppLayout>
  )
}

// ========================================================================
// 通用下拉（不实现真实下拉，仅样式占位 + 简单点击切换；TODO: 接入真实下拉）
// ========================================================================
function SelectField({
  value,
  options,
  onChange,
  width,
}: {
  value: string
  options: string[]
  onChange: (v: string) => void
  width: number
}) {
  const [open, setOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  // 下拉用 position: fixed 挂到视口层，绕开父级 stacking context（避免被
  // 后续的 .relative.overflow-hidden 卡片遮住）。位置在按钮下方 4px 处。
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null)

  useEffect(() => {
    if (!open) return
    const update = () => {
      const r = btnRef.current?.getBoundingClientRect()
      if (!r) return
      setPos({ top: r.bottom + 4, left: r.left, width: r.width })
    }
    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
    }
  }, [open])

  return (
    <div className="relative" style={{ width: `${width}px` }}>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 w-full items-center justify-between rounded-md border bg-white px-3 text-[14px] transition-colors hover:border-[#0274ff]"
        style={{ borderColor: '#d8e2f0', color: '#101828' }}
      >
        <span>{value}</span>
        <ChevronDown className="h-4 w-4" style={{ color: '#8a9ab3' }} />
      </button>
      {open &&
        pos &&
        typeof document !== 'undefined' &&
        createPortal(
          <>
            <div
              className="fixed inset-0"
              style={{ zIndex: 9998 }}
              onClick={() => setOpen(false)}
            />
            <div
              className="fixed rounded-md border bg-white py-1 shadow-md"
              style={{
                top: pos.top,
                left: pos.left,
                width: pos.width,
                borderColor: '#d8e2f0',
                zIndex: 9999,
              }}
            >
              {options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    onChange(opt)
                    setOpen(false)
                  }}
                  className={cn(
                    'flex h-8 w-full items-center px-3 text-left text-[14px] transition-colors hover:bg-[#f0f5fc]',
                    opt === value && 'font-medium',
                  )}
                  style={{ color: opt === value ? '#0274ff' : '#101828' }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </>,
          document.body,
        )}
    </div>
  )
}

// ========================================================================
// 巡检概览卡（左侧服务器插画 + 5 张统计卡）
// ========================================================================
function OverviewCard({
  period,
  stats,
}: {
  period: string
  stats: OverviewStatItem[]
}) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(90deg, #FFFFFF 0%, #F5F8FF 15%)',
        boxShadow: '0px 0px 15px rgba(52, 118, 210, 0.18)',
        borderRadius: '16px',
        padding: '20px 24px',
        height: '270px',
      }}
    >
      {/* 标题 */}
      <div className="relative z-10 flex items-baseline gap-2">
        <h3 className="text-[20px] font-bold" style={{ color: '#101828' }}>
          巡检概览
        </h3>
        <span className="text-[14px]" style={{ color: '#8a9ab3' }}>
          ({period})
        </span>
      </div>

      {/* 主体：插画 + 卡片（整体向上偏移） */}
      <div
        className="relative z-10 flex items-center gap-6"
        style={{ marginTop: '-20px' }}
      >
        {/* 服务器插画 */}
        <img
          src="/app-center/server-illustration.png"
          alt=""
          className="shrink-0 select-none"
          style={{ width: '279px', height: '275px' }}
        />

        {/* 5 张统计卡 */}
        <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((s) => (
            <OverviewStatCard key={s.title} item={s} />
          ))}
        </div>
      </div>
    </div>
  )
}

function OverviewStatCard({ item }: { item: OverviewStatItem }) {
  // 数字底色 + 趋势配色
  const valueColor =
    item.tone === 'success'
      ? '#06B563'
      : item.tone === 'warning'
        ? '#FA8306'
        : item.tone === 'critical'
          ? '#EE1A20'
          : '#101828'

  // 右上角状态图标（仅警告/严重/正常显示对应彩色 svg；前两张展示通用 ✓）
  const statusIcon =
    item.tone === 'success'
      ? '/app-center/status-normal.svg'
      : item.tone === 'warning'
        ? '/app-center/status-warning.svg'
        : item.tone === 'critical'
          ? '/app-center/status-critical.svg'
          : null

  const trendUp = item.trend > 0
  const trendColor = trendUp ? '#EE1A20' : '#06B563'
  const trendArrow = trendUp ? '↑' : '↓'

  return (
    <div
      className="relative flex flex-col justify-between rounded-xl bg-white transition-shadow hover:shadow-[0_4px_6px_0_rgba(128,153,187,0.20)]"
      style={{
        height: '166px',
        padding: '16px 16px 16px 24px',
        border: '1px solid rgba(216, 226, 240, 0.6)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(4px)',
      }}
    >
      {/* 标题 + 右上角状态 icon */}
      <div className="flex items-start justify-between">
        <span className="text-[15px]" style={{ color: '#667180' }}>
          {item.title}
        </span>
        {statusIcon && (
          <img src={statusIcon} alt="" className="h-5 w-5 shrink-0" />
        )}
      </div>

      {/* 大数字 */}
      <div
        className="text-[36px] font-bold leading-[44px]"
        style={{ color: valueColor }}
      >
        {item.value}
      </div>

      {/* 较上周期 */}
      <div className="flex items-center text-[13px]" style={{ gap: '8px' }}>
        <span style={{ color: '#8a9ab3' }}>较上周期</span>
        <span style={{ color: trendColor, fontWeight: 600, fontSize: '16px' }}>
          {trendArrow} {Math.abs(item.trend)}%
        </span>
      </div>
    </div>
  )
}

// ========================================================================
// 服务器列表卡
// ========================================================================
function ServerListCard({
  servers,
  keyword,
  onKeywordChange,
  activeId,
  onSelect,
}: {
  servers: ServerItem[]
  keyword: string
  onKeywordChange: (v: string) => void
  activeId: string
  onSelect: (id: string) => void
}) {
  return (
    <div
      className="flex min-h-0 flex-col rounded-2xl bg-white"
      style={{
        border: '2px solid #ffffff',
        padding: '20px 24px',
      }}
    >
      {/* 标题 */}
      <div className="flex items-baseline gap-2">
        <h3 className="text-[18px] font-bold" style={{ color: '#101828' }}>
          服务器列表
        </h3>
        <span className="text-[14px]" style={{ color: '#8a9ab3' }}>
          ({servers.length})
        </span>
      </div>

      {/* 搜索框 */}
      <div
        className="relative mt-4 flex h-9 shrink-0 items-center rounded-md border bg-white"
        style={{ borderColor: '#d8e2f0' }}
      >
        <Search
          className="absolute left-3 h-4 w-4 pointer-events-none"
          style={{ color: '#8a9ab3' }}
        />
        <input
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          placeholder="请输入服务器名称/IP"
          className="h-full w-full rounded-md bg-transparent pl-9 pr-3 text-[14px] outline-none"
          style={{ color: '#101828' }}
        />
      </div>

      {/* 列表（自适应填充剩余高度，仅列表内部滚动） */}
      <div className="mt-4 flex-1 overflow-y-auto">
        <div className="flex flex-col gap-3">
          {servers.map((s) => (
            <ServerListItem
              key={s.id}
              item={s}
              active={s.id === activeId}
              onClick={() => onSelect(s.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function ServerListItem({
  item,
  active,
  onClick,
}: {
  item: ServerItem
  active: boolean
  onClick: () => void
}) {
  // 状态徽章配色
  const badge = STATUS_BADGE[item.status]

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 rounded-lg p-3 text-left transition-colors',
      )}
      style={{
        border: `1px solid ${active ? '#136AF8' : '#eef1f6'}`,
        backgroundColor: '#ffffff',
        boxShadow: active ? '0px 5px 8px rgba(79, 143, 233, 0.18)' : 'none',
      }}
    >
      {/* 服务器机箱图标 */}
      <img
        src={
          active
            ? '/app-center/server-selected.png'
            : '/app-center/server-unselected.png'
        }
        alt=""
        className="h-10 w-10 shrink-0"
      />

      {/* 名称 + IP/分组 */}
      <div className="min-w-0 flex-1">
        <div
          className={cn('text-[15px] font-bold', active && 'text-[#0274ff]')}
          style={{ color: active ? '#0274ff' : '#101828' }}
        >
          {item.name}
        </div>
        <div className="mt-0.5 truncate text-[13px]" style={{ color: '#8a9ab3' }}>
          {item.ip} | {item.group}
        </div>
      </div>

      {/* 状态徽章 */}
      <span
        className="shrink-0 rounded px-2 py-0.5 text-[12px] font-medium"
        style={{ color: badge.color, backgroundColor: badge.bg }}
      >
        {badge.label}
      </span>
    </button>
  )
}

// ========================================================================
// 诊断面板（多分组折叠 + 监控指标默认展开为表格）
// ========================================================================
function DiagnosisCard({ groups }: { groups: DiagnosisGroup[] }) {
  // 当前展开的分组索引集合（默认仅第 0 组「监控指标」展开）
  const [openIdx, setOpenIdx] = useState<Set<number>>(new Set([0]))

  const toggle = (idx: number) => {
    setOpenIdx((prev) => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  return (
    <div
      className="flex min-h-0 flex-col rounded-2xl bg-white"
      style={{
        border: '2px solid #ffffff',
        padding: '20px 24px',
      }}
    >
      <h3
        className="shrink-0 text-[18px] font-bold"
        style={{ color: '#101828' }}
      >
        各部门OA审批单统计
      </h3>

      <div className="mt-4 flex flex-1 flex-col overflow-y-auto">
        {groups.map((g, idx) => {
          const open = openIdx.has(idx)
          return (
            <DiagnosisGroupBlock
              key={`${g.name}-${idx}`}
              group={g}
              open={open}
              onToggle={() => toggle(idx)}
            />
          )
        })}
      </div>
    </div>
  )
}

function DiagnosisGroupBlock({
  group,
  open,
  onToggle,
}: {
  group: DiagnosisGroup
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="mb-2">
      {/* 分组头（带背景色块） */}
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-3"
        style={{ backgroundColor: '#F5F7FA' }}
      >
        <div className="flex items-center gap-2">
          <ChevronDown
            className={cn('h-4 w-4 transition-transform', !open && '-rotate-90')}
            style={{ color: '#8a9ab3' }}
          />
          <span className="text-[15px] font-bold" style={{ color: '#101828' }}>
            {group.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* 蓝色未读 */}
          <CounterPill color="#0274ff" bg="rgba(2, 116, 255, 0.10)" value={group.unread} />
          {/* 红色告警 */}
          <CounterPill color="#EE1A20" bg="rgba(238, 26, 32, 0.10)" value={group.alerts} />
        </div>
      </button>

      {/* 展开内容 */}
      {open && group.rows.length > 0 && (
        <div style={{ marginTop: '8px' }}>
          <table className="w-full table-fixed text-[14px]">
            <thead>
              <tr
                className="text-left font-normal"
                style={{ color: '#40566E', backgroundColor: '#F1F6FF' }}
              >
                <th className="h-9 pr-3 font-normal" style={{ width: '25%', paddingLeft: '40px' }}>
                  诊断内容
                </th>
                <th className="pr-3 font-normal" style={{ width: '25%' }}>
                  诊断结果
                </th>
                <th className="pr-3 font-normal" style={{ width: '25%' }}>
                  异常信息
                </th>
                <th
                  className="font-normal"
                  style={{ width: '25%', paddingRight: '40px' }}
                >
                  <div className="flex items-center justify-end gap-3">
                    <span
                      className="inline-block"
                      style={{ width: '60px', textAlign: 'left' }}
                    >
                      指标表现
                    </span>
                    {/* 与数据行的 sparkline 等宽透明占位，保证表头/数据同一垂直锚点 */}
                    <span
                      aria-hidden
                      className="inline-block"
                      style={{ width: '94px', visibility: 'hidden' }}
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {group.rows.map((row, idx) => (
                <tr
                  key={`${row.content}-${idx}`}
                  className="border-t"
                  style={{ borderColor: '#f1f4f9' }}
                >
                  <td
                    className="h-10 pr-3"
                    style={{ color: '#101828', paddingLeft: '40px' }}
                  >
                    {row.content}
                  </td>
                  <td className="pr-3">
                    <ResultBadge status={row.result} />
                  </td>
                  <td className="pr-3" style={{ color: '#8a9ab3' }}>
                    {row.abnormal}
                  </td>
                  <td style={{ paddingRight: '40px' }}>
                    <div className="flex items-center justify-end gap-3">
                      <span
                        className="inline-block text-[14px]"
                        style={{ width: '60px', color: '#101828', textAlign: 'left' }}
                      >
                        {row.metric}
                      </span>
                      <Sparkline points={row.trendPoints} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ========================================================================
// 子组件：状态徽章 / 计数徽章 / 折线缩略图
// ========================================================================
const STATUS_BADGE: Record<
  ServerStatus,
  { label: string; color: string; bg: string }
> = {
  normal: { label: '正常', color: '#06B563', bg: 'rgba(6, 181, 99, 0.10)' },
  warning: { label: '警告', color: '#FA8306', bg: 'rgba(250, 131, 6, 0.10)' },
  critical: { label: '严重', color: '#EE1A20', bg: 'rgba(238, 26, 32, 0.10)' },
}

function ResultBadge({ status }: { status: ServerStatus }) {
  const b = STATUS_BADGE[status]
  return (
    <span
      className="inline-flex items-center rounded px-2 py-0.5 text-[12px] font-medium"
      style={{ color: b.color, backgroundColor: b.bg }}
    >
      {b.label}
    </span>
  )
}

function CounterPill({
  value,
  color,
  bg,
}: {
  value: number
  color: string
  bg: string
}) {
  return (
    <span
      className="inline-flex h-[21px] min-w-[27px] items-center justify-center rounded-full px-2 text-[12px] font-medium"
      style={{ color, backgroundColor: bg }}
    >
      {value}
    </span>
  )
}

/**
 * 趋势缩略图（Sparkline）
 *
 * 视觉：平滑曲线 + 蓝色渐变填充区域，参考"指标表现"列设计稿。
 *  - 曲线：Catmull-Rom 转三次贝塞尔，比 polyline 更柔和
 *  - 填充：顶部 rgba(2,116,255,0.18) → 底部 rgba(2,116,255,0)，模拟面积图
 *  - 留 4px 上下安全边距，让线和填充不贴边
 */
function Sparkline({ points }: { points: number[] }) {
  const W = 94
  const H = 27
  const PAD_X = 1
  const PAD_TOP = 4
  const PAD_BOTTOM = 2
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const step = points.length > 1 ? (W - 2 * PAD_X) / (points.length - 1) : 0
  const usableH = H - PAD_TOP - PAD_BOTTOM

  // 计算每个点的实际坐标
  const pts = points.map((p, i) => ({
    x: PAD_X + i * step,
    y: PAD_TOP + ((max - p) / range) * usableH,
  }))

  // Catmull-Rom → Cubic Bezier，得到平滑曲线
  const smoothPath = pts
    .map((pt, i) => {
      if (i === 0) return `M ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`
      const p0 = pts[i - 2] ?? pts[i - 1]
      const p1 = pts[i - 1]
      const p2 = pt
      const p3 = pts[i + 1] ?? pt
      // tension = 0.5
      const cp1x = p1.x + (p2.x - p0.x) / 6
      const cp1y = p1.y + (p2.y - p0.y) / 6
      const cp2x = p2.x - (p3.x - p1.x) / 6
      const cp2y = p2.y - (p3.y - p1.y) / 6
      return `C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`
    })
    .join(' ')

  // 闭合到底边作为面积填充
  const lastX = pts[pts.length - 1].x
  const firstX = pts[0].x
  const baselineY = H - PAD_BOTTOM
  const areaPath = `${smoothPath} L ${lastX.toFixed(2)} ${baselineY} L ${firstX.toFixed(2)} ${baselineY} Z`

  // 渐变 id 必须唯一，避免多个 sparkline 串色
  const gradId = `sparkline-fill-${Math.abs(
    points.reduce((a, b, i) => a + b * (i + 1), 0),
  )}`

  return (
    <svg width={W} height={H} className="shrink-0" aria-hidden>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0274ff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#0274ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradId})`} stroke="none" />
      <path
        d={smoothPath}
        stroke="#0274ff"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
