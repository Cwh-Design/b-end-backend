'use client'

import { useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { AppLayout } from '@/components/layout/app-layout'
import { DatePicker } from '@/components/date-picker'
import { KpiCard } from '@/components/kpi-card'
import { RankedTable } from '@/components/ranked-table'
import { SegmentedTabs } from '@/components/segmented-tabs'
import {
  machineRoomTabs,
  statCardsData,
  deptEntryData,
  deptOaData,
  type StatCardItem,
} from '@/mock/data-center'

// ========== 统计卡片图标映射（指向 public/data-center 下的设计稿切图） ==========
const STAT_ICON_MAP: Record<StatCardItem['iconKey'], string> = {
  dept: '/data-center/icon-dept.svg',
  oa: '/data-center/icon-oa.svg',
  entry: '/data-center/icon-entry.svg',
  person: '/data-center/icon-person.svg',
}

/**
 * 数据中心页1
 *
 * 对应 Figma 数据中心页1 (211:31498)
 *
 * 页面结构：
 * 1. 进出机房统计分析 — Tab 切换 + 右侧装饰背景
 * 2. 日期筛选 — 左侧月份选择器 + 右侧月/年分段切换
 * 3. 4 张统计卡片 — 大蓝色图标 + 数值 + 趋势
 * 4. 两张数据表格 — 奖牌徽章 + 进度条 + 数值
 *
 * TODO: 对接 API 后替换 mock 数据；月/年切换联动；图表跳转。
 */
export default function DataCenterPage() {
  const [activeRoomId, setActiveRoomId] = useState(3)
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

  // 进度条相对最大值（按表格当前数据动态计算）
  const maxEntry = Math.max(...deptEntryData.map((d) => d.entryCount))
  const maxPerson = Math.max(...deptEntryData.map((d) => d.personCount))
  const maxApproval = Math.max(...deptOaData.map((d) => d.approvalCount))

  return (
    <AppLayout>
      <div className="space-y-5">
        {/* ===== 第1行：进出机房统计分析（带 Tab + 右侧背景图） ===== */}
        <div
          className="relative overflow-hidden rounded-2xl bg-white"
          style={{
            border: '2px solid #ffffff',
            padding: '20px 24px 0',
          }}
        >
          {/* 右侧装饰背景图（设计稿切图） */}
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
            进出机房统计分析
          </h2>

          {/* Tab 切换 */}
          <div className="relative z-10 flex items-center gap-10">
            {machineRoomTabs.map((tab) => {
              const active = tab.id === activeRoomId
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveRoomId(tab.id)}
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

          {/* 右侧：月/年分段切换（共享 SegmentedTabs） */}
          <SegmentedTabs
            options={[
              { value: 'month', label: '本月' },
              { value: 'year', label: '本年' },
            ]}
            value={dateMode}
            onChange={setDateMode}
            segmentWidth={100}
          />
        </div>

        {/* ===== 第3行：4 张统计卡片（共享 KpiCard，gradient 风格） ===== */}
        {/* 注意：space-y-5 通过 margin-top:20px 实现，这里改成 14px = 20 - 6 */}
        <div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
          style={{ marginTop: '14px' }}
        >
          {statCardsData.map((card) => (
            <KpiCard
              key={card.title}
              title={card.title}
              value={card.value}
              unit={card.unit}
              trend={card.trend}
              trendVariant="percent"
              trendLabel=""
              iconSrc={STAT_ICON_MAP[card.iconKey]}
              iconVariant="gradient"
            />
          ))}
        </div>

        {/* ===== 第4行：两张数据表格（共享 RankedTable） ===== */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {/* 左表：部门进出次数和人数统计 */}
          <RankedTable
            title="部门进出次数和人数统计"
            rows={deptEntryData}
            rowKey={(r) => r.index}
            columns={[
              { kind: 'rank', title: '序号', width: '15%', getValue: (r) => r.index, paddingLeft: '28px' },
              { kind: 'text', title: '部门名称', width: '20%', render: (r) => r.deptName, paddingLeft: '37px' },
              { kind: 'bar', title: '进出次数', width: '32.5%', getValue: (r) => r.entryCount, max: maxEntry, color: '#0274ff', paddingLeft: '37px' },
              { kind: 'bar', title: '人数', width: '32.5%', getValue: (r) => r.personCount, max: maxPerson, color: '#1ad093', paddingLeft: '62px' },
            ]}
          />

          {/* 右表：各部门OA审批单统计 */}
          <RankedTable
            title="各部门OA审批单统计"
            rows={deptOaData}
            rowKey={(r) => r.index}
            columns={[
              { kind: 'rank', title: '序号', getValue: (r) => r.index, paddingLeft: '28px' },
              { kind: 'text', title: '部门名称', render: (r) => r.deptName, paddingLeft: '37px' },
              { kind: 'bar', title: '审批单数', getValue: (r) => r.approvalCount, max: maxApproval, color: '#fe9717', paddingLeft: '62px' },
            ]}
          />
        </div>
      </div>
    </AppLayout>
  )
}
