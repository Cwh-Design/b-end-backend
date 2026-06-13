'use client'

import { AppLayout } from '@/components/layout/app-layout'
import { TopStatCard } from '@/components/top-stat-card'
import { ResourceUsageCard } from '@/components/resource-usage-card'
import { InstanceCountCard } from '@/components/instance-count-card'
import { QuotaGroup } from '@/components/quota-group'
import {
  topStatCards,
  resourceUsageData,
  instanceCountData,
  quotaGroupsData,
} from '@/mock/data-center2'

/**
 * 数据中心页2
 *
 * 对应 Figma 数据中心页2 (181:24527)
 *
 * 页面结构：
 * 1. 顶部统计区 — 5 张统计卡片（独立平铺）
 * 2. 资源使用 — 3 张大卡（CPU / 内存 / 存储 利用率）（在白色大卡片内）
 * 3. 资源实例统计 — 多个实例数小卡（在白色大卡片内）
 * 4. 配额使用概览 — 3 列分组（在白色大卡片内）
 *
 * TODO: 对接云资源管理 API；卡片点击跳转到资源详情页。
 */
export default function DataCenterPage2() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-5">
        {/* ===== 第1行：顶部 5 张统计卡片（平铺，独立卡片） ===== */}
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-5">
          {topStatCards.map((card, idx) => (
            <TopStatCard key={idx} data={card} />
          ))}
        </div>

        {/* ===== 第2区块：资源使用 ===== */}
        <SectionCard title="资源使用">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {resourceUsageData.map((item) => (
              <ResourceUsageCard key={item.type} data={item} />
            ))}
          </div>
        </SectionCard>

        {/* ===== 第3区块：资源实例统计 ===== */}
        <SectionCard title="资源实例统计">
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' }}
          >
            {instanceCountData.map((item, idx) => (
              <InstanceCountCard key={idx} data={item} />
            ))}
          </div>
        </SectionCard>

        {/* ===== 第4区块：配额使用概览 ===== */}
        <SectionCard title="配额使用概览">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {quotaGroupsData.map((group, idx) => (
              <QuotaGroup key={idx} data={group} />
            ))}
          </div>
        </SectionCard>
      </div>
    </AppLayout>
  )
}

// ========== 通用「区块卡片」容器 ==========
function SectionCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div
      className="bg-white"
      style={{
        border: '2px solid #ffffff',
        borderRadius: '12px',
        padding: '20px 24px 24px',
      }}
    >
      <h2
        className="mb-5 text-[18px] font-bold leading-[28px]"
        style={{ color: '#101828' }}
      >
        {title}
      </h2>
      {children}
    </div>
  )
}
