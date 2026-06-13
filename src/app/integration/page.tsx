'use client'

import { AppLayout } from '@/components/layout/app-layout'
import { ComingSoon } from '@/components/coming-soon'

/**
 * 集成管理 — 占位页
 *
 * TODO: 对接第三方系统接入配置、API 网关、消息中间件等。
 */
export default function IntegrationPage() {
  return (
    <AppLayout>
      <ComingSoon
        title="集成管理"
        description="第三方系统接入、API 网关与数据同步配置"
      />
    </AppLayout>
  )
}
