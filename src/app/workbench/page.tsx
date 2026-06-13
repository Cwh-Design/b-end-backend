import { AppLayout } from '@/components/layout/app-layout'
import { WelcomeCard } from '@/components/welcome-card'
import { ProcessStatsCard } from '@/components/process-stats-card'
import { AppFavorites } from '@/components/app-favorites'
import { RecentList } from '@/components/recent-list'
import { TodoList } from '@/components/todo-list'
import {
  welcomeData,
  processStats,
  favoriteAppsData,
  recentItemsData,
  todoItemsData,
} from '@/mock/dashboard'

// ========== 统计卡片背景图片 ==========
import statInitiatedImg from '@/assets/workbench/stat-initiated.png'
import statPendingImg from '@/assets/workbench/stat-pending.png'
import statReturnedImg from '@/assets/workbench/stat-returned.png'
import statWithdrawnImg from '@/assets/workbench/stat-withdrawn.png'
import statNotificationsImg from '@/assets/workbench/stat-notifications.png'

const STAT_BG_MAP: Record<string, string> = {
  '我发起的': statInitiatedImg.src,
  '待处理': statPendingImg.src,
  '已退回': statReturnedImg.src,
  '已撤回': statWithdrawnImg.src,
  '消息通知': statNotificationsImg.src,
}

/**
 * 仪表盘/工作台页面（原 src/app/page.tsx，因根路径改为跳转 /app-center 而迁移到 /workbench）
 *
 * TODO: 对接以下业务逻辑：
 * - 从 API 获取用户信息（问候语、角色、安全等级）
 * - 从 API 获取流程统计数据（发起/待办/退回/撤回/通知）
 * - 从 API 获取应用收藏列表
 * - 从 API 获取最近使用列表（支持应用/功能切换）
 * - 从 API 获取待办列表（支持筛选全部/待处理/退回/撤回）
 * - 实现卡片点击跳转
 * - 实现消息通知点击弹窗
 */
export default function WorkbenchPage() {
  return (
    <AppLayout>
      <div className="flex h-full flex-col gap-5">
        {/* ===== 第一行：WelcomeCard + ProcessStatsCards ===== */}
        <div className="flex flex-col gap-5 xl:flex-row shrink-0">
          <WelcomeCard
            userName={welcomeData.userName}
            organization={welcomeData.organization}
            roleName={welcomeData.roleName}
            securityLevel={welcomeData.securityLevel}
            avatarUrl={welcomeData.avatarUrl}
            className="w-full shrink-0 xl:w-[580px]"
          />

          <div className="flex flex-1 gap-5">
            {processStats.map((item) => (
              <ProcessStatsCard
                key={item.title}
                title={item.title}
                value={item.value}
                trend={item.trend}
                trendLabel={item.trendLabel}
                valueColor={item.valueColor}
                bgImage={STAT_BG_MAP[item.title]}
                className="flex-1 min-w-[180px]"
              />
            ))}
          </div>
        </div>

        {/* ===== 第二行：左侧 (应用收藏 + 最近使用) | 右侧 (我的待办) ===== */}
        <div className="flex flex-1 flex-col gap-5 lg:flex-row">
          {/* 左侧：应用收藏 + 最近使用 */}
          <div className="flex min-w-0 flex-1 flex-col gap-5">
            {/* 应用收藏 */}
            <AppFavorites
              title="应用收藏"
              apps={favoriteAppsData}
              showAdd
            />

            {/* 最近使用 */}
            <RecentList
              title="最近使用"
              items={recentItemsData}
              className="flex-1"
            />
          </div>

          {/* 右侧：我的待办 */}
          <TodoList
            title="我的代办"
            items={todoItemsData}
            tabCounts={{ pending: 15, returned: 15, withdrawn: 5 }}
            className="w-full flex-1 lg:w-[676px] lg:shrink-0"
          />
        </div>
      </div>
    </AppLayout>
  )
}
