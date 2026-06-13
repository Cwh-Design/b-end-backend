'use client'

import { AppLayout } from '@/components/layout/app-layout'
import { ComingSoon } from '@/components/coming-soon'

/**
 * 财务报表 — 占位页
 *
 * TODO: 对接财务系统；包含利润表、现金流、应收应付等。
 */
export default function ReportsFinancePage() {
  return (
    <AppLayout>
      <ComingSoon
        title="财务报表"
        description="收入支出、利润分析、应收应付与现金流概览"
      />
    </AppLayout>
  )
}
