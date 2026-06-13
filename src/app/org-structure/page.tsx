'use client'

import { AppLayout } from '@/components/layout/app-layout'
import { ComingSoon } from '@/components/coming-soon'

/**
 * 组织架构 — 占位页
 *
 * TODO: 对接 HR 系统；包含部门树、人员档案、岗位与汇报关系。
 */
export default function OrgStructurePage() {
  return (
    <AppLayout>
      <ComingSoon
        title="组织架构"
        description="部门树、人员档案、岗位与汇报关系管理"
      />
    </AppLayout>
  )
}
