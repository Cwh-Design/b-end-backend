'use client'

import { AppLayout } from '@/components/layout/app-layout'
import { ComingSoon } from '@/components/coming-soon'

/**
 * 销售报表 — 占位页
 *
 * TODO: 对接销售数据接口；包含销售趋势图、Top 商品、地域分布等。
 */
export default function ReportsSalesPage() {
  return (
    <AppLayout>
      <ComingSoon
        title="销售报表"
        description="销售业绩、趋势分析、客户与商品 TOP 排行等"
      />
    </AppLayout>
  )
}
