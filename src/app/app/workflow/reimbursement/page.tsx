'use client'

import { AppLayout } from '@/components/layout/app-layout'
import { ComingSoon } from '@/components/coming-soon'

export default function ReimbursementPage() {
  return (
    <AppLayout>
      <ComingSoon
        title="差旅报销申请"
        description="提交差旅报销、查看报销进度与发票管理"
      />
    </AppLayout>
  )
}
