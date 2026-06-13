'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AppLayout } from '@/components/layout/app-layout'
import { DatePicker } from '@/components/date-picker'
import { LeaveDistributionCard } from '@/components/distribution-card'
import {
  leaveTabs,
  leaveKpiData,
  leaveDistributionData,
  type LeaveKpiItem,
} from '@/mock/leave-report'

/**
 * 报表中心页 — 请假管理
 *
 * 对应 Figma 报表中心页 (207:143)
 *
 * 页面结构（与数据中心页1 高度相似，绝大多数组件复用）：
 * 1. Banner — 标题「请假管理」 + Tab 切换（请假申请/调班申请/请假统计）
 * 2. 日期筛选 — 左侧月份选择器 + 右侧月/年分段切换（直接照搬 data-center/page.tsx 实现）
 * 3. 4 张 KPI 卡片 — 大蓝色图标 + 数值 + 同比次数（不是百分比，而是 +N次/-N次）
 * 4. 两张请假分布卡片（左：运维岗 / 右：电力岗）— 新组件 LeaveDistributionCard
 *
 * 复用情况：
 *   - AppLayout、左侧导航、顶部导航：100% 复用
 *   - Banner + Tab 容器：复用 data-center/page.tsx 的 rounded-2xl 卡片样式
 *   - 月年翻页器 + 月/年分段切换：复用 data-center/page.tsx 的实现
 *   - KPI 卡片样式：复用 data-center/page.tsx 的卡片外观，同比展示规则微调（次数代替百分比）
 *
 * TODO: 对接 API 后替换 mock；月/年切换联动；Tab 切换跳转到对应页面。
 */

// ========== KPI 卡片图标映射 ==========
const KPI_ICON_MAP: Record<LeaveKpiItem['iconKey'], string> = {
  total: '/reports-operation/icon-total.svg',
  ops: '/reports-operation/icon-ops.svg',
  power: '/reports-operation/icon-power.svg',
  max: '/reports-operation/icon-max.svg',
}

export default function ReportsOperationPage() {
  const [activeTabId, setActiveTabId] = useState('stats')
  // 日期选择：使用 YYYY-MM-DD 字符串作为统一格式
  const [selectedDate, setSelectedDate] = useState('2025-06-01')
  const [dateMode, setDateMode] = useState<'month' | 'year'>('year')

  // 解析当前选中的年月（用于显示）
  const [yearStr, monthStr] = selectedDate.split('-')
  const selectedYear = Number(yearStr)
  const selectedMonth = Number(monthStr)

  function shiftMonth(delta: number) {
    let m = selectedMonth + delta
    let y = selectedYear
    if (m > 12) {
      m -= 12
      y += 1
    } else if (m < 1) {
      m += 12
      y -= 1
    }
    setSelectedDate(`${y}-${String(m).padStart(2, '0')}-01`)
  }

  return (
    <AppLayout>
      <div className="space-y-5">
        {/* ===== 第1行：Banner — 标题 + Tab ===== */}
        <div
          className="relative overflow-hidden rounded-2xl bg-white"
          style={{
            border: '2px solid #ffffff',
            padding: '20px 24px 0',
          }}
        >
          {/* 右侧装饰背景图（沿用数据中心页1的机房背景做风格统一；后续可替换为请假管理专属背景） */}
          <img
            src="/data-center/bg-machine-room.png"
            alt=""
            className="pointer-events-none absolute right-0 top-0 h-full select-none"
            style={{ objectFit: 'contain', objectPosition: 'right top' }}
          />

          {/* 标题 */}
          <h2
            className="relative z-10 mb-4 text-[24px] font-bold leading-[36px]"
            style={{ color: '#101828' }}
          >
            请假管理
          </h2>

          {/* Tab 切换 */}
          <div className="relative z-10 flex items-center gap-10">
            {leaveTabs.map((tab) => {
              const active = tab.id === activeTabId
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className="relative pb-4 text-[14px] transition-colors"
                  style={{
                    color: active ? '#0274ff' : '#667180',
                    fontWeight: active ? 700 : 400,
                  }}
                >
                  {tab.name}
                  {active && (
                    <span
                      className="absolute h-[3px] rounded-full"
                      style={{
                        width: '88px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        bottom: '0px',
                        backgroundColor: '#0274ff',
                      }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* ===== 第2行：日期筛选 ===== */}
        <div className="flex items-center justify-between">
          {/* 左侧：年月选择器 */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => shiftMonth(-1)}
              className="flex h-8 w-8 items-center justify-center rounded-md border bg-white transition-colors hover:bg-[#f8fafc]"
              style={{ borderColor: '#d8e2f0' }}
            >
              <ChevronLeft className="h-4 w-4" style={{ color: '#667180' }} />
            </button>

            <DatePicker value={selectedDate} onChange={setSelectedDate}>
              <div
                className="relative flex h-8 items-center justify-center rounded-md border bg-white transition-colors hover:border-[#0274ff]"
                style={{ borderColor: '#d8e2f0', width: '180px' }}
              >
                <img
                  src="/reports-operation/icon-calendar.svg"
                  alt=""
                  className="absolute h-4 w-4"
                  style={{ left: '12px' }}
                />
                <span
                  className="flex items-center justify-center text-[14px] font-medium"
                  style={{ color: '#101828' }}
                >
                  {selectedYear}年{selectedMonth}月
                </span>
              </div>
            </DatePicker>

            <button
              onClick={() => shiftMonth(1)}
              className="flex h-8 w-8 items-center justify-center rounded-md border bg-white transition-colors hover:bg-[#f8fafc]"
              style={{ borderColor: '#d8e2f0' }}
            >
              <ChevronRight className="h-4 w-4" style={{ color: '#667180' }} />
            </button>
          </div>

          {/* 右侧：月/年分段切换 */}
          <div
            className="flex h-8 items-center rounded-md border bg-white p-0.5"
            style={{ borderColor: '#d8e2f0' }}
          >
            {(['month', 'year'] as const).map((mode) => {
              const active = dateMode === mode
              return (
                <button
                  key={mode}
                  onClick={() => setDateMode(mode)}
                  className="flex h-7 items-center justify-center rounded text-[13px] font-medium transition-colors"
                  style={{
                    width: '100px',
                    backgroundColor: active ? '#0274ff' : 'transparent',
                    color: active ? '#ffffff' : '#667180',
                  }}
                >
                  {mode === 'month' ? '本月' : '本年'}
                </button>
              )
            })}
          </div>
        </div>

        {/* ===== 第3行：4 张 KPI 卡片（同比展示为次数，不是百分比） ===== */}
        <div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
          style={{ marginTop: '14px' }}
        >
          {leaveKpiData.map((card) => {
            const trendUp = card.trend !== null && card.trend > 0
            const trendDown = card.trend !== null && card.trend < 0
            const trendColor = trendUp
              ? '#f7320d'
              : trendDown
                ? '#19bd6b'
                : '#667180'
            const trendSrc = trendUp
              ? '/data-center/trend-up.svg'
              : '/data-center/trend-down.svg'

            return (
              <div
                key={card.title}
                className="flex items-center gap-4 bg-white p-5 transition-shadow hover:shadow-[0_4px_6px_0_rgba(128,153,187,0.20)]"
                style={{
                  border: '2px solid #ffffff',
                  borderRadius: '12px',
                }}
              >
                {/* 左侧大蓝色图标（白色 icon + 蓝色渐变背景） */}
                <div
                  className="flex h-[64px] w-[64px] shrink-0 items-center justify-center"
                  style={{
                    borderRadius: '8px',
                    background:
                      'linear-gradient(180deg, #1476FF 0%, #6DC2FF 100%)',
                  }}
                >
                  <img
                    src={KPI_ICON_MAP[card.iconKey]}
                    alt={card.title}
                    className="h-11 w-11"
                    style={{
                      filter: 'drop-shadow(0 5px 2px rgba(0, 57, 115, 0.20))',
                    }}
                  />
                </div>

                {/* 右侧数据 */}
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="text-[14px]" style={{ color: '#667180' }}>
                    {card.title}
                  </span>
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="flex items-baseline gap-1">
                      <span
                        className="text-[28px] font-bold leading-[34px]"
                        style={{ color: '#101828' }}
                      >
                        {card.value}
                      </span>
                      <span className="text-[13px]" style={{ color: '#8a9ab3' }}>
                        {card.unit}
                      </span>
                    </div>
                    {card.trend !== null && (
                      <div className="flex items-center gap-2 pr-1">
                        <img src={trendSrc} alt="" className="h-2.5 w-3" />
                        <span
                          className="text-[15px] font-bold"
                          style={{ color: trendColor }}
                        >
                          {Math.abs(card.trend)}次
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* ===== 第4行：左右两张请假分布卡片 ===== */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {leaveDistributionData.map((group) => (
            <LeaveDistributionCard key={group.id} data={group} />
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
