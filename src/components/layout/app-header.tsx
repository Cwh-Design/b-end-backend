'use client'

import { Search, Bell } from 'lucide-react'
import { Input } from '@/components/input'
import { mockUser } from '@/mock/navigation'
import { useSidebarContext } from '@/components/layout/app-layout'
import collapseArrowSvg from '@/assets/workbench/sidebar-collapse.svg'
import expandArrowSvg from '@/assets/workbench/sidebar-expand.svg'
import userAvatarImg from '@/assets/workbench/user-avatar.png'

export const HEADER_HEIGHT = 80

export function AppHeader() {
  const { collapsed, toggleSidebar } = useSidebarContext()

  return (
    <header
      className="sticky top-0 z-30 flex items-center border-b"
      style={{
        height: `${HEADER_HEIGHT}px`,
        backgroundColor: '#ffffff',
        borderColor: '#e7eaf0',
        padding: '17px 30px',
      }}
    >
      {/* ===== 侧边栏折叠按钮 ===== */}
      <button
        onClick={toggleSidebar}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md hover:bg-[#f2f5fa] transition-colors"
      >
        <img
          src={collapsed ? expandArrowSvg.src : collapseArrowSvg.src}
          alt={collapsed ? '展开' : '收起'}
          className="h-4 w-4"
        />
      </button>

      {/* 中间占位 */}
      <div className="flex-1" />

      {/* ===== 右侧操作区 ===== */}
      <div className="flex items-center gap-4">
        {/* 搜索框 */}
        <div className="relative" style={{ width: '400px' }}>
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ width: '16px', height: '16px', color: '#8a9ab3' }}
          />
          <Input
            type="search"
            placeholder="搜索..."
            className="h-[43px] pl-9 pr-4 text-[14px] border-0 w-full"
            style={{
              backgroundColor: '#f2f5fa',
              borderRadius: '6px',
              color: '#101828',
            }}
            // TODO: 对接全局搜索 API
          />
        </div>

        {/* 通知 */}
        <button
          className="relative flex h-10 w-10 items-center justify-center rounded-lg hover:bg-[#f2f5fa] transition-colors"
          aria-label="通知"
          // TODO: 对接通知列表（弹窗或下拉面板）
        >
          <Bell style={{ width: '20px', height: '20px', color: '#667180' }} />
          {/* 未读红点 */}
          <span
            className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full"
            style={{ backgroundColor: '#ff4d4f' }}
          />
        </button>

        {/* 用户信息 */}
        <div className="flex items-center gap-2">
          <img
            src={userAvatarImg.src}
            alt={mockUser.name}
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="text-[14px] font-medium" style={{ color: '#101828' }}>
            {mockUser.name}
          </span>
        </div>
      </div>
    </header>
  )
}
