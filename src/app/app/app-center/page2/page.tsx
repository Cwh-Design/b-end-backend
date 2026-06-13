'use client'

import { useState } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { DateRangePicker } from '@/components/date-range-picker'
import { SegmentedTabs } from '@/components/segmented-tabs'
import { KpiCard } from '@/components/kpi-card'
import { MonitorFunnel } from '@/components/monitor-funnel'
import { ResourceBarChart } from '@/components/resource-bar-chart'
import { RankedTable } from '@/components/ranked-table'
import {
  monitorTabs,
  timeRangeOptions,
  monitorKpis,
  monitorFunnel,
  resourceBars,
  alertByApp,
  alertByObject,
  type TimeRange,
  type MonitorKpi,
  type AlertByItem,
} from '@/mock/app-center2'

/**
 * 应用中心页2 — 监控总览
 *
 * 对应 Figma 应用中心页2 (220:519)
 *
 * 页面结构：
 * 1. Banner（沿用数据中心页1 红框样式）— 标题「监控总览」+ 分类 Tab + 右侧装饰背景
 *    Tab：全部 / 基础设施 / 数据层 / 平台层 / 服务层 / 未分配
 * 2. 筛选条 — 左侧日期范围 + 右侧时间粒度 (1小时/12小时/24小时/全部)
 * 3. KPI 4 联卡 — 对象总数 / 监控覆盖率 / 告警对象数 / 告警对象比率
 * 4. 中段两栏 — 左：监控概览(漏斗图)  右：资源概览(柱状图)
 * 5. 底部两栏 — 左：告警按应用分布(Top3 表)  右：告警按对象分布(Top3 表)
 *
 * 复用情况：
 *   - AppLayout：100% 复用
 *   - DateRangePicker / SegmentedTabs / KpiCard / RankedTable：本次抽出的共享组件
 *   - MonitorFunnel / ResourceBarChart：本页独有，新建
 *
 * TODO: 对接监控 API；分类 Tab 切换联动各图表数据；时间粒度联动。
 */

// ========== KPI 卡片图标映射 ==========
const KPI_ICON_MAP: Record<MonitorKpi['iconKey'], string> = {
  total: '/app-center2/icon-total.svg',
  coverage: '/app-center2/icon-coverage.svg',
  alert: '/app-center2/icon-alert.svg',
  'alert-rate': '/app-center2/icon-alert-rate.svg',
}

export default function AppCenterPage2() {
  const [activeTabId, setActiveTabId] = useState<string>('all')
  const [startDate, setStartDate] = useState('2025-06-13')
  const [endDate, setEndDate] = useState('2026-02-13')
  const [timeRange, setTimeRange] = useState<TimeRange>('all')

  return (
    <AppLayout>
      <div className="space-y-5">
        {/* ===== 第1区：Banner — 标题 + 分类 Tab（沿用数据中心页1 红框同款卡） ===== */}
        <BannerWithTabs
          tabs={monitorTabs}
          activeId={activeTabId}
          onChange={setActiveTabId}
        />

        {/* ===== 第2区：筛选条 ===== */}
        <div className="flex items-center justify-between">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onChangeStart={setStartDate}
            onChangeEnd={setEndDate}
          />
          <SegmentedTabs
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            segmentWidth={70}
          />
        </div>

        {/* ===== 第4区：KPI 4 联卡（与上方筛选条间距 16px，覆盖外层 space-y-5 的 20px） ===== */}
        <div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
          style={{ marginTop: '16px' }}
        >
          {monitorKpis.map((card) => (
            <KpiCard
              key={card.title}
              title={card.title}
              value={card.value}
              unit={card.unit}
              trend={card.trend}
              trendVariant="percent"
              iconSrc={KPI_ICON_MAP[card.iconKey]}
              iconVariant="gradient"
            />
          ))}
        </div>

        {/* ===== 第5区：监控概览(漏斗) + 资源概览(柱状) ===== */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <SectionCard title="监控概览">
            <MonitorFunnel data={monitorFunnel} />
          </SectionCard>
          <SectionCard title="资源概览">
            <ResourceBarChart data={resourceBars} height={280} />
          </SectionCard>
        </div>

        {/* ===== 第6区：告警分布 双表格 ===== */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <RankedTable<AlertByItem>
            title="告警按应用分布"
            rows={alertByApp}
            columns={[
              { kind: 'rank', title: '序号', width: '25%', getValue: (r) => r.index },
              { kind: 'text', title: '部门名称', width: '25%', render: (r) => r.deptName },
              { kind: 'text', title: '应用名称', width: '25%', render: (r) => r.itemName },
              {
                kind: 'bar',
                title: '应用数',
                width: '25%',
                getValue: (r) => r.count,
                max: Math.max(...alertByApp.map((r) => r.count)),
                color: '#0274ff',
                barWidth: 'fill',
                align: 'left',
              },
            ]}
            rowKey={(r) => r.index}
          />
          <RankedTable<AlertByItem>
            title="告警按对象分布"
            rows={alertByObject}
            columns={[
              { kind: 'rank', title: '序号', width: '25%', getValue: (r) => r.index },
              { kind: 'text', title: '部门名称', width: '25%', render: (r) => r.deptName },
              { kind: 'text', title: '对象名称', width: '25%', render: (r) => r.itemName },
              {
                kind: 'bar',
                title: '对象数',
                width: '25%',
                getValue: (r) => r.count,
                max: Math.max(...alertByObject.map((r) => r.count)),
                color: '#fe9717',
                barWidth: 'fill',
                align: 'left',
              },
            ]}
            rowKey={(r) => r.index}
          />
        </div>
      </div>
    </AppLayout>
  )
}

// ========================================================================
// BannerWithTabs — 标题 + 分类 Tab 合并卡
// 完全沿用 data-center/page.tsx 第1行红框：圆角白底 + 右侧装饰背景图 + 标题 + 下方 Tab
// ========================================================================
function BannerWithTabs({
  tabs,
  activeId,
  onChange,
}: {
  tabs: { id: string; name: string; count: number }[]
  activeId: string
  onChange: (id: string) => void
}) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-white"
      style={{
        border: '2px solid #ffffff',
        padding: '20px 24px 0',
      }}
    >
      {/* 右侧装饰背景图（与数据中心页1 同款机房背景） */}
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
        监控总览
      </h2>

      {/* 分类 Tab — 标题(数字) 形式，与数据中心页1 Tab 同款蓝色文字 + 蓝色下划线 */}
      <div className="relative z-10 flex items-center gap-10">
        {tabs.map((tab) => {
          const active = tab.id === activeId
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className="relative pb-4 text-[14px] transition-colors"
              style={{
                color: active ? '#0274ff' : '#667180',
                fontWeight: active ? 700 : 400,
              }}
            >
              {tab.name}
              <span
                className="ml-0.5"
                style={{ color: active ? '#0274ff' : '#8a9ab3' }}
              >
                ({tab.count.toLocaleString()})
              </span>
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
  )
}

// ========================================================================
// SectionCard — 监控概览 / 资源概览 的白底卡容器
// ========================================================================
function SectionCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div
      className="rounded-2xl bg-white"
      style={{
        border: '2px solid #ffffff',
        padding: '20px 24px 24px',
      }}
    >
      <h3
        className="mb-4 text-[20px] font-bold leading-[30px]"
        style={{ color: '#101828' }}
      >
        {title}
      </h3>
      {children}
    </div>
  )
}
