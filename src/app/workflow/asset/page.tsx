'use client'

import { AppLayout } from '@/components/layout/app-layout'
import { ComingSoon } from '@/components/coming-soon'

export default function AssetInventoryPage() {
  return (
    <AppLayout>
      <ComingSoon
        title="固定资产盘点"
        description="登记、盘点与处置公司固定资产"
      />
    </AppLayout>
  )
}
