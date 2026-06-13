'use client'

import { AppLayout } from '@/components/layout/app-layout'
import { ComingSoon } from '@/components/coming-soon'

export default function ContractApprovalPage() {
  return (
    <AppLayout>
      <ComingSoon
        title="合同审批表单"
        description="发起合同审批、查看审批进度与历史记录"
      />
    </AppLayout>
  )
}
