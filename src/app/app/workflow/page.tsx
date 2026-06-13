'use client'

import { AppLayout } from '@/components/layout/app-layout'
import { ComingSoon } from '@/components/coming-soon'

/**
 * 流程中心 — 占位页
 *
 * TODO: 对接流程引擎；包含流程发起、待办、已办、流程模板等。
 */
export default function WorkflowPage() {
  return (
    <AppLayout>
      <ComingSoon
        title="流程中心"
        description="流程发起、待办审批、已办流程与流程模板管理"
      />
    </AppLayout>
  )
}
