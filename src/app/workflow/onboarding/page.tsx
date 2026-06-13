'use client'

import { AppLayout } from '@/components/layout/app-layout'
import { ComingSoon } from '@/components/coming-soon'

export default function OnboardingPage() {
  return (
    <AppLayout>
      <ComingSoon
        title="人员入职档案"
        description="新员工入职信息录入、档案归档与流转"
      />
    </AppLayout>
  )
}
