'use client'

import { AppLayout } from '@/components/layout/app-layout'
import { ComingSoon } from '@/components/coming-soon'

/**
 * 系统管理 — 占位页
 *
 * TODO: 用户/角色/权限管理、系统参数、操作日志、菜单配置等。
 */
export default function SystemSettingsPage() {
  return (
    <AppLayout>
      <ComingSoon
        title="系统管理"
        description="用户权限、系统参数、操作日志与菜单配置"
      />
    </AppLayout>
  )
}
