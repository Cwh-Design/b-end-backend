'use client'

import { AppLayout } from '@/components/layout/app-layout'
import { ComingSoon } from '@/components/coming-soon'

export default function Q1SalesReportPage() {
  return (
    <AppLayout>
      <ComingSoon
        title="第一季度销售报表"
        description="查看 Q1 销售数据汇总、趋势分析与导出"
      />
    </AppLayout>
  )
}
