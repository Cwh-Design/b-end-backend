'use client'

import { PieChart, Pie, Cell } from 'recharts'
import { AppLayout } from '@/components/layout/app-layout'
import {
  resourceTiles,
  alertSegments,
  alertTotal,
  listRows,
  listExecMax,
  type ResourceTile,
  type AlertSegment,
  type ListRow,
} from '@/mock/app-center3'

/**
 * 应用中心页3 — 统一运维平台
 *
 * 对应 Figma 应用中心页3 (238:781)
 *
 * 页面结构（与设计稿 + 截图对照后的最终版）：
 * 1. Banner — 标题「统一运维平台」+ 副标题 + 右侧装饰建筑图
 * 2. 顶部双卡 — 左：资源统计（3×3 9 个磁贴）  右：告警统计（环形图 + 4 行图例）
 * 3. 底部全宽卡 — 列表统计（8 列表头 + 5 行树形数据，行首竖条彩色 + Exec(ms) 进度条）
 *
 * 复用情况：
 *   - AppLayout：100% 复用
 *   - Recharts PieChart：仅在本页用，组件级直接引入
 *   - 资源磁贴 / 列表行 / 告警图例 均做成本页内子组件
 *
 * TODO: 对接统一运维 API；列表树形展开/折叠；磁贴点击跳转资源明细。
 */

export default function AppCenterPage3() {
  return (
    <AppLayout>
      {/* Banner 与卡片区之间 0 间距（设计稿中 Banner 底部直接接资源卡上沿） */}
      <HeroBanner />

      <div className="space-y-5">
        {/* ===== 第2区：资源统计 + 告警统计 ===== */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,970fr)_minmax(0,600fr)]">
          <ResourceStatsCard tiles={resourceTiles} />
          <AlertStatsCard total={alertTotal} segments={alertSegments} />
        </div>

        {/* ===== 第3区：列表统计 ===== */}
        {/* 用 -4px 负边距抵消 AppLayout main 的 24px → 列表卡距视口底 20px */}
        <div style={{ marginBottom: -4 }}>
          <ListStatsCard rows={listRows} />
        </div>
      </div>
    </AppLayout>
  )
}

// ========================================================================
// HeroBanner — 顶部标题 + 副标题 + 右上角装饰图
// 设计稿里 Banner 直接浮在页面背景上，没有白色卡片包围
// ========================================================================
function HeroBanner() {
  return (
    <div
      className="relative overflow-hidden"
      style={{ padding: '8px 4px 0', height: '146px' }}
    >
      {/* 右上角装饰建筑图 */}
      <img
        src="/app-center3/bg-hero.png"
        alt=""
        className="pointer-events-none absolute right-0 top-0 h-full select-none"
        style={{ objectFit: 'contain', objectPosition: 'right top' }}
      />

      {/* 文字组（标题 + 盾牌图标 + 副标题）整体下移 20px */}
      <div className="relative z-10" style={{ marginTop: 20 }}>
        {/* 标题行 + 安全图标 */}
        <div className="flex items-center gap-2">
          <h1
            className="text-[28px] font-bold leading-[42px]"
            style={{ color: '#101828' }}
          >
            统一运维平台
          </h1>
          <img
            src="/app-center3/icon-shield.svg"
            alt=""
            className="h-[25px] w-[21px]"
          />
        </div>

        {/* 副标题 */}
        <p
          className="mt-1 text-[16px] leading-[24px]"
          style={{ color: '#667180' }}
        >
          全方位监控与运维管理，保障业务稳定运行
        </p>
      </div>
    </div>
  )
}

// ========================================================================
// ResourceStatsCard — 资源统计：3 × 3 磁贴网格
// ========================================================================
function ResourceStatsCard({ tiles }: { tiles: ResourceTile[] }) {
  return (
    <div
      className="rounded-2xl bg-white"
      style={{ border: '2px solid #ffffff', padding: '20px 26px 24px' }}
    >
      <h3
        className="text-[20px] font-bold leading-[30px]"
        style={{ color: '#101828' }}
      >
        资源统计
      </h3>

      <div className="mt-5 grid grid-cols-3 gap-x-5 gap-y-4">
        {tiles.map((tile) => (
          <ResourceTileItem key={tile.name} tile={tile} />
        ))}
      </div>
    </div>
  )
}

function ResourceTileItem({ tile }: { tile: ResourceTile }) {
  return (
    <div
      className="relative flex items-center overflow-hidden bg-white"
      style={{
        height: '80px',
        border: '1px solid #CAD0D9',
        borderRadius: '4px',
      }}
    >
      {/* 图标区背景色块 — 79×79 方形 */}
      <div
        className="absolute left-0 top-0"
        style={{ width: '79px', height: '79px', backgroundColor: '#F1F4F9' }}
      />

      {/* 3D 图标（叠在背景块上，使用原始尺寸 77×72，向左下偏移） */}
      <img
        src={tile.icon}
        alt={tile.name}
        className="relative z-10 shrink-0 select-none"
        style={{
          width: '77px',
          height: '72px',
          marginLeft: '1px',
          transform: 'translate(-12px, 6px)',
        }}
      />

      {/* 名称 + 数值 */}
      <div
        className="relative z-10 flex flex-1 items-center justify-between"
        style={{ paddingLeft: '17px', paddingRight: '30px' }}
      >
        <span className="text-[16px]" style={{ color: '#667180' }}>
          {tile.name}
        </span>
        <span
          className="text-[24px] font-bold leading-none"
          style={{ color: '#101828' }}
        >
          {tile.value}
        </span>
      </div>
    </div>
  )
}

// ========================================================================
// AlertStatsCard — 告警统计：环形图 + 中心总数 + 4 行图例
// ========================================================================
function AlertStatsCard({
  total,
  segments,
}: {
  total: number
  segments: AlertSegment[]
}) {
  // 环形图：使用 percent 字段，但把它归一化到总和 100%，
  // 否则原始 4 段相加 = 89%，会导致饼图有 11% 缺口。
  // 图例区显示的仍然是原始 percent 值，不变。
  const percentSum = segments.reduce((sum, s) => sum + s.percent, 0)
  const data = segments.map((s) => ({
    name: s.label,
    value: (s.percent / percentSum) * 100,
  }))

  return (
    <div
      className="rounded-2xl bg-white"
      style={{ border: '2px solid #ffffff', padding: '20px 26px 24px' }}
    >
      <h3
        className="text-[20px] font-bold leading-[30px]"
        style={{ color: '#101828' }}
      >
        告警统计
      </h3>

      <div className="flex items-center" style={{ gap: 68, marginTop: 60, marginLeft: 80 }}>
        {/* 左：环形图 */}
        <div
          className="alert-pie-host relative shrink-0 [&_*:focus]:outline-none [&_svg]:outline-none"
          style={{ width: 180, height: 180 }}
        >
          {/* 饼图背景图（钟表刻度 + 中心淡蓝圆，从设计稿提供）— 居中显示 136×136，慢速旋转 */}
          <img
            src="/app-center3/donut-bg.png"
            alt=""
            aria-hidden="true"
            className="alert-pie-bg pointer-events-none absolute select-none"
            style={{
              width: 136,
              height: 136,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />

          {/* PieChart 单独向左下偏移（背景图与中心文字不跟随） */}
          <div
            className="absolute"
            style={{ left: -20, top: 5, width: 180, height: 180 }}
          >
            <PieChart width={180} height={180}>
              <Pie
                data={data}
                cx={90}
                cy={90}
                innerRadius={75}
                outerRadius={86}
                paddingAngle={3.6}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                stroke="none"
                isAnimationActive={false}
              >
                {segments.map((s, i) => (
                  <Cell
                    key={i}
                    fill={s.color}
                    style={{ outline: 'none' }}
                    tabIndex={-1}
                  />
                ))}
              </Pie>
            </PieChart>
          </div>

          {/* 中心标签 */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="text-[28px] font-bold leading-none"
              style={{ color: '#101828' }}
            >
              {total}
            </span>
            <span
              className="mt-1 text-[14px]"
              style={{ color: '#8a9ab3' }}
            >
              告警数
            </span>
          </div>
        </div>

        {/* 右：4 行图例 */}
        <div className="flex flex-1 flex-col" style={{ gap: 26 }}>
          {segments.map((s) => (
            <div key={s.label} className="flex items-center text-[14px]">
              {/* 圆点 */}
              <span
                className="mr-2 inline-block h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              {/* 标签 */}
              <span style={{ color: '#101828', width: 36 }}>{s.label}</span>
              {/* 数值 */}
              <span
                className="font-bold text-[18px]"
                style={{ color: '#101828', minWidth: 28, textAlign: 'right', marginLeft: 16 }}
              >
                {s.count}
              </span>
              {/* 分隔竖线 */}
              <span
                style={{
                  width: 2,
                  height: 12,
                  backgroundColor: 'transparent',
                  backgroundImage:
                    'linear-gradient(rgb(178, 183, 191), rgb(178, 183, 191))',
                  display: 'inline-block',
                  marginLeft: 20,
                  marginRight: 20,
                }}
              />
              {/* 百分比 */}
              <span
                className="font-bold text-[18px]"
                style={{ color: '#101828' }}
              >
                {s.percent}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ========================================================================
// ListStatsCard — 列表统计：表头 + 树形行 + 行首彩色竖条 + Exec(ms) 进度条
// ========================================================================
const COLOR_STRIPE: Record<ListRow['color'], string> = {
  blue: '#0274ff',
  purple: '#7c5cff',
  green: '#1ad093',
}

function ListStatsCard({ rows }: { rows: ListRow[] }) {
  // 列宽（百分比）— 与截图一致：Method 居首最宽、Service/API/Time 中等，数值与 Events 较窄
  const COLS = [
    { key: 'method', label: 'Method', width: '28%' },
    { key: 'startTime', label: 'Start Time', width: '13%' },
    { key: 'execMs', label: 'Exec(ms)', width: '14%' },
    { key: 'execPercent', label: 'Exec(%)', width: '7%' },
    { key: 'selfMs', label: 'Self(ms)', width: '7%' },
    { key: 'api', label: 'API', width: '11%' },
    { key: 'service', label: 'Service', width: '10%' },
    { key: 'attachedEvents', label: 'Attached Events', width: '10%' },
  ] as const

  // 把 8 列拼成 grid-template-columns 字符串
  const gridTemplate = COLS.map((c) => c.width).join(' ')

  return (
    <div
      className="rounded-2xl bg-white"
      style={{ border: '2px solid #ffffff', padding: '20px 26px', height: 448 }}
    >
      <h3
        className="text-[20px] font-bold leading-[30px]"
        style={{ color: '#101828' }}
      >
        列表统计
      </h3>

      <div className="mt-5" style={{ minWidth: 1200 }}>
        {/* ===== 表头 ===== */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: gridTemplate,
            height: 36,
            alignItems: 'center',
          }}
        >
          {COLS.map((c, i) => (
            <div
              key={c.key}
              className="text-[14px] font-medium"
              style={{
                color: '#8a9ab3',
                paddingLeft: i === 0 ? 28 : 12,
                paddingRight: 12,
              }}
            >
              {c.label}
            </div>
          ))}
        </div>

        {/* ===== 行卡片列表（每行一张独立白卡 + 阴影 + 圆角 + 行首彩色竖条） ===== */}
        <div className="flex flex-col" style={{ gap: 18, marginTop: 8 }}>
          {rows.map((row) => (
            <ListRowItem key={row.id} row={row} gridTemplate={gridTemplate} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ListRowItem({
  row,
  gridTemplate,
}: {
  row: ListRow
  gridTemplate: string
}) {
  const stripe = COLOR_STRIPE[row.color]
  // 卡片整体右移；子级箭头落在卡片左外侧，不属于卡片本身
  const indent = row.level * 30
  const execPercent = Math.min(100, (row.execMs / listExecMax) * 100)

  return (
    <div
      className="relative grid items-center"
      style={{
        gridTemplateColumns: gridTemplate,
        height: 46,
        // grid 容器始终占满整宽，列位置与表头完全对齐；卡片视觉缩进通过下面的 absolute 背景层实现
      }}
    >
      {/* 白色卡片背景层 — 通过 left:indent 实现"卡片整体右移"的视觉缩进 */}
      <div
        className="absolute top-0 right-0"
        style={{
          left: indent,
          height: 46,
          background: '#ffffff',
          boxShadow: '0px 1px 8px rgba(77, 111, 158, 0.25)',
          borderRadius: 4,
        }}
      />

      {/* 行首彩色竖条 — 贴在白卡左边缘（即 indent 处） */}
      <span
        className="absolute top-0"
        style={{
          left: indent,
          width: 6,
          height: 46,
          backgroundColor: stripe,
          borderRadius: 3,
        }}
      />

      {/* 子层级箭头 — 浮在白卡左外侧的空白区 */}
      {row.level > 0 && (
        <img
          src="/app-center3/icon-tree-arrow.svg"
          alt=""
          className="absolute h-4 w-4"
          style={{
            left: indent - 22,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />
      )}

      {/* Method 列 — 文本起点 = 基础 28px + indent，让文本贴在白卡内的合理位置 */}
      <div
        className="relative flex items-center text-[14px]"
        style={{
          paddingLeft: 28 + indent,
          paddingRight: 12,
          color: '#101828',
          minWidth: 0,
        }}
      >
        <span className="truncate">{row.method}</span>
      </div>

      {/* Start Time */}
      <div
        className="relative text-[14px]"
        style={{ paddingLeft: 12, paddingRight: 12, color: '#667180' }}
      >
        {row.startTime}
      </div>

      {/* Exec(ms) — 进度条 */}
      <div className="relative" style={{ paddingLeft: 12, paddingRight: 12 }}>
        <div
          className="relative overflow-hidden rounded-full"
          style={{ height: 6, backgroundColor: '#eef1f6' }}
        >
          <span
            className="absolute left-0 top-0 h-full rounded-full"
            style={{ width: `${execPercent}%`, backgroundColor: stripe }}
          />
        </div>
      </div>

      {/* Exec(%) */}
      <div
        className="relative text-[14px]"
        style={{ paddingLeft: 12, paddingRight: 12, color: '#101828' }}
      >
        {row.execPercent}
      </div>

      {/* Self(ms) */}
      <div
        className="relative text-[14px]"
        style={{ paddingLeft: 12, paddingRight: 12, color: '#101828' }}
      >
        {row.selfMs}
      </div>

      {/* API */}
      <div
        className="relative text-[14px]"
        style={{ paddingLeft: 12, paddingRight: 12, color: '#667180' }}
      >
        {row.api}
      </div>

      {/* Service */}
      <div
        className="relative text-[14px]"
        style={{ paddingLeft: 12, paddingRight: 12, color: '#667180' }}
      >
        {row.service}
      </div>

      {/* Attached Events */}
      <div
        className="relative text-[14px]"
        style={{ paddingLeft: 12, paddingRight: 12, color: '#101828' }}
      >
        {row.attachedEvents}
      </div>
    </div>
  )
}
