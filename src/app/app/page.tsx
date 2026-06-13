import { redirect } from 'next/navigation'

/**
 * 根路径：自动跳转到 /app-center
 * 原工作台已迁移到 /workbench
 */
export default function RootHome() {
  redirect('/app-center')
}
